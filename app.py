from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# --- ТИМЧАСОВА БАЗА ДАНИХ ---
users_db = [] 

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')

    # Валідація
    if not username or not password:
        return jsonify({"message": "Missing username or password"}), 400

    # Перевірка на існування
    for user in users_db:
        if user['username'] == username:
            return jsonify({"message": "User already exists"}), 409 # 409 Conflict

    # Створення
    new_user = {
        "username": username,
        "password": password
    }
    users_db.append(new_user)
    
    print(f"New user registered: {new_user}")
    return jsonify({"message": "User created", "username": username}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_form = data.get('username')
    password_form = data.get('password')

    print(f"Login attempt: {username_form}")

    user_found = None
    for user in users_db:
        if user['username'] == username_form:
            user_found = user
            break

    if user_found and user_found['password'] == password_form:
        return jsonify({"message": "Success", "username": user_found['username']}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users_db), 200
@app.route('/workshop', methods=['GET'])
def workshop():
    return render_template("workshop.html")

if __name__ == "__main__":
    app.run(port=5000, debug=True)