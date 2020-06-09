import psycopg2
import psycopg2.extras

def connectToDB():
    connectionString = 'dbname=postgres user=postgres password=licenta host=localhost'
    try:
        return psycopg2.connect(connectionString)
    except:
        print("Can't connect to database")