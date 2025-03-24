from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient

app = Flask(__name__)

# ✅ Connect to Local MongoDB Compass
MONGODB_URI = "mongodb+srv://1rohanlearn:<db_password>@clusterset1.welod.mongodb.net/"
client = MongoClient(MONGODB_URI)
db = client["ElectricityBillManagement"]  # Ensure this matches your Compass database name

# ✅ Define Collections
customers_collection = db["Customers"]
meters_collection = db["Meter"]
consumption_collection = db["Consumption"]
bills_collection = db["Bills"]

# ✅ Serve Homepage
@app.route('/')
def index():
    return render_template('index.html')

# ✅ API to Add a New Customer
@app.route('/add_customer', methods=['POST'])
def add_customer():
    try:
        data = request.json
        print("Received data:", data)
        result = customers_collection.insert_one(data)
        return jsonify({"message": "Customer added successfully!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while adding the customer."}), 400

# ✅ API to Add Meter Details
@app.route('/add_meter', methods=['POST'])
def add_meter():
    try:
        data = request.json
        print("Received data:", data)
        result = meters_collection.insert_one(data)
        return jsonify({"message": "Meter added successfully!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while adding the meter."}), 400

# ✅ API to Record Consumption
@app.route('/record_consumption', methods=['POST'])
def record_consumption():
    try:
        data = request.json
        print("Received data:", data)
        result = consumption_collection.insert_one(data)
        return jsonify({"message": "Consumption recorded successfully!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while recording consumption."}), 400

# ✅ API to Fetch Bills
@app.route('/bills', methods=['GET'])
def get_bills():
    try:
        bills = list(bills_collection.find({}))
        for bill in bills:
            bill["_id"] = str(bill["_id"])  # Convert ObjectId to string
        return jsonify(bills)
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while fetching bills."}), 400

if __name__ == '__main__':
    app.run(debug=True)
    