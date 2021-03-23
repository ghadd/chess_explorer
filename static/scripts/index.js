const button = document.querySelector("#dontclick");
const dataDiv = document.querySelector("#data");
const mainDiv = document.querySelector("#main")

onButtonDoNotClickClicked = () => {
    mainDiv.innerHTML = "";
    
    const start = performance.now();
    const total = 5;

    var t = setInterval(() => {
        var currTime = performance.now();
        var left = total - (currTime - start) / 1000;
        if (left < 0) {
            clearInterval(t);
            window.location.replace("https://www.youtube.com/watch?v=DLzxrzFCyOs");
        }

        dataDiv.innerHTML = left;
    }, 50);
};

validateForm = () => {
    var desc = document.forms["user-info"]["feedback"];
    if (desc.value.includes("fuck")) {
        alert("Try something more appropriate.");
        return false;
    }
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

getDataset = () => {
    const corrs = {
        q: "Queen",
        k: "King",
        r: "Rook",
        n: "Knight",
        b: "Bishop",
        p: "Pawn",
    };

    var dataRaw = JSON.parse(dataDiv.getAttribute("data-stats"));
    var labels = Object.keys(dataRaw).map((o) => corrs[o]);
    var data = Object.keys(dataRaw).map((o) => dataRaw[o]);
    var colors = data.map(() => getRandomColor());  

    console.log(colors);

    return {
        datasets: [
            {
                data: data,
                backgroundColor: colors
            },
        ],

        labels: labels,
    };
};

plotChart = () => {
    var ctx = document.getElementById("myChart").getContext("2d");

    var myPieChart = new Chart(ctx, {
        type: "pie",
        data: getDataset(),
    });
};

function main() {
    button.addEventListener("click", onButtonDoNotClickClicked);
    plotChart();
}

main();
