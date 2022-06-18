#PDF to JSON using Python 3+

# package to install
# pip install Fitz
# pip install pymupdf
import fitz
import json

def toJson(document:any):


    text = ''

    with fitz.open(stream=document) as doc:
        for page in doc:
            text+= page.get_text()
    # print(text)


    #json_object = json.dumps(text)

    #print(json_object)
    return text

