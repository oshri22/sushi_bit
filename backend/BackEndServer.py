from flask import Flask, session, request
from markupsafe import escape
import database
import os
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
app.secret_key = b'37ytOSvRF6'

# the sql client
dbmanger = database.Database("data.db")


@app.route('/api')
def index():
    pass


@app.route('/api/login', methods=["GET", "POST", "OPTIONS"])
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
        # add a check if the user is already conected

        res: dict = dbmanger.user_login(username, password)
        if res["name"] != "error":
            session["username"] = username
            session["password"] = password
        return json.dumps(res)


@app.route('/api/register', methods=["GET", "POST", "OPTIONS"])
def register():
    '''
    A route function for the register page that get the login info on a http post method
    then use the login function from the sql module to try register a new user 
    if registration complete sucssesfuly store his data on a coockie and send the acount info 
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

        res: dict = dbmanger.register(request.json)
        if res["name"] != "error":
            session["username"] = username
            session["password"] = password
        return json.dumps(res)


@app.route('/form/form')
def form():
    pass


@app.route('/api/menu')
def menu():
    pass


@app.route('/api/BuyMoney', methods=["POST"])
def BuyMoney():
    """  A rout function for the but money page
      get amount and the user_to as a json
      the pass them to the sql function to handel it next 

      user_to: the user to get parameter -string
      amount: the amount to transfer - int

      return a dict that describe the transfer status """
    return dbmanger.give_money(request.json["username"], request.json["amount"])


@app.route('/api/TransferMoney/<string:userTo>/<int:amount>', methods=["GET"])
def transfer_money(userTo, amount):
    '''
     A rout function for the transfer money page
     get the user to and amount form the get parameters so the user will be abel to preform xss on the site to force a transform
     the pass them to the sql function to handel it next 

     user_to: the user to get parameter -string
     amount: the amount to transfer - int
     user_from: the user to transfer the money from

     return a dict that describe the transfer status
    '''
    user_to = str(escape(userTo))
    amount = int(escape(amount))
    user_from = session["username"]
    return dbmanger.transfer_money(user_from, userTo, amount)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
