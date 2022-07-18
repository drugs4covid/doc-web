#pip install fastapi
#pip install uvicorn
#pip install pandas
#pip install aiofiles
#pip install matplotlib
#pip install python-multipart
#pip install pymongo
#import http.client

from typing import Any

from fastapi import Depends, Request, File
from fastapi.security import OAuth2PasswordRequestForm

from src.configuration import *
from src.models.user import *
from src.services.Services import ServiceLogin, ServiceElastic

# import matplotlib.pyplot as plt
# import requests
# from PIL import Image
# import io
# MONGO CLIENT CONFIG

app=config.app
collection=config.collection
es=config.es
urlelastic=config.urlelastic


# ----------------------------Here starts MAIN.py-----------------------------------------

# -------------------------------------------------CRUD MONGODB ------------------------------------.-----------------------------------------
@app.post('/register')
def create_user(request: User):
    try:
        response=ServiceLogin.create_user(request)
        return response
    except Exception as e:
        print("Error:")
        print(e)
        return str(e)


@app.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends()):
    try:
        response=ServiceLogin.login(request)
        return response
    except Exception as e:
        print("Error")
        print(e)
        return str(e)

@app.get("/allusers")
def get_users():
    try:
        response=ServiceLogin.get_users()
        return response
    except Exception as e:
        print("Error")
        print(e)
        return str(e)

@app.delete("/users")
async def delete_user(username: str):
    # collection.deleteOne({name:"Maki"})

    try:
        response=ServiceLogin.delete_user(username)
        return response
    except Exception as e:
        print("Error")
        print(e)
        return str(e)


@app.get("/users")
async def getUser(username: str):
    try:
        response=ServiceLogin.getUser(username)
        return response
    except Exception as e:
        print("Error")
        print(e)
        return str(e)


# ----------------------------------------------------------CRUD Elasticsearch --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

@app.post("/newIndex", status_code=201)
async def post_index(index: Any, request: Request, id: Any = 1):
    try:
        jsondict = await request.json()# we obtain json from request
        response = ServiceElastic.post_index(index,jsondict,id)
        return response

    except Exception as e:
        print("Error")
        print(e)
        raise e


@app.post("/pdftoJson", status_code=201)
async def post_indexpdf(index: Any,author: str, id: str, file: bytes = File(), ):
    try:
        response=ServiceElastic.post_indexpdf(index,author,id,file)
        return response

    except Exception as e:
        print("Error")
        print(e)
        raise e


@app.get("/index")
def get_Index(index: str, id: str):
    try:
        response=ServiceElastic.get_Index(index,id)
        return response
    except Exception as e:
        print("Error")
        print(e)
        raise e

@app.get("/allindex")
def get_Indexes():
    try:
        return ServiceElastic.get_Indexes()
    except Exception as e:
        print("Error")
        print(e)
        raise e

@app.get("/mapping")
def get_Mapp(index: str):
    response = ServiceElastic.get_Mapp(index)
    return response
@app.get("/search")
def search(index: str):
    try:
        response=ServiceElastic.search(index)
        return response
    except Exception as e:
        print("Error")
        print(e)
        raise e
@app.get("/searchMatch")
def get_match(index: str,matchRequested: str):
    try:
        response=ServiceElastic.get_match(index,matchRequested)
        return response
    except Exception as e:
        print("Error")
        print(e)
        raise e


@app.delete("/deleteindex",status_code=200)
def delete_Index(index: str):
    try:
        response=ServiceElastic.delete_Index(index)
        return response
    except Exception as e:
        print("Error")
        print(e)
        raise e


@app.delete("/indexbyid")
def delete_IndexById(index: str, id: str):
    try:
        resp = es.delete(index=index, id=id)
        return resp
    except Exception as e:
        print("Error")
        print(e)
        raise e

@app.get("/testquery")
def getIndice():
    query = es.search(index="test-index", query=[])
    return query
