import flask
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

users_db = []  # Simple in-memory user "database"
@app.route("/")
def index():
    return render_template("index.html")


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received registration data:", data)

    username = data.get('username')
    password = data.get('password')
    terms = data.get('terms')
    accept_cookies = data.get('acceptCookies')

    for user in users_db:
        if user['username'] == username:
            return jsonify({'status': 'error', 'message': 'Username already exists.'}), 400

    users_db.append({
        'username': username,
        'password': password,
        'terms': terms,
        'acceptCookies': accept_cookies
    })
    return jsonify({'status': 'success', 'message': 'User registered successfully.', 'user': username}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_from_form = data.get('username')
    password_from_form = data.get('password')

    print(f"Спроба входу: {username_from_form}")

    # Шукаємо користувача у нашому списку users_db
    user_found = None
    for user in users_db:
        if user['username'] == username_from_form:
            user_found = user
            break

    # Перевіряємо пароль
    if user_found and user_found['password'] == password_from_form:
        return jsonify({
            "message": "Login successful", 
            "username": user_found['username']
        }), 200
    else:
        print("Невірний логін або пароль")
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)