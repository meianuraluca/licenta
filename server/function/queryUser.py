from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import json
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt_identity, jwt_required)
from function.connectDB import *
from function.crypto import *
import psycopg2.extras

def registerNewUser(login_json):
    if not  login_json: 
        return jsonify({'msg':'Missing json'}),400
    email = login_json.get('email')
    password = login_json.get('password')
    phone = login_json.get('phone')
    city = login_json.get('city')
    name = login_json.get('name')
    if not email:
        return jsonify({'msg':'Email is missing'}),400
    if not phone:
        return jsonify({'msg':'Phone is missing'}),400
    if not password:
        return jsonify({'msg':'Password is missing'}),400
    if not name:
        return jsonify({'msg':'Name is missing'}),400
    if not city :
        return jsonify({'msg':'City is missing'}),400
    exitUser = checkUser(email)
    if exitUser == False:
        addUserDb(name,email,phone,city,password)
        access_token = create_access_token(identity=email)
        return jsonify({'access_token':access_token}),200
    else:
        return jsonify({'msg':'The user already exists'}),400

def addUserDb(name,email,phone,city,password):
    conn = connectToDB()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (userName, email, phone,city,PASSWORD) VALUES(%s, %s, %s,%s,%s)", (name,email,phone,city,hash_password(password)))
    conn.commit()
    cursor.close()
    conn.close()


def checkUser(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT 1 FROM users WHERE email = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    results = cur.fetchall()
    if (results == []):
        return False
    return True

def getId(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT userId FROM users WHERE email = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    results = cur.fetchall()
    userId = results[0][0]
    return userId

def infoAboutUser(emailUser):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT userName,email,phone,city FROM users WHERE email = %s"
    email = (emailUser,)
    result = cur.execute(stmt, email)
    results = cur.fetchall()
    json_data = [] 
    row_headers=[x[0] for x in cur.description]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
    return json.dumps(json_data)
