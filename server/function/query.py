from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import json
from function.crypto import *
import psycopg2.extras

def connectToDB():
    connectionString = 'dbname=postgres user=postgres password=licenta host=localhost'
    try:
        return psycopg2.connect(connectionString)
    except:
        print("Can't connect to database")

def numberImages(addId):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT count(image) FROM imagesadd WHERE announceId = %s"
    addIdd = (addId,)
    result = cur.execute(stmt, addIdd)
    results = cur.fetchall()
    return results[0][0]

    
def idFirstImage(addId):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT min(imageId) FROM imagesadd WHERE announceId = %s"
    addIdd = (addId,)
    result = cur.execute(stmt, addIdd)
    results = cur.fetchall()
    return results[0][0]

def numberImagesAssoc(assocId):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT count(image) FROM imagesAsscoc WHERE associationId = %s"
    assocId = (assocId,)
    result = cur.execute(stmt, assocId)
    results = cur.fetchall()
    return results[0][0]

    
def idFirstImageAssoc(assocId):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT min(imageId) FROM imagesAsscoc WHERE associationId = %s"
    assocId = (assocId,)
    result = cur.execute(stmt, assocId)
    results = cur.fetchall()
    return results[0][0]

def getTypeCont(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT password FROM users WHERE email = %s"
    emailUser = (email,)
    result = cur.execute(stmt, emailUser)
    results = cur.fetchall()
    if not results:
        stmt = "SELECT password FROM associations WHERE associationsEmail = %s"
        emailUser = (email,)
        result = cur.execute(stmt, emailUser)
        results = cur.fetchall()
        if not results:
            return "not"
        else:
            return "association"
    else:
        return "user"


def getPassword(email,typeCont):
    conn = connectToDB()
    cur = conn.cursor()
    if typeCont == "user":
        stmt = "SELECT PASSWORD FROM users WHERE email = %s"
        username = (email,)
        result = cur.execute(stmt, username)
        results = cur.fetchall()
        password = results[0][0]
        return password
    if typeCont == "association":
        stmt = "SELECT PASSWORD FROM associations WHERE associationsEmail = %s"
        username = (email,)
        result = cur.execute(stmt, username)
        results = cur.fetchall()
        password = results[0][0]
        return password

def getId(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT userId FROM users WHERE email = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    results = cur.fetchall()
    userId = results[0][0]
    return userId

def getIdAssoc(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT associationId FROM associations WHERE associationsEmail = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    results = cur.fetchall()
    assocId = results[0][0]
    return assocId

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


def addUserDb(name,email,phone,city,password):
    conn = connectToDB()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (userName, email, phone,city,PASSWORD) VALUES(%s, %s, %s,%s,%s)", (name,email,phone,city,hash_password(password)))
    conn.commit()
    cursor.close()
    conn.close()

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

