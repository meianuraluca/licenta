from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import json
from function.connectDB import *
from function.crypto import *
import psycopg2.extras
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt_identity, jwt_required)

def rigisterNewAssociation(login_json):
    if not  login_json: 
        return jsonify({'msg':'Missing json'}),400
    email = login_json.get('email')
    password = login_json.get('password')
    phone = login_json.get('phone')
    name = login_json.get('name')
    if not email:
        return jsonify({'msg':'Email is missing'}),400
    if not phone:
        return jsonify({'msg':'Phone is missing'}),400
    if not password:
        return jsonify({'msg':'Password is missing'}),400
    if not name:
        return jsonify({'msg':'Name is missing'}),400
    exitAssoc = checkAssociation(email)
    if exitAssoc == False:
        addAssociationDb(name,email,phone,password)
        access_token = create_access_token(identity=email)
        return jsonify({'access_token':access_token}),200
    else:
        return jsonify({'msg':'The association already exists'}),400

def addAssociationDb(name,email,phone,password):
    conn = connectToDB()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO associations (associationName, associationsEmail,phone,PASSWORD) VALUES(%s, %s,%s,%s)", (name,email,phone,hash_password(password)))
    conn.commit()
    cursor.close()
    conn.close()

def addMottoAssociation(email, motto):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "UPDATE associations SET motto = %s WHERE associationsEmail=%s;"
    result = cur.execute(stmt, (motto,email))
    conn.commit()
    cur.close()
    conn.close()

def addLinkAssociation(email, link):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "UPDATE associations SET linkSite = %s WHERE associationsEmail=%s;"
    result = cur.execute(stmt, (link,email))
    conn.commit()
    cur.close()
    conn.close()

def addEmailContactAssociation(email, emailContact):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "UPDATE associations SET contactEmail = %s WHERE associationsEmail=%s;"
    result = cur.execute(stmt, (emailContact,email))
    conn.commit()
    cur.close()
    conn.close() 

def addDescriptionAssociation(email, description):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "UPDATE associations SET associationsDescription = %s WHERE associationsEmail=%s;"
    result = cur.execute(stmt, (description,email))
    conn.commit()
    cur.close()
    conn.close()

def checkAssociation(email):
    conn = connectToDB()
    cur = conn.cursor()
    print(email)
    stmt = "SELECT associationId FROM associations WHERE associationsEmail = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    results = cur.fetchall()
    if (results == []):
        return False
    return True

def getIdAssoc(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT associationId FROM associations WHERE associationsEmail = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    results = cur.fetchall()
    assocId = results[0][0]
    return assocId


def showAllAssociations():
    conn = connectToDB()
    cur = conn.cursor()
    try:
        cur.execute("Select associationId,associationName,associationsDescription,associationsEmail from associations")
    except:
        print("Error executing select")
    results = cur.fetchall()
    json_data = [] 
    row_headers=[x[0] for x in cur.description]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
    return json.dumps(json_data)

def infoAboutAssociation(emailUser):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT associationName,associationsEmail,phone FROM associations WHERE associationsEmail = %s"
    email = (emailUser,)
    result = cur.execute(stmt, email)
    results = cur.fetchall()
    json_data = [] 
    row_headers=[x[0] for x in cur.description]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
    return json.dumps(json_data)
