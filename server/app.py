from flask import Flask
from flask import request, send_file
import os

BASE_DIR_ROUTE = "/home/michel/cloudRoot"

app = Flask(__name__)

@app.get("/file")
def sendFile():
    filePath = request.args['path']
    # TODO:
    # If file does not exist, send error
    # Else return file content
    return send_file(BASE_DIR_ROUTE + filePath)

@app.post("/file")
def uploadFile():
    filePath = request.args['path']
    # TODO:
    # https://flask.palletsprojects.com/en/2.3.x/patterns/fileuploads/
    # file MUST contain an extension (a point)
    file = request.files['file']
    return ""

@app.get("/dir")
def getDir():
    dirPath = request.args['path']
    print(BASE_DIR_ROUTE + dirPath)

    dirList = []
    fileList = []

    obj = os.scandir(BASE_DIR_ROUTE + dirPath)

    for entry in obj:
        if entry.is_dir():
            dirList.append(entry.name)
        elif entry.is_file():
            fileList.append(entry.name)

    return [fileList, dirList]


# DOC: https://flask.palletsprojects.com/en/2.3.x/quickstart/#html-escaping
