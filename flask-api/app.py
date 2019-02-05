from flask import Flask, render_template, request, jsonify, redirect
from flask_mysqldb import MySQL
from bean.parking_garage_detail import ParkingGarageDetail
from bean.parking_spot_reserve import ParkingSpotReserve
import jsonpickle
import uuid
import datetime

app = Flask(__name__)


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = '200_ok'

mysql = MySQL(app)

@app.route('/getAllLocations', methods=['GET'])
def getAllLocations():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT parking_garage_id,address,city,pincode from parking_garage_detail")
        res = cur.fetchall()
        locations = []
        cur.close()
        if len(res):
            for response in res:
                parking_garage_detail = ParkingGarageDetail()
                parking_garage_detail.parking_garage_id = response[0]
                parking_garage_detail.address = response[1]
                parking_garage_detail.city = response[2]
                parking_garage_detail.pincode = response[3]
                locations.append(parking_garage_detail)
            return jsonpickle.encode(locations, unpicklable=False), 200
        return jsonify({"Error": "No Locations"}), 200
    except Exception as e:
        return jsonify(e), 500

@app.route('/checkAvailability', methods=['POST'])
def checkAvailability():
    try:
        data = request.get_json()
        cur = mysql.connection.cursor()
        date = str(datetime.date.today())
        sql = "SELECT parking_garage_id from parking_spot_detail where parking_garage_id = %s and date = %s and available='Y'"
        cur.execute(sql,(data['parking_garage_id'],date))
        res = cur.fetchall()
        cur.close()
        if len(res):
            return jsonify({"Availability": "Available"}), 200
        return jsonify({"Availability": "Not Available"}), 200
    except Exception as e:
        return jsonify(e), 500

@app.route('/reserveSpot', methods=['POST'])
def reserveSpot():
    try:
        data = request.get_json()
        print (data['date'])
        cur = mysql.connection.cursor()
        sql = "SELECT parking_spot_detail.id,parking_spot_detail.parking_garage_id,parking_spot_detail.parking_spot_name from parking_spot_detail where parking_garage_id = %s and date = %s and available='Y'"
        cur.execute(sql,(data['parking_garage_id'],data['date']))
        res = cur.fetchone()
        if res:
            spot_id = res[0]
            order_id = uuid.uuid1().node
            parking_spot_reserve = ParkingSpotReserve()
            parking_spot_reserve.order_id = order_id
            parking_spot_reserve.order_status = 'RESERVED'
            parking_spot_reserve.parking_garage_id = res[1]
            parking_spot_reserve.parking_spot_name = res[2]
            parking_spot_reserve.date = data['date']
            parking_spot_reserve.username = data['username']
            parking_spot_reserve.phoneno = data['phoneno']

            sql = "UPDATE parking_spot_detail SET available='N' where id = %s"
            cur.execute(sql,(spot_id,))

            sql = "INSERT INTO parking_spot_reserve_detail(order_id,order_status,parking_garage_id,parking_spot_name,user_name,phone_no,date) \
            VALUES (%s,'RESERVED',%s,%s,%s,%s,%s)"
          
            cur.execute(sql,(parking_spot_reserve.order_id,parking_spot_reserve.parking_garage_id,parking_spot_reserve.parking_spot_name,parking_spot_reserve.username,parking_spot_reserve.phoneno,parking_spot_reserve.date))       
            mysql.connection.commit()
            cur.close()

            return jsonpickle.encode(parking_spot_reserve, unpicklable=False), 200
        else :
            return jsonify({"Availability": "Not Available"}), 200
    except Exception as e:
        return jsonify(e), 500

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)
