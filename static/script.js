// Секція "Регістрація та Логін"

let signUpbtn = document.getElementById("signUp_link");
let loginbtn = document.getElementById("login");
let signUpForm = document.getElementById("signUp_body");
let loginForm = document.getElementById("login_body");
let closeSignUp = document.getElementById("close_signUp");
let closeLogin = document.getElementById("close_login");
let submitBtn = document.getElementById("signUp_form");
let loginSubmitBtn = document.getElementById("login_form");
let donthaveaccountlink = document.getElementById("havenotregistered");
let signedUp = false;

function openSignUpForm() {
    signUpForm.style.display = "flex";
    signUpForm.style.flexDirection = "column";
    signUpForm.style.alignItems = "center";
    signUpForm.style.justifyContent = "center";
}

function openLoginForm() {
    loginForm.style.display = "flex";
    loginForm.style.flexDirection = "column";
    loginForm.style.alignItems = "center";
    loginForm.style.justifyContent = "center";
}


function closeForm(form) {
    form.style.display = "none";
}

function getDatafromSignUp(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let agreeTerms = document.getElementById("terms").checked;

    let info = {
        "username": username,

        "password": password,

        "agreeTerms": agreeTerms
    };
    return info;
}

// === НОВА ЧАСТИНА: Функція відправки ===
async function submitRegistration(event) {
    // 1. Зупиняємо стандартне перезавантаження сторінки
    event.preventDefault(); 

    // 2. Отримуємо дані з твоєї функції
    let userData = getDatafromSignUp();

    
    if (!userData.agreeTerms) {
        alert("You must agree to the terms!");
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
            closeForm(signUpForm); 
        } else {
            alert("Registration error: " + result.message);
        }

    } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect to the server.");
    }
}

function calculateAge(birthdate) {
    let birth = new Date(birthdate);
    let today = new Date();
    let age = today.getFullYear() - birth.getFullYear();

    return age;
}
if (signUpForm) {
    submitBtn.addEventListener("click", submitRegistration);
}


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
            closeForm(loginForm); 
        } else {

            alert("Login error: " + result.message);
        }

    } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect to the server.");
    }
}

function  donthaveaccount() {
    closeForm(loginForm);
    openSignUpForm();
}
let loginFormElement = document.getElementById("login-form"); // Перевір, чи ID форми співпадає в HTML


// Секція "Старт"

function goToLoginFromStart() {
    closeForm(start);
    openLoginForm();
}

function PressStart() {
    window.location.href = "/webEx";
}

let goToLoginBtn = document.getElementById("go-to-login");
let pressStartBtn = document.getElementById("press-start");
pressStartBtn.addEventListener("click", PressStart);
goToLoginBtn.addEventListener("click", goToLoginFromStart);
loginSubmitBtn.addEventListener("click", logIn);
donthaveaccountlink.addEventListener("click", donthaveaccount);
signUpbtn.addEventListener("click", openSignUpForm);
loginbtn.addEventListener("click", openLoginForm);
getStartedbtn.addEventListener("click", openGetStarted);
closeSignUp.addEventListener("click", () => closeForm(signUpForm));
closeLogin.addEventListener("click", () => closeForm(loginForm));
closeStart.addEventListener("click", () => closeForm(start));