import psycopg2
import json
import psycopg2.extras
from flask import jsonify
from flask import Flask, render_template, request, send_file,jsonify
from flask_mail import Mail, Message
from io import BytesIO
from flask_cors import CORS
from function.queryUser import *
from function.queryAnnounces import *
from function.connectDB import *
from function.query import *
from function.queryAssociation import *
from function.queryImage import *


app = Flask(__name__, template_folder="templates")
app.config['JWT_SECRET_KEY'] = 'please-change-me'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'suport.sender@gmail.com'
app.config['MAIL_PASSWORD'] = 'licenta123'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/login', methods=["POST"])
def login():
    login_json = request.get_json()
    return loginUser(login_json)

@app.route('/contactUs', methods=["POST"])
def contactUs():
    response = request.get_json()
    name = response[0]
    email = response[1]
    phone = response[2]
    subject = response[3]
    message = response[4]
    msg = Message(subject,sender='suport.sender@gmail.com', recipients=['emailsuport.donation@gmail.com'])
    msg.body = "Destinar: "+str(name)+"\nNumar de telefon: " + str(phone) + "\nAdresa email:  " + str(email)+" \nMesaj: \n"+str(message)
    mail.send(msg)
    return "Sent"

@app.route('/confirmEmail',methods=['POST'])
def confirmEmail():
    response = request.get_json()
    email = response[0]
    msg = Message("Confirmare Email",sender='suport.sender@gmail.com', recipients=[email])
    msg.body = "Buna ziua !\n Mesajul dumneavoastra a fost primit si inregistrat iar in cel mai scurt tip cine din echipa se va ocupa de problema dumneavoastra!\nMultumim de informare!"
    mail.send(msg)
    return "Sent"

@app.route('/protected',methods=['GET'])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/announce', methods=["POST"])
def addAnnouce():
    response = request.get_json()
    return addNewAnnounce(response)


@app.route('/images', methods=["POST"])
def index():
    idd = request.form.to_dict()
    iddValue = idd['idd']
    file = request.files['file'].read()
    conn = connectToDB()
    cursor = conn.cursor()
    today = datetime.now()
    cursor.execute("INSERT INTO imagesAdd (announceId,image) VALUES(%s, %s)", (iddValue,file))
    conn.commit()
    cursor.close()
    conn.close()
    return "done"

@app.route('/imagesAssoc', methods=["POST"])
def imagesAsscoc():
    idd = request.form.to_dict()
    emailAssoc = idd['email']
    iddValue = getIdAssoc(emailAssoc)
    file = request.files['file'].read()
    conn = connectToDB()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO imagesAsscoc (associationId,image) VALUES(%s, %s)", (iddValue,file))
    conn.commit()
    cursor.close()
    conn.close()
    return "done"

@app.route('/listAnnounces')
def showAnnounces():
    return allAnnounces()

@app.route('/listUserAnnounces')
def listUserAnnounces():
    emailUser = request.args.get('email','')
    return allUserAnnounces(emailUser)

@app.route('/listAssociations')
def showAssociations():
    return showAllAssociations()

@app.route('/registerUser', methods = ['POST'])
def registerUser():   
    login_json = request.get_json()
    return registerNewUser(login_json)

@app.route('/registerAssociation', methods = ['POST'])
def registerAssociation():   
    login_json = request.get_json()
    return rigisterNewAssociation(login_json)


@app.route('/allImages/', methods = ['GET'])
def showImages():
    addId = request.args.get('id', '')
    idd = idFirstImage(addId)
    num = numberImages(addId)
    response = dict(minId=idd,numberImage=num)
    return response

@app.route('/oneImage',methods=['GET'])
def backImage():
    imageId = request.args.get('id','')
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT image FROM imagesadd WHERE imageId = %s"
    imgIdd = (imageId,)
    result = cur.execute(stmt, imgIdd)
    results = cur.fetchall()
    result = results[0][0]
    return send_file(BytesIO(result), attachment_filename="image.jpg",mimetype='image/jpg',as_attachment=True, cache_timeout=0)

@app.route('/allImagesAssociation', methods = ['GET'])
def showImagesAssoc():
    iddAssoc = request.args.get('id', '')
    idd = idFirstImageAssoc(iddAssoc)
    num = numberImagesAssoc(iddAssoc)
    response = dict(minId=idd,numberImage=num)
    return response

@app.route('/oneImageAssociation',methods=['GET'])
def backImageAssoc():
    imageId = request.args.get('id','')
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT image FROM imagesAsscoc WHERE imageId = %s"
    imgIdd = (imageId,)
    result = cur.execute(stmt, imgIdd)
    results = cur.fetchall()
    result = results[0][0]
    return send_file(BytesIO(result), attachment_filename="image.jpg",mimetype='image/jpg',as_attachment=True, cache_timeout=0)


@app.route('/infoAssociation', methods=['GET'])
def infoAssociation():
    if 'email' in request.args:
        paramRequest = request.args.get('email','')
        stmt = "SELECT associationId, associationsEmail,associationName,associationsDescription,linkSite,motto,contactEmail,phone FROM associations WHERE associationsEmail=%s;"
    else:
        if 'id' in request.args:
            paramRequest = request.args.get('id','')
            stmt = "SELECT associationId,associationsEmail, associationName,associationsDescription,linkSite,motto,contactEmail,phone FROM associations WHERE associationId=%s;"
    conn = connectToDB()
    cur = conn.cursor()
    param = (paramRequest,)
    result = cur.execute(stmt, param)
    results = cur.fetchall()
    json_data = [] 
    row_headers=[x[0] for x in cur.description]
    for result in results:
        json_data.append(dict(zip(row_headers,result)))
    return json.dumps(json_data)

@app.route('/editProfile', methods=['POST'])
def editProfile():
    response = request.get_json()
    email = response[0]
    if(response[1] !=''):
        addMottoAssociation(email,response[1])
    if(response[2] !=''):
        addLinkAssociation(email,response[2])
    if(response[3] !=''):
        addEmailContactAssociation(email,response[3])
    if(response[4] !=''):
        addDescriptionAssociation(email,response[4])
    return 'done'

@app.route('/addLogo', methods=['POST'])
def addLogo():
    data = request.form.to_dict()
    email = data['email']
    file = request.files['file'].read()
    conn = connectToDB()
    cursor = conn.cursor()
    stmt = "UPDATE associations SET logo = %s WHERE associationsEmail=%s;"
    result = cursor.execute(stmt, (file,email))
    conn.commit()
    cursor.close()
    conn.close()
    return "done"

@app.route('/profileLogoAssociation',methods=['GET'])
def profileLogoAssociation():
    emailAssoc = request.args.get('email','')
    conn = connectToDB()
    cur = conn.cursor()
    stmt = "SELECT logo FROM associations WHERE associationsEmail = %s"
    email = (emailAssoc,)
    result = cur.execute(stmt, email)
    results = cur.fetchall()
    result = results[0][0]
    return send_file(BytesIO(result), attachment_filename="image.jpg",mimetype='image/jpg',as_attachment=True, cache_timeout=0)


@app.route('/userData',methods=['GET'])
def userData():    
    emailUser = request.args.get('email','')
    return infoAboutUser(emailUser)

@app.route('/associationData',methods=['GET'])
def associationData():    
    emailUser = request.args.get('email','')
    return infoAboutAssociation(emailUser)

 
if __name__ == "__main__":
    app.run()