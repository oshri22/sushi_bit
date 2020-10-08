from flask import Flask, session, request
from markupsafe import escape
import database
import os
import json

app = Flask(__name__)
app.secret_key = b''

dbmanger = database.Database("data.db")


@app.route('/')
def index():
    pass


@app.route('/login', methods=["POST"])
def login():
    username: str = request.form["username"]
    password: str = request.form["password"]

    res = json.loads(dbmanger.user_login(username, password))
    if res["name"] == username:
        session["name"] = username
        session["password"] = username
    return json.dumps(res)




@app.route('/register')
def register():
    pass


@app.route('/form')
def form():
    pass


@app.route('/menu')
def menu():
    pass


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
