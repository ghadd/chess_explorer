
const button = document.querySelector("#dontclick");

onButtonDoNotClickClicked = () => {
    alert("Please...");
}

function main() {
    button.addEventListener('click', onButtonDoNotClickClicked);
}

main()