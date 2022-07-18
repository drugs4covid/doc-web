from datetime import datetime

from elasticsearch import Elasticsearch

es = Elasticsearch("http://localhost:9200")
import pandas as pd


doc = {
    'author': 'elBarto',
    'text': 'Elasticsearch: cool. bonsai cool.',
    'timestamp': datetime.now(),
}

df = pd.read_json("/home/diego/Documentos/git/TFG/ElasticMiddleware/archivosDePrueba/docs.json")
resp = es.index(index="test-index", id=1, document=doc)



print("----------------------INDEX------------------------")
print(resp)
# julio=es.indices.get_alias("*")
# print(julio)
print("------------------------------------------------------")



print("-------------------UPDATE--------------------------")#si no está la key lo añade y si no, modifica el valor


doc1 = {
    'dadada': 'author_name',
    'text': 'Interensting modified content...',
    'timestamp': datetime.now(),
}
resp1 = es.update(index="test-index", id=1, doc=doc1)
print(resp1)





print("-------------------GET--------------------------")
resp = es.get(index="test-index", id=1)
print(resp['_source'])
print("------------------------------------------------------")
# es.indices.refresh(index="test-index")










resp = es.search(index="test-index", query={"match_all": {}})
print("Got %d Hits:" % resp['hits']['total']['value'])

print ("-------------------------Mytest-----------------------------")
print(resp['hits'])
# for hit in resp['hits']['hits']:
#     print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])
