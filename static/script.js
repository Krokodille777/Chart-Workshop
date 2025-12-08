// Розробити вебсторінку з інтеграцію функціоналу відповідно до завдання та
// реалізувати функцію встановлення, читання та видалення (скидання) відповідного
// cookie. Користувацький ID для анонімної статистики. expires (2 роки)

let openLogInModal = document.getElementById("login");
let logInModal = document.getElementById("logIn_Modal");
let closeLogInSpan = document.getElementById("close_login");
let openSignUpModal = document.getElementById("signUp_link");
let signUpModal = document.getElementById("signUp_Modal");
let closeSignUpSpan = document.getElementById("close_signUp");

// открывашки и закрывашки модалок

function openLogIn(){
    openLogInModal.style.display = "flex";
    openSignUpModal.style.display = "none";
    openLogInModal.style.flexDirection = "column";
    openLogInModal.style.alignItems = "center";
    openLogInModal.style.justifyContent = "center";
    console.log("Login modal opened");
}

function closeLogIn(){
    logInModal.style.display = "none";
    console.log("Login modal closed");
}

function openSignUp(){
    signUpModal.style.display = "flex";
    logInModal.style.display = "none";
    signUpModal.style.flexDirection = "column";
    signUpModal.style.alignItems = "center";
    signUpModal.style.justifyContent = "center";
    console.log("Sign Up modal opened");
}

function closeSignUp(){
    signUpModal.style.display = "none";
    console.log("Sign Up modal closed");
}

function goToWorkshop(){
    window.location.href = "/workshop";
    console.log("Navigating to workshop page");
}

function getDataFromForm(event){
    event.preventDefault(); // Запобігаємо стандартній поведінці форми
    let formData = new FormData(event.target);
    let data = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    console.log("Form data extracted:", data);
    return data;
}
function logIn(event){
    let data = getDataFromForm(event);
    console.log("Login data:", data);

    let response = fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(result => {
        console.log("Server response:", result);
    })
    .catch(error => {
        console.error("Error during login request:", error);
    });
}

function signUp(event){
    let data = getDataFromForm(event);
    console.log("Sign Up data:", data);
    let response = fetch('/sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(result => {
        console.log("Server response:", result);
    })
    .catch(error => {
        console.error("Error during sign up request:", error);
    });
}

// Додаємо обробники подій
openLogInModal.addEventListener('click', openLogIn);
closeLogInSpan.addEventListener('click', closeLogIn);
openSignUpModal.addEventListener('click', openSignUp);
closeSignUpSpan.addEventListener('click', closeSignUp);

let loginForm = document.getElementById("login_form");
loginForm.addEventListener('submit', logIn);
let signUpForm = document.getElementById("signUp_form");
signUpForm.addEventListener('submit', signUp);
let goToWorkshopBtn = document.getElementById("goToWorkshopBtn");
goToWorkshopBtn.addEventListener('click', goToWorkshop);

function generateAnonymousID() {
    return 'user_' + Math.random().toString(36).slice(2, 9);
}

function setCookie(cname, cvalue, years) {
    const d = new Date();
    // 2 роки * 365 днів * 24 години * 60 хвилин * 60 секунд * 1000 мілісекунд
    d.setTime(d.getTime() + (years * 365 * 24 * 60 * 60 * 1000));
    let expires = "expires="+ d.toUTCString();
    // path=/ означає, що кукі доступні на всьому сайті
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(`Cookie встановлено: ${cname}=${cvalue}`);
}

// 2. Отримати Cookie за назвою
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// 3. Видалити Cookie (встановлюємо дату в минулому)
function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(`Cookie видалено: ${cname}`);
}

// 4. Генерація випадкового ID для анонімної статистики
function generateAnonymousID() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}