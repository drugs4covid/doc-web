
import json
import re
import time
from datetime import datetime, timedelta
from typing import Any
import fitz
import requests
from fastapi import HTTPException, Depends, status, File
from fastapi.security import OAuth2PasswordBearer
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from starlette.responses import JSONResponse

from src.configuration import config
from src.models.token import *
from src.models.user import *

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_cxt = CryptContext(schemes =["bcrypt"],deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#---------------------------------------------------------------------------Class ServiceLogin---------------------------------------------------------------------------------------------------------------------------------------

class ServiceLogin():





    def create_user(request: User):
        try:
            hashed_pass = ServiceLogin.bcrypt(request.password)
            user_object = dict(request)
            user_object["password"] = hashed_pass

            print(str(user_object["username"]))
            if config.collection.count_documents({"username": str(
                    user_object["username"])}) != 0:  # if user exist we send error mesage and break operation

                return JSONResponse(status_code=400, content="username already exist.")
            else:

                user_id = config.collection.insert_one(user_object)
                print(request)
                return JSONResponse(status_code=201,
                                    content={"res": "created"}
                                    )
        except Exception as e:
            print("Error:")
            print(e)
            return str(e)

    def login(request: OAuth2PasswordRequestForm = Depends()):
        try:
            user = config.collection.find_one({"username": request.username})
            if not user:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail=f'No user found with this {request.username} username')
            if not ServiceLogin.verify(user["password"], request.password):
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Wrong Username or password')
            access_token = ServiceLogin.create_access_token(data={"sub": user["username"]})
            return JSONResponse(status_code=200,
                                content={"access_token": access_token, "token_type": "bearer"})

        except HTTPException as e:
            print("Error:")

            raise e
    @staticmethod
    def get_users():
        try:
            allusers = []
            list(allusers)
            col = config.collection.find({}, {"_id": 0})
            for x in col:
                allusers.append(x)

                print(x)

            print(allusers)
            return allusers
        except Exception as e:
            print("Error")
            print(e)
            return str(e)


    def delete_user(username: str):
    # collection.deleteOne({name:"Maki"})

        try:
            if config.collection.count_documents(
                    {"username": username}) != 0:  # if user exist  send  mesage and performt operation
                userfind = config.collection.find_one({"username": username}, {"_id": 0})
                config.collection.delete_one({'username': str(username)})
                # result.deleted_count

                print("colis\n")
                print(userfind)
                return JSONResponse(status_code=200,
                                    content=userfind
                                    )



            else:

                return JSONResponse(status_code=400, content="user doesnt exist.")
        except Exception as e:
            print("Error")
            print(e)
            return str(e)
    def getUser(username: str):
        try:

            if config.collection.count_documents(
                    {"username": username}) != 0:  # if user exist  send  mesage and performt operation
                userfind = config.collection.find_one({"username": username}, {"_id": 0})
                print("colis\n")
                print(userfind)
                return JSONResponse(status_code=200,
                                    content=userfind
                                    )



            else:

                return JSONResponse(status_code=400, content="username doesnt exist.")
        except Exception as e:
            print("Error")
            print(e)
            return str(e)

    #auxiliar functions
    def bcrypt(password:str):
        return pwd_cxt.hash(password)
    def verify(hashed,normal):
        return pwd_cxt.verify(normal,hashed)
    def create_access_token(data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    def verify_token(token:str,credentials_exception):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = TokenData(username=username)
        except JWTError:
            raise credentials_exception
    def get_current_user(token: str = Depends(oauth2_scheme)):
        credentials_exception = HTTPException(
            status_code="HTTP_401_UNAUTHORIZED",
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        return ServiceLogin.verify_token(token,credentials_exception)

#---------------------------------------------------------------------------Class ServiceElastic---------------------------------------------------------------------------------------------------------------------------------------
class ServiceElastic():
    def toJson(document:any):


        text = ''

        with fitz.open(stream=document) as doc:
            for page in doc:
                text+= page.get_text()
        # print(text)


        #json_object = json.dumps(text)

        #print(json_object)
        return text

    def post_index(index: Any, document: dict, id: Any):
        try:
            #print(await request.json())
            # print("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
            # print("u know, for test")
            #j = await request.json()
            # print("index is", index)
            # print("request is", j)
            # print("id is", id)
            resp = config.es.index(index=str(index), id=str(id), document=document)
            return resp

        except Exception as e:
            print("Error on service")
            print(e)
            return e

    def post_indexpdf(index: Any,author: str = "ElBarto", id: str =" 1", file: bytes = File(), ):
        try:
            request = ServiceElastic.toJson(file)#llamamos a toJson que usa la libreria FLITZ para extraer la información del pdf
            timestamp=time.time()
            dt_object = datetime.fromtimestamp(timestamp)

            #llamamos a re.(regresion library) con objeto de eliminar caracteres especiales.EX:Recuperaci\´on\\nde Informaci\´on -->Recuperacion\nde Informacion
            my_new_string = re.sub('[^a-zA-Z0-9 \n\.]', '', request)
            jsonresponse = {
                "date":dt_object,
                "author":author,
                "text": my_new_string}
            print("index is", index)
            print("id is", id)
            print("jsonresponse is", jsonresponse)
            print(
                "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")

            print("u know, for test")
            resp = config.es.index(index=index, id=id, document=jsonresponse)
            return resp

        except Exception as e:
            print("Error")
            print(e)
            raise e

    def get_Index(index: str, id: str):
        resp = config.es.get(index=index, id=id)
        print(resp['_source'])
        jsonresp = json.dumps(resp['_source'], indent=4)
        print(jsonresp)
        return resp
    def get_Mapp(index: str):
        path = config.urlelastic + index + '/_mapping'

        r = requests.get(path)
        return (json.loads(r.text))

    def search(index: str):
        try:
            path = config.urlelastic + index + '/_search'

            r = requests.get(path)

            response=json.loads(r.text)
            responsecode=r.status_code

            if(responsecode!=200):
                return (json.loads(r.text))
            #
            # for x in response['hits']['hits'] :
            #     print(x['_id'])
            # print(response)
            return (json.loads(r.text))
        except Exception as e:
            print("Error")
            print(e)
            raise e
    def get_match(index: str,matchRequested: str):
        try:
            path = config.urlelastic + index + '/_search'
            body={"query": { "match": {"text": matchRequested}}}
            r = requests.post(path,json=body)
            responsecode=r.status_code
            if(responsecode!=200):
                return JSONResponse(status_code=responsecode,
                                    content=json.loads(r.text)
                                    )
            return (json.loads(r.text))
        except Exception as e:
            print("Error")
            print(e)
            raise e
    def delete_Index(index: str):
        try:
            path = config.urlelastic +index
            r = requests.delete(path)

            txtresponse=(json.loads(r.text))
            return JSONResponse(status_code=200,
                                content=txtresponse
                                )
        except Exception as e:
            print("Error")
            print(e)
            raise e
    def delete_IndexById(index: str, id: str):
        try:
            resp = config.es.delete(index=index, id=id)
            return resp
        except Exception as e:
            print("Error")
            print(e)
            raise e
    @staticmethod
    def get_Indexes():
        schema = config.es.indices.get_alias().keys()

        allindexlist = []
        for value in schema:
            print(value)
            allindexlist.append(value)
        print(allindexlist)

        return allindexlist

