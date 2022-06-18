import requests
import json
import pandas as pd


query = "http://librairy.linkeddata.es/solr/covid-paragraphs/select?_=165168303538&q=*:*"

response = requests.get(query).json()

#creamos un archivo.json y guardamos la info ordenada, tambn parseamos para que pille solamente 'docs' dentro del json
with open("../archivosDePrueba/docs.json", 'w') as file:
    json.dump(response['response']['docs'],file,indent=2)

#print de prueba del archivo guardado
df = pd.read_json("../archivosDePrueba/docs.json")
print(df.to_json(orient='index', indent=2))
print("--------------------------------------------------------------------------")