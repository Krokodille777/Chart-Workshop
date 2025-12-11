from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

users_db = [] 

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Missing username or password"}), 400

    for user in users_db:
        if user['username'] == username:
            return jsonify({"message": "User already exists"}), 409

    # --- ИСПРАВЛЕНИЕ: Генерируем ID здесь и сохраняем его ---
    user_id = "user_" + str(random.randint(1000, 9999))
    
    new_user = {
        "username": username,
        "password": password,
        "userId": user_id  # Сохраняем ID в базу
    }
    users_db.append(new_user)
    
    print(f"New user registered: {new_user}")
    
    # Возвращаем userId на фронтенд
    return jsonify({
        "message": "User created", 
        "username": username,
        "userId": user_id 
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_form = data.get('username')
    password_form = data.get('password')

    user_found = None
    for user in users_db:
        if user['username'] == username_form:
            user_found = user
            break

    if user_found and user_found['password'] == password_form:
        # Возвращаем userId при логине тоже
        return jsonify({
            "message": "Success", 
            "username": user_found['username'],
            "userId": user_found['userId'] 
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users_db), 200

@app.route('/chart-params', methods=['POST'])
def chart_params():
    data = request.get_json()
    type = data.get('type')
    chartdataName = data.get('chartdataName')
    chartdatayValue = data.get('chartdatayValue')


    if not type or not chartdataName or not chartdatayValue:
        return jsonify({"message": "Missing chart parameters"}), 400
    print(f"Received chart parameters: {data}")
    return jsonify({"message": "Chart parameters received"}), 200


@app.route('/workshop', methods=['GET'])
def get_workshops():
    return render_template("workshop.html")



if __name__ == "__main__":
    app.run(port=5000, debug=True)