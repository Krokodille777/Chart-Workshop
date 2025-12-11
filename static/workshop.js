let goBackHomeBtn = document.getElementById("go-back-home");
function goBackHome(){
    window.location.href = "/"; // Перенаправлення на головну сторінку
}
goBackHomeBtn.addEventListener("click", goBackHome);

let type = document.getElementById("chart-select").value;
let chartTitle = document.getElementById("chart-title").value;
let chartdataName = document.getElementById("header-row").innerText.split("\t");
let chartdatayValue = document.getElementById("footer-row").innerText.split("\t");
const chart_params = {
    type,
    chartTitle,
    chartdataName,
    chartdatayValue
}
let builderBtn = document.getElementById("builder");
let builderFunction = async function(){  
    try{
    let response = await fetch('/chart-params', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chart_params)
    });
    let result = await response.json();
    if(result.status === 'ok'){
        window.location.href = "/chart-builder"; // Перенаправлення на сторінку побудови графіка
    }
    else{
        alert("Error: " + result.message);
    }
}
catch(error){
    alert("An error occurred: " + error.message);
}
};


function createChartModal(){
    let modal = document.getElementById("chart-modal");
    modal.style.display = "block";
}


builderBtn.addEventListener("click", builderFunction);
