from flask import Flask, session, request
from markupsafe import escape
import os

app = Flask(__name__)
app.secret_key = b''

@app.route('/')
def index():
    pass

@app.route('/login')
def login():
    pass


@app.route('/register')
def register():
    pass


@app.route('/form')
def form():
    pass


@app.route('/menu')
def  menu():
    pass


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port)
    