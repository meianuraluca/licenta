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

def getPassword(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT PASSWORD FROM users WHERE email = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    results = cur.fetchall()
    password = results[0][0]
    print(results)
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

def checkUser(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT 1 FROM users WHERE email = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    if (result == None):
        return False
    return True

def checkAssociation(email):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT 1 FROM associations WHERE associationsEmail = %s"
    username = (email,)
    result = cur.execute(stmt, username)
    if (result == None):
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
