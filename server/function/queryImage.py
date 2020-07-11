from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import json
from function.connectDB import *
import psycopg2.extras

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
    stmt = "SELECT imageId FROM imagesAsscoc WHERE associationId = %s"
    assocId = (assocId,)
    result = cur.execute(stmt, assocId)
    results = cur.fetchall()
    ids = []
    for i in range(len(results)):
        ids.append(results[i][0])
    return ids