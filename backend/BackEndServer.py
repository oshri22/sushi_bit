from flask import Flask, session, request
from markupsafe import escape
import database
import os
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
app.secret_key = b''

#the sql client 
dbmanger = database.Database("data.db")

""" @app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*" 
    return response """

@app.route('/api')
def index():
    pass


@app.route('/api/login', methods=["GET","POST","OPTIONS"])
def login():
    '''
    A route function for the login page that get the login info on a http post method
    then use the login function from the sql module to try login the user to his account
    if login complete sucssesfuly store his data on a coockie and send the acount info 
    for the react.js on the client side
    if login failed then send an error response for the react.js on the client side

    request: the object flask make from the http post data
    session: flask object that semulate a coockie

    username: the given username -- str
    password: the given password -- str

    res: the response data for the react.js on the client side -- dict/json
    
    '''
    if request.method == "POST":
        username: str = request.json["username"]
        password: str = request.json["password"]
        #add a check if the user is already conected

        res:dict = json.loads(dbmanger.user_login(username, password))
        if res["name"] == username:
            session["username"] = username
            session["password"] = username
        return json.dumps(res)
        
    return "You are not suppose to use get here"



@app.route('/api/register')
def register():
    pass


@app.route('/form/form')
def form():
    pass


@app.route('/api/menu')
def menu():
    pass


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug= False)
