from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import json
from function.crypto import *
from function.connectDB import *
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt_identity, jwt_required)
import psycopg2.extras

def loginUser(login_json):
    if not  login_json: 
        return jsonify({'msg':'Missing json'}),400
    email = login_json.get('email')
    password = login_json.get('password')
    if not email:
        return jsonify({'msg':'Email is missing'}),400
    if not password:
        return jsonify({'msg':'Password is missing'}),400
    typeCont = getTypeCont(email)
    if typeCont == "not":
        return jsonify({'msg':'Bad username'}),401
    user_password = getPassword(email,typeCont)
    if not user_password or verify_password(user_password,password)==False:
        return jsonify({'msg':'Bad password'}),401
    access_token = create_access_token(identity=email)
    return jsonify({'access_token':access_token,"type":typeCont}),200

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
