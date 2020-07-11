from flask import Flask, request, jsonify
import psycopg2
import json
from function.connectDB import *
from function.queryUser import *
from function.queryAssociation import *
from datetime import datetime
from function.smv import *
import psycopg2.extras

def allUserAnnounces(emailUser):
    idUser = getId(emailUser)
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "Select announceId,title,announceDescription,category, personContact,announceEmail,phone,userLocation from announces where userId=%s"
    userId = (idUser,)
    result = cur.execute(stmt, userId)
    results = cur.fetchall()
    json_data = [] 
    row_headers=[x[0] for x in cur.description]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
    return json.dumps(json_data)

def allAnnounces():
    conn = connectToDB()
    cur = conn.cursor()
    try:
        cur.execute("Select announceId,title,announceDescription,category , personContact,announceEmail,phone,userLocation from announces")
    except:
        print("Error executing select")
    results = cur.fetchall()
    
    json_data = [] 
    row_headers=[x[0] for x in cur.description]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
    return json.dumps(json_data)

def addNewAnnounce(response):
    if(response[8] == 'user'):
        idUser = getId(response[7])
    else:
        idUser = getIdAssoc(response[7])
    predict = predictCategory(response[2])
    if predict == 0:
        conn = connectToDB()
        cursor = conn.cursor()
        today = datetime.now()
        cursor.execute("INSERT INTO announces (userId,announceDate,title,category,announceDescription,personContact,announceEmail, phone,userLocation) VALUES(%s, %s, %s,%s,%s,%s,%s,%s,%s) RETURNING announceId", (idUser,today,response[0],response[1],response[2],response[3],response[4],response[5],response[6]))
        results = cursor.fetchall()
        conn.commit()
        cursor.close()
        conn.close()
        return str(results[0][0])
    else:
        return "wrong announcement"

def editAnnounce(response):
    predict = predictCategory(response[2])
    if predict == 0:
        conn = connectToDB()
        cursor = conn.cursor()
        today = datetime.now()
        stmt = "UPDATE announces SET title=%s,category=%s,announceDescription=%s,personContact=%s,announceEmail=%s, phone=%s,userLocation=%s WHERE announceId=%s;"
        cursor.execute(stmt,(response[0],response[1],response[2],response[3],response[4],response[5],response[6],response[7]))
        conn.commit()
        cursor.close()
        conn.close()
        return 'done'
    else:
        return "wrong announcement"

def infoAboutAd(idAd):
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT title,announceDescription,category,personContact,announceEmail,phone,userLocation FROM announces WHERE announceId = %s"
    idd = (idAd,)
    result = cur.execute(stmt, idd)
    results = cur.fetchall()
    json_data = [] 
    row_headers=[x[0] for x in cur.description]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
    return json.dumps(json_data)