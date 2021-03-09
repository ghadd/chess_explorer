
const login = document.querySelector("#login");
const password = document.querySelector("#password");

const button = document.querySelector("#dontclick");

onButtonDoNotClickClicked = () => {
    alert("Please...");
}

function main() {
    button.addEventListener('click', onButtonDoNotClickClicked);
}

main()