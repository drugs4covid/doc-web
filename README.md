# Application for content exploration of a document oriented database

step 1:
-
We will start by downloading the Docker tool and docker compose inside our operating system.

For linux operating systems we must run inside the command window:

$sudo apt-get update
$sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
With this we will have docker and docker-compose installed.


To start deploying the application we must download (or clone) the repository in Git: https://github.com/drugs4covid/doc-web . 

NOTE: it is recommended to have Github installed to be able to do directly: "sudo git clone https://github.com/drugs4covid/doc-web.git", although it is not necessary since we can download the application in a compressed .zip file and unzip it.




step 2:
-
This section is closely associated with the previous section "virtualization", since in order to deploy the application we must configure the options within the file docker-compose.yml . 


In case you want to deploy the application within a server, once docker is installed, the localhost address would be automatically assigned, you must use the redirection proxy used by our server to expose the ports, as an example, in the development of the project has been raised in the address 127.0.0.1 (Localhost).

The ports that have been used to raise this application are: 

MongoDb : 27017
Back-End: 8000
Front-End: 4200
portainer: 9000
ElasticSearch: 9200

It may be necessary to change the assigned ports, since the default ports of each service are being used. To do this we must access the docker-compose file and for each service, go to the line "ports: - 4200:4200" and modify the first part before ":" by the assigned port. For example :

 ports:
      - 9999:4200


This would assign port 9999 to the Front-End service.

step 3 (optional) :
-
Docker loads by default the Bridget network to the containers, due to the firewall security policies of certain companies, that IP may not have internet connection. The docker configuration allows us to change the range of IP addresses given to the containers.
1. Edit or create the docker daemon configuration file:
$sudo nano /etc/docker/daemon.json
 
2. Add the new configuration to the JSON file:
{
     "default-address-pools": [
         {
             "base": "10.10.0.0/16",
             "size": 24
         }
     ]
 }
3. Restart docker:
 
sudo service docker restart
 
In case you do not have access restriction in certain IP ranges you can skip this step.

step 4:
-
In this step we are going to adjust the different volumes and consequently, the Application data persistence. By default volumes have been generated in the container folder of the application or within the local storage of docker, to modify that we must go to the "volume" section of the container overwrite the first part of the command. For example if we go to the Mongo container:
  volumes:
      - ./mongo-data:/data/db → - /this/is/un/path/new:/data/db.
 
It would be to replace until ":" appears with the path we want to store the container data .

step 5:
-

Once we have configured the ports and volumes we don't need to configure more of the docker-compose file, it can be closed and we start a terminal inside the container folder. 

let's create the images that our application needs to be deployed, this is done using the build command of docker-compose and adding at the end the name of the container (in our case it is only needed with elasticmiddleware and angularcli, the rest are images already created inside the docker hub):

$docker-compose build elasticmiddleware
$docker-compose build angularcli


step 6:
-
Finally we must tell docker-compose to run docker-compose.yml:

$docker-compose up -d # -d tells docker-compose to run as daemon

In this process the necessary images for the containers will be downloaded and lifted.

step 6:

The server can now be accessed on the selected port and we should have access to the application login window. default address and port: "http://localhost:4200"

---------------------------------------------------------------------------------------------------------------------------------
# Aplicación para la exploración de contenidos de una base de datos orientada a documentos

Parte 1:
-
Empezaremos descargando la herramienta Docker y docker compose dentro de nuestro sistema operativo.

Para sistemas operativos linux debemos ejecutar dentro de la ventana de comandos:

$sudo apt-get update
$sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
Con esto tendremos docker y docker-compose instalado.


Para comenzar el despliegue de la aplicación deberemos descargarnos (o clonar) el repositorio en Git: https://github.com/drugs4covid/doc-web . 

NOTA: se recomienda tener instalado Github para poder hacer directamente:  “sudo git clone https://github.com/drugs4covid/doc-web.git”, aunque no es necesario ya que podemos descargar la aplicación en un archivo comprimido .zip y descomprimirlo.




Parte 2:
-
Este apartado está muy asociado con el apartado anterior “virtualización”, ya que para poder desplegar la aplicación debemos configurar las opciones dentro del fichero docker-compose.yml . 


En caso de querer desplegar la aplicación dentro de un servidor, una vez instalado docker, se asignaría automáticamente la dirección localhost, hay que usar el proxy de redirección que utilice nuestro servidor para exponer los puertos, como ejemplo, en el desarrollo del proyecto se ha levantado en la dirección 127.0.0.1 (Localhost).

Los puertos que se han utilizado para levantar esta aplicación son: 

MongoDb : 27017
Back-End: 8000
Front-End: 4200
portainer: 9000
ElasticSearch: 9200

Posiblemente se requiera cambiar los puertos asignados, ya que se están usando los puertos por defecto de cada servicio. Para ello deberemos acceder al fichero docker-compose y por cada servicio, ir a la línea “ports:  - 4200:4200” y modificar la primera parte antes de “:”  por el puerto asignado. Por ejemplo :

 ports:
      - 9999:4200


Esto asignaría el puerto 9999 al servicio de Front-End.

Parte 3 (opcional) :
-
Docker carga por defecto el la red Bridget a los contenedores, debido a las políticas de seguridad del firewall de ciertas empresas, dicha IP puede no tener conexión a internet. La configuración de docker nos permite cambiar el rango de direcciones IP que se dan a los contenedores.
1. Editar o crear el fichero de configuración del daemon de docker:
$sudo nano /etc/docker/daemon.json
 
2. Añadir la nueva configuración al fichero JSON:
{
     "default-address-pools": [
         {
             "base": "10.10.0.0/16",
             "size": 24
         }
     ]
 }
3. Reiniciar docker:
 
sudo service docker restart
 
En caso de no tener restricción de acceso en ciertos rangos de IP se puede obviar este paso.
 
paso 4:
-
En este paso vamos a ajustar los distintos volúmenes y en consecuencia, la persistencia de datos de la Aplicación. Por defecto se han generado volúmenes en la carpeta contenedora de la aplicación o dentro del almacenamiento local de docker, para modificar eso debemos ir a la sección “volume” del contenedor sobreescribir la primera parte del mandato. Por ejemplo si vamos al contenedor de Mongo:
  volumes:
      - ./mongo-data:/data/db →       - /esto/es/un/path/nuevo:/data/db
 
Sería sustituir hasta que aparece “:” con el path que queremos para almacenar los datos del contenedor .

paso 5:
-
Una vez hemos configurado los puertos y los volúmenes no es necesario configurar más del fichero docker-compose, se puede cerrar y arrancamos una terminal dentro de la carpeta contenedora. 

vamos a crear las imágenes que necesita nuestra aplicación  para poder  desplegarse, esto se hace mediante el comando build de docker-compose y añadiendo al final el nombre del contenedor (en nuestro caso solo hace falta con elasticmiddleware y angularcli, el resto son imágenes ya creadas dentro del docker hub ):

$docker-compose build elasticmiddleware
$docker-compose build angularcli


paso 6:
-

Por último debemos indicar a docker-compose que ejecute docker-compose.yml:

$docker-compose up -d # -d indica a docker-compose que se ejecute como daemon

En este proceso se descargarán las imágenes necesarias para los contenedores y se levantarán.

paso 6:

Ahora se puede acceder al servidor en el puerto seleccionado y deberíamos tener acceso a la ventana de login de la aplicación. direccion y puerto predeterminados: "http://localhost:4200"

