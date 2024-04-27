from flask import Flask, jsonify, request
import paho.mqtt.client as mqtt
import threading
import time
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Carga las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)

# Configura los detalles del broker MQTT
mqtt_broker = os.getenv("MQTT_BROKER")
mqtt_port = 1883
dispensar_topic = os.getenv("DISP_TOPIC")
soplar_topic = os.getenv("SOPLAR_TOPIC")
mqtt_username = os.getenv("MQTT_USERNAME")
mqtt_password = os.getenv("MQTT_PASSWORD")

# Inicializa el cliente MQTT
client = mqtt.Client()

# Establece el username y password si están disponibles
if mqtt_username and mqtt_password:
    client.username_pw_set(mqtt_username, mqtt_password)

# Configuración de MongoDB modificada para usar variables de entorno
mongo_user = os.getenv("MONGO_INITDB_ROOT_USERNAME")
mongo_password = os.getenv("MONGO_INITDB_ROOT_PASSWORD")
mongo_host = os.getenv("MONGODB_HOST", "localhost")
mongo_port = os.getenv("MONGODB_PORT", "27017")
mongo_uri = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}/"

mongo_client = MongoClient(mongo_uri)
db = mongo_client['dispensador_database']  # Nombre de la base de datos
dispensar_collection = db['dispensar']  # Colección para dispensar
soplar_collection = db['soplar']  # Colección para soplar

# Callback para cuando el cliente recibe una CONNACK del servidor
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    if rc == 0:
        print("Connected to MQTT Broker!")
        client.subscribe(dispensar_topic)
        client.subscribe(soplar_topic)
    else:
        print("Failed to connect, return code %d\n", rc)


# Callback que se llama cuando se recibe un mensaje del servidor.
def on_message(client, userdata, msg):
    payload = msg.payload.decode('utf-8')
    try:
        if msg.topic == dispensar_topic:
            print(msg.topic + " " + payload)
            dispensar_collection.insert_one({"dispensar": int(payload)})
        elif msg.topic == soplar_topic:
            print(msg.topic + " " + payload)
            soplar_collection.insert_one({"soplar": int(payload)})
    except Exception as e:
        print(f"Failed to insert data: {e}")

client.on_connect = on_connect
client.on_message = on_message

client.connect(mqtt_broker, mqtt_port, 60)
client.loop_start()

@app.route('/')
def index():
    return "MQTT to Flask Bridge"

def publish_message(topic, message):
    try:
        result = client.publish(topic, message)
        if result.rc == 0:
            print(f"Message published to {topic}")
            return True
        else:
            print(f"Failed to publish message: {mqtt.error_string(result.rc)}")
            return False
    except Exception as e:
        print(f"Exception while publishing message: {e}")
        return False


def schedule_shutdown(milliseconds):
    seconds = milliseconds / 1000  # Convertir milisegundos a segundos
    print(f"Scheduling shutdown in {milliseconds} milliseconds")
    time.sleep(seconds)  # time.sleep espera segundos, por lo que convertimos los milisegundos a segundos.
    if publish_message(dispensar_topic, '0'):
        print("Dispenser turned off successfully.")
    else:
        print("Failed to turn off dispenser.")

@app.route('/dispensar/encender', methods=['POST'])
def encender_dispensar():
    seconds = request.args.get('seconds', default=0, type=int)  # Obtener segundos del parámetro de consulta
    
    if seconds <= 0:
        return jsonify({"success": False, "message": "No se puede encender el dispensador por 0 segundos o menos."}), 400
    
    milliseconds = seconds * 200  # Convertir segundos a milisegundos (1 segundo = 100 milisegundos)
    if publish_message(dispensar_topic, '1'):
        if milliseconds > 0:
            # Programa un hilo para apagar el dispensador después del tiempo especificado en milisegundos
            timer = threading.Thread(target=schedule_shutdown, args=(milliseconds,))
            timer.start()
        return jsonify({"success": True, "message": "Dispensando...", "shutdown_in": f"{milliseconds} milliseconds"}), 200
    else:
        return jsonify({"success": False, "message": "Failed to turn on dispenser"}), 500


@app.route('/dispensar/apagar', methods=['POST'])
def apagar_dispensar():
    try:
        client.publish(dispensar_topic, '0')
        return jsonify({"success": True, "message": "Dispensador apagado"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route('/getDispensar')
def get_dispensar():
    try:
        dispensario = dispensar_collection.find().sort("_id", -1).limit(10)
        # Convertir cada ObjectId a string
        result = [{"dispensar": disp["dispensar"], "id": str(disp["_id"])} for disp in dispensario]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/getSoplar')
def get_soplar():
    try:
        # Recupera los últimos 10 registros de soplar
        soplidos = soplar_collection.find().sort("_id", -1).limit(10)
        result = [{"soplar": sopla["soplar"], "id": str(sopla["_id"])} for sopla in soplidos]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')