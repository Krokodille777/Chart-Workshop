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

function openLogIn(){}

function closeLogIn(){}

function openSignUp(){}

function closeSignUp(){}

function goToWorkshop(){}

function logIn(event){
}
function signUp(event){
}

let loginForm = document.getElementById("login_form");
loginForm.addEventListener('submit', logIn);
let signUpForm = document.getElementById("signUp_form");
signUpForm.addEventListener('submit', signUp);
let goToWorkshopBtn = document.getElementById("goToWorkshopBtn");
goToWorkshopBtn.addEventListener('click', goToWorkshop);



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