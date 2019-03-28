from flask import Flask, jsonify,request
from flask_cors import CORS,cross_origin
from flaskext.mysql import MySQL
from bean.parking_garage_detail import ParkingGarageDetail
from bean.parking_spot_reserve import ParkingSpotReserve
import jsonpickle
import uuid
import datetime


app = Flask(__name__)
mysql = MySQL()
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# MySQL configurations
# Dummy commit by Jainendra to test jenkins build
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password200ok@123'
app.config['MYSQL_DATABASE_DB'] = '200_ok'
app.config['MYSQL_DATABASE_HOST'] = '149.165.169.93'

mysql.init_app(app)

@app.route('/getAllLocations')
def getAllLocations():
    cur = mysql.connect().cursor()
    cur.execute('''SELECT parking_garage_id,address,city,pincode from 200_ok.parking_garage_detail''')
    res = cur.fetchall()
    try:
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
        cur = mysql.connect().cursor()
        date = str(datetime.date.today())
        sql = "SELECT COUNT(parking_garage_id) from parking_spot_detail where parking_garage_id = %s and date = %s and available='Y'"
        cur.execute(sql,(data['parking_garage_id'],date))
        res = cur.fetchone()
        cur.close()
        if res[0]!=0:
            return jsonify({"availability": "Y", "count":res[0]}), 200
        return jsonify({"availability": "N"}), 200
    except Exception as e:
        return jsonify(e), 500


@app.route('/reserveSpot', methods=['POST'])
def reserveSpot():
    try:
        data = request.get_json()
        date = str(datetime.date.today())
        con = mysql.connect()
        cur = con.cursor()
        print(data)
        sql = "SELECT parking_spot_detail.id,parking_spot_detail.parking_garage_id,parking_spot_detail.parking_spot_name from parking_spot_detail where parking_garage_id = %s and date = %s and available='Y'"
        cur.execute(sql,(data['parking_garage_id'],date))
        res = cur.fetchone()
        cur.close()
        con.close()
        print (res)
        if res:
            spot_id = res[0]
            order_id = uuid.uuid1().node
            parking_spot_reserve = ParkingSpotReserve()
            parking_spot_reserve.order_id = order_id
            parking_spot_reserve.order_status = 'RESERVED'
            parking_spot_reserve.parking_garage_id = res[1]
            parking_spot_reserve.parking_spot_name = res[2]
            parking_spot_reserve.date =date
            parking_spot_reserve.username = data['username']
            parking_spot_reserve.phoneno = data['phoneno']
            parking_spot_reserve.availability = 'Y'
            con = mysql.connect()
            cur = con.cursor()
            sql = "UPDATE parking_spot_detail SET available='N' where id = %s"
            cur.execute(sql,(spot_id,))
            con.commit()
            cur.close()
            con.close()
            con = mysql.connect()
            cur = con.cursor()
            sql = "INSERT INTO parking_spot_reserve_detail(order_id,order_status,parking_garage_id,parking_spot_name,user_name,phone_no,date) \
            VALUES (%s,'RESERVED',%s,%s,%s,%s,%s)"
          
            cur.execute(sql,(parking_spot_reserve.order_id,parking_spot_reserve.parking_garage_id,parking_spot_reserve.parking_spot_name,parking_spot_reserve.username,parking_spot_reserve.phoneno,parking_spot_reserve.date))       
            con.commit()
            cur.close()
            con.close()
            return jsonpickle.encode(parking_spot_reserve, unpicklable=False), 200
        else :
            return jsonify({"availability": "N"}), 200
    except Exception as e:
        return jsonify(e), 500


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)
