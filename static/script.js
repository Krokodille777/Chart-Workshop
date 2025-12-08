// Розробити вебсторінку з інтеграцію функціоналу відповідно до завдання та
// реалізувати функцію встановлення, читання та видалення (скидання) відповідного
// cookie. Користувацький ID для анонімної статистики. expires (2 роки)

let openLogInModal = document.getElementById("login");
let logInModal = document.getElementById("logIn_Modal");
let closeLogInSpan = document.getElementById("close_login");

openLogInModal.onclick = function() {
    logInModal.style.display = "flex";
    logInModal.style.justifyContent = "center";
    logInModal.style.alignItems = "center";
    logInModal.style.flexDirection = "column";
    logInModal.style.backgroundColor = "rgba(223, 223, 223, 0.75)";
}

closeLogInSpan.onclick = function() {
    logInModal.style.display = "none";
}


let signUpLink = document.getElementById("signUp_link");
let signUpModal = document.getElementById("signUp_Modal");
let closeSignUpSpan = document.getElementById("close_signUp");


signUpLink.onclick = function(){
    logInModal.style.display = "none";
    signUpModal.style.display = "flex";
    signUpModal.style.justifyContent = "center";
    signUpModal.style.alignItems = "center";
    signUpModal.style.flexDirection = "column";
    signUpModal.style.backgroundColor = "rgba(223, 223, 223, 0.75)";
}

closeSignUpSpan.onclick = function() {
    signUpModal.style.display = "none";
}


let userUsername = document.getElementById("username");
let userPassword = document.getElementById("password");
let userTerms = document.getElementById("terms");
let userAcceptCookies = document.getElementById("acceptCookies");

function createAccount( callback = function() {
    let user_object = {
        username: userUsername.value,
        password: userPassword.value,
        termsAccepted: userTerms.checked,
        cookiesAccepted: userAcceptCookies.checked
    };
    return user_object;
}) { 
    if (userUsername.value === "" || userPassword.value === "" || !userTerms.checked || !userAcceptCookies.checked) {
        alert("Please fill in all fields and accept the terms and cookies.");
        return;
    }
    callback();
    if (callback) {
        alert("Account created successfully!");
        signUpModal.style.display = "none";
    }
}

function getDatafromSignUp(){
    let username = document.getElementById("username").value;

    
    let password = document.getElementById("password").value;
  
    let agreeTerms = document.getElementById("terms").checked;

    let acceptCookies = document.getElementById("acceptCookies").checked;

    let info = {
        "username": username,
        "password": password,
        "agreeTerms": agreeTerms,
        "acceptCookies": acceptCookies
    };
    return info;
}

// === НОВА ЧАСТИНА: Функція відправки ===
async function submitRegistration(event) {
    // 1. Зупиняємо стандартне перезавантаження сторінки
    event.preventDefault(); 

    // 2. Отримуємо дані з твоєї функції
    let userData = getDatafromSignUp();

    // 3. Перевірка даних перед відправкою
    if (userData.username === "" || userData.password === "") {
        alert("Username and Password cannot be empty!");
        return;
    }
    if (!userData.agreeTerms) {
        alert("You must agree to the terms!");
        return;
    }
    if (!userData.acceptCookies) {
        alert("You must accept cookies!");
        return;
    }
    // 4. Відправка на сервер через Fetch
    try {
        let response = await fetch('/register', { // Це адреса, яку ми створимо у Flask
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // Перетворюємо об'єкт у текст
        });

        let result = await response.json(); // Чекаємо відповідь від сервера

        if (response.ok) {
            console.log("Success:", result);
            alert("Registration successful! Welcome, " + userData.username);
            closeSignUpSpan.click();
            openLogInModal.click();
    
        } else {
            alert("Registration error: " + result.message);
        }

    } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect to the server.");
    }
}
let signUpForm = document.getElementById("signUp_form");
signUpForm.addEventListener('submit', submitRegistration);



async function logIn(event) {
    event.preventDefault();

    let loginUsername = document.getElementById("login-username").value;
    let loginPassword = document.getElementById("login-password").value;

    try {

        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": loginUsername,
                "password": loginPassword
            })
        });


        let result = await response.json();

   
        if (response.ok) {
            console.log("Login Success:", result);
            alert("Login successful! Welcome back, " + result.username);
            closeLoginSpan.click();
            goToWorkshop();
        } else {

            alert("Login error: " + result.message);
        }

    } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect to the server.");
    }
}

function goToWorkshop() {
    window.location.href = "/workshop"; 
}


let loginForm = document.getElementById("login_form");
loginForm.addEventListener('submit', logIn);
