from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
data_file = 'data.json'

# Load existing data
if os.path.exists(data_file):
    with open(data_file, 'r') as f:
        data = json.load(f)
else:
    data = {"transactions": [], "people": [], "goals": [], "tasks": []}

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def save_data():
    new_data = request.json
    data.update(new_data)
    with open(data_file, 'w') as f:
        json.dump(data, f, indent=4)
    return jsonify({"status": "success", "message": "Data saved!"})

if __name__ == '__main__':
    app.run(debug=True)
