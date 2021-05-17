from flask import Flask
from flask_cors import cross_origin
import json

app = Flask(__name__)


@app.route('/')
@cross_origin()
def index():
    '''Index page route'''
    a = {'1':'百', '2': '早', '3':'字' }
    return a

