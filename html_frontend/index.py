
from flask import Flask,jsonify, render_template,request
from flask_cors import CORS,cross_origin
import requests

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# test = '149.165.171.36'
# prod = ''


@app.route('/checkAvailability', methods=['POST'])
def checkAvailability():
        try:
                data = request.get_json()
                url = 'http://'+'python.service.consul:5000'+'/checkAvailability'
                print (data)
                res = requests.post(url,data)
                print (res)
                return jsonify(res.json()), 200
        except Exception as e:
                return jsonify(e), 500


@app.route('/reserveSpot', methods=['POST'])
def reserveSpot():
        try:
                data = request.get_json()
                url = 'http://'+'python.service.consul:5000'+'/reserveSpot'
                res = requests.post(url,data)
                return jsonify(res.json()), 200
        except Exception as e:
                return jsonify(e), 500


@app.route('/getAllGarages', methods=['POST'])
def getAllGarages():
        try:
                url = 'http://'+'java.service.consul:8090'+'/api/getAllGarages'
                res = requests.get(url)
                print(res.json())
                return jsonify(res.json()), 200
        except Exception as e:
                print("s")
                return res.json()

@app.route('/register', methods=['POST'])
def register():
        try:
                data = request.get_json()
                url = 'http://'+'java.service.consul:8090'+'/api/register?firstname='+data['firstname']+'&lastname='+data['lastname']+'&username='+data['username']+'&password='+data['password']
                res = requests.get(url)
                return jsonify(res.json()), 200
        except Exception as e:
                return jsonify(e), 500


@app.route('/login', methods=['POST'])
def login():
        try:
                data = request.get_json()
                url = 'http://'+'java.service.consul:8090'+'/api/login?username='+data['username']+'&password='+data['password']
                res = requests.get(url)
                return jsonify(res.json()), 200
        except Exception as e:
                return jsonify(e), 500

@app.route('/get_all_garage', methods=['POST'])
def get_all_garage():
        try:
                data = request.get_json()
                url = 'http://'+'nodejs.service.consul:3003'+'/get_all_garage/'+data['user'];
                print(url)
                print(data)
                res = requests.get(url)
                return jsonify(res.json()), 200
        except Exception as e:
                return jsonify(e), 500

@app.route('/add_parking', methods=['POST'])
def add_parking():
        try:
                data = request.get_json()
                url = 'http://'+'nodejs.service.consul:3003'+'/add_parking'
                res = requests.post(url,data)
                return jsonify(res.json()), 200
        except Exception as e:
                return jsonify(e), 500


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5005)

