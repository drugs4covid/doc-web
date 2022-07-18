#pip install fastapi
#pip install uvicorn
#pip install pandas
#pip install aiofiles
#pip install matplotlib
#pip install python-multipart
#pip install pymongo
#import http.client

from elasticsearch import Elasticsearch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure


class config:
#Local path configuration
    # try:
    #     urlelastic = 'http://localhost:9200/'
    #     app = FastAPI()
    #
    #     app.add_middleware(
    #         CORSMiddleware,
    #         allow_origins=['*'],
    #         allow_credentials=True,
    #         allow_methods=["*"],
    #         allow_headers=["*"],
    #     )
    #
    #     # Mongo CLIENT CONFIG
    #     uri = 'mongodb://root:1234@localhost/admin'  # 27017 is the default port number for mongodb
    #     connect = MongoClient(uri)
    #     db = connect.myDb
    #     collection = db.demoCollection
    #     # db = connect["User"]
    #     # ELASTIC CLIENT CONFIG
    #
    #     es = Elasticsearch(
    #         "http://localhost:9200")  # local ip 127.0.0.1 and resolved ip by docker 172.28.0.X for elasticnetwork
    #
    #
    #
    # except ConnectionFailure as e:
    #     print("[+] Database connection error!")
    #     raise e
#Docker path configuration
    try:

        app = FastAPI()
        app.add_middleware(
            CORSMiddleware,
            allow_origins=['*'],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        #Mongo CLIENT CONFIG
        uri = 'mongodb://root:1234@db/admin'# 27017 is the default port number for mongodb
        connect = MongoClient(uri)
        db=connect.myDb
        collection = db.demoCollection
        #ELASTIC CLIENT CONFIG
        #local ip 127.0.0.1 and resolved ip by docker 172.28.0.X for elasticnetwork
        es = Elasticsearch("http://es01:9200")
        #this url will be used in Request petitions, it is similar kind of request as Elasticsearch APIPython but atttacking directly to Elastic API
        urlelastic = 'http://es01:9200/'


    except ConnectionFailure as e:
        print("[+] Database connection error!")
        raise e





