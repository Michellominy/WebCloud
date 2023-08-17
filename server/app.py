from flask import Flask
from flask import request
import os

app = Flask(__name__)

@app.get("/file")
def getFile():
    filePath = request.args['path']
    # TODO:
    # If file does not exist, send error
    # Else return file content
    return Flask.send_file()

@app.post("/file")
def postFile():
    # TODO:
    # https://flask.palletsprojects.com/en/2.3.x/patterns/fileuploads/
    return ""

@app.get("/dir")
def getDir():
    dirPath = request.args['path']
    # TODO: 
    # If dir does not exist, send error
    # Else return a list of the content of the directory
    return []


# DOC: https://flask.palletsprojects.com/en/2.3.x/quickstart/#html-escaping
