from flask import Flask, url_for, render_template , session, request, redirect
from markupsafe import escape

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