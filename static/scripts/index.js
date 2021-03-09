
const login = document.querySelector("#login");
const password = document.querySelector("#password");

const button = document.querySelector("#dontclick");

onButtonDoNotClickClicked = () => {
    alert("Please...");
}

function main() {
    login.setCustomValidity("Login should contain only alphanumeric characters, \"_\" and \".\"");
    password.setCustomValidity("Password should be at least 8 characters, contain 1 number and 1 uppercase letter");

    button.addEventListener('click', onButtonDoNotClickClicked);
}

main()