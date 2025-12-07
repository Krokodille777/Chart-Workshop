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


