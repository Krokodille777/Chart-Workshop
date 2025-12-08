const mainLoginBtn = document.getElementById("main_login_btn");
const goToSignUpLink = document.getElementById("go_to_signup_link");

// Модальні вікна (обгортки)
const loginModal = document.getElementById("logIn_Modal");
const signUpModal = document.getElementById("signUp_Modal");

// Кнопки закриття (хрестики)
const closeLoginBtn = document.getElementById("close_login");
const closeSignUpBtn = document.getElementById("close_signUp");

// Кнопки відправки форм
const submitLoginBtn = document.getElementById("submit_login");
const submitSignUpBtn = document.getElementById("submit_signup");

// === Функції управління модалками ===

function openModal(modal) {
    modal.style.display = "flex"; // Використовуємо flex, бо так задано в CSS для центрування
}

function closeModal(modal) {
    modal.style.display = "none";
}

// Перехід від Логіну до Реєстрації
function switchToSignUp() {
    closeModal(loginModal);
    openModal(signUpModal);
}

// === Слухачі подій (Event Listeners) ===

// Відкриття
if(mainLoginBtn) mainLoginBtn.addEventListener("click", () => openModal(loginModal));
if(goToSignUpLink) goToSignUpLink.addEventListener("click", switchToSignUp);

// Закриття
if(closeLoginBtn) closeLoginBtn.addEventListener("click", () => closeModal(loginModal));
if(closeSignUpBtn) closeSignUpBtn.addEventListener("click", () => closeModal(signUpModal));

// Закриття при кліку за межами вікна
window.onclick = function(event) {
    if (event.target === loginModal) closeModal(loginModal);
    if (event.target === signUpModal) closeModal(signUpModal);
}

// === РЕЄСТРАЦІЯ ===

async function submitRegistration(event) {
    event.preventDefault();

    // Беремо дані саме з полів РЕЄСТРАЦІЇ (signup_...)
    let usernameInput = document.getElementById("signup_username");
    let passwordInput = document.getElementById("signup_password");
    let termsCheckbox = document.getElementById("terms");
    
    let username = usernameInput.value;
    let password = passwordInput.value;
    let agreeTerms = termsCheckbox.checked;

    if (!agreeTerms) {
        alert("You must agree to the terms!");
        return;
    }
    
    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    let userData = {
        "username": username,
        "password": password
    };

    try {
        let response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        let result = await response.json();

        if (response.ok) {
            alert("Registration successful! Please Log In.");
            closeModal(signUpModal);
            openModal(loginModal); // Одразу відкриваємо логін
        } else {
            alert("Registration error: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server connection failed.");
    }
}

if (submitSignUpBtn) submitSignUpBtn.addEventListener("click", submitRegistration);


// === ЛОГІН ===

async function logIn(event) {
    event.preventDefault();

    // Беремо дані саме з полів ЛОГІНУ (login_...)
    let username = document.getElementById("login_username").value;
    let password = document.getElementById("login_password").value;

    try {
        let response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        let result = await response.json();

        if (response.ok) {
            alert("Login successful! Welcome, " + result.username);
            closeModal(loginModal);
            // Тут можна зробити перенаправлення, наприклад:
            // window.location.href = "/workshop"; 
        } else {
            alert("Login error: " + result.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server connection failed.");
    }
}

if (submitLoginBtn) submitLoginBtn.addEventListener("click", logIn);