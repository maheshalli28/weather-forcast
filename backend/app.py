from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("WEATHER_API_KEY")

@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
        print("Weather API called for city:", city)
    else:
        return jsonify({"error": "City not found"}), 404

@app.route("/forecast", methods=["GET"])
def get_forecast():
    city = request.args.get("city")
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)