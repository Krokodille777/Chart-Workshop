let goBackHomeBtn = document.getElementById("go-back-home");
function goBackHome(){
    window.location.href = "/"; // Перенаправлення на головну сторінку
}
goBackHomeBtn.addEventListener("click", goBackHome);

let type = document.getElementById("chart-select").value;
let chartTitle = document.getElementById("chart-title").value;
let chartdatax = document.getElementById("header-row").innerText.split("\t");
let chartdatay = document.getElementById("footer-row").innerText.split("\t");
let chartcolors = document.getElementById("color-inputs").value;
const chart_params = {
    type,
    chartTitle,
    chartdatax,
    chartdatay,
    chartcolors

}