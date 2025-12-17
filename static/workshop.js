// Глобальна змінна для зберігання екземпляра графіка
let currentChart = null;

let goBackHomeBtn = document.getElementById("go-back-home");
function goBackHome(){
    window.location.href = "/";
}
goBackHomeBtn.addEventListener("click", goBackHome);

let builderBtn = document.getElementById("builder");
let chartModal = document.getElementById("chart-modal");

let closeModalSpan = document.getElementById("close"); 

// --- Логіка Модального вікна ---

closeModalSpan.onclick = function(){
    closeChartModal();
}

// Закриття при кліку поза вікном
window.onclick = function(event) {
    if (event.target == chartModal) {
        closeChartModal();
    }
}

function openChartModal(){
    // 1. Спочатку збираємо АКТУАЛЬНІ дані
    const params = getChartParams();

    // 2. Відкриваємо модалку
    chartModal.style.display = "flex";
    chartModal.style.flexDirection = "column";
    chartModal.style.alignItems = "center";
    chartModal.style.justifyContent = "center";

    // 3. Малюємо графік
    drawChartInModal(params.type, params.chartTitle, params.chartdataName, params.chartdatayValue);
    
    // Встановлюємо заголовок у модалці
    document.getElementById("chart-title-modal").innerText = params.chartTitle;
}

function closeChartModal(){
    chartModal.style.display = "none";
}

// --- Функція збору даних ---
function getChartParams() {
    let type = document.getElementById("chart-select").value;
    let chartTitle = document.getElementById("chart-title").value;

    let nameInputs = document.querySelectorAll("#header-row input");
    let chartdataName = Array.from(nameInputs).map(input => input.value);

    // Знаходимо всі inputs у рядку значень
    let valueInputs = document.querySelectorAll("#footer-row input");
    let chartdatayValue = Array.from(valueInputs).map(input => Number(input.value)); 
    return {
        type,
        chartTitle,
        chartdataName,
        chartdatayValue
    };
}

// --- Логіка відправки на сервер (якщо ще потрібна) ---
let getData = async function(){  
    try{
        const params = getChartParams(); // Беремо актуальні дані

        let response = await fetch('/chart-params', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        let result = await response.json();
        
  
        
        alert(result.message); // Для тесту
    }
    catch(error){
        alert("An error occurred: " + error.message);
    }
};


// --- Функція малювання ---
function drawChartInModal(chartType, chartTitle, chartdataName, chartdatayValue){
    var ctx = document.getElementById('chartCanvas').getContext('2d');

    // Якщо графік вже існує, його треба знищити перед створенням нового
    if (currentChart) {
        currentChart.destroy();
    }

    // Налаштування кольорів (спільне для обох типів)
    const backgroundColors = [
        'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
    ];
    const borderColors = [
        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
    ];

    let config = {
        type: chartType === 'bar chart' ? 'bar' : 'pie', // Узгоджуємо value з select
        data: { 
            labels: chartdataName,
            datasets: [{
                label: chartTitle,
                data: chartdatayValue,
                backgroundColor: chartType === 'pie chart' ? backgroundColors : 'rgba(75, 192, 192, 0.2)',
                borderColor: chartType === 'pie chart' ? borderColors : 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                }
            }
        }
    };

    // Додаємо шкали тільки якщо це не Pie chart
    if (chartType !== 'pie chart') {
        config.options.scales = {
            y: { beginAtZero: true }
        };
    }

    currentChart = new Chart(ctx, config);
}

// Прив'язуємо події

let submitBtn = document.querySelector('input[type="submit"]');
if(submitBtn) submitBtn.addEventListener("click", function(e) {
    e.preventDefault(); // Щоб форма не перезавантажувала сторінку
    getData();
});
function addColumns(){
    let table = document.getElementById("data-table");
    let headerRow = document.getElementById("header-row");
    let footerRow = document.getElementById("footer-row");
    let newHeaderCell = document.createElement("th");
    let newHeaderInput = document.createElement("input");
    newHeaderInput.type = "text";
    newHeaderInput.placeholder = "Label";
    newHeaderCell.appendChild(newHeaderInput);
    headerRow.appendChild(newHeaderCell);
    let newFooterCell = document.createElement("td");
    let newFooterInput = document.createElement("input");
    newFooterInput.type = "text";
    newFooterInput.placeholder = "Value";
    newFooterCell.appendChild(newFooterInput);
    footerRow.appendChild(newFooterCell);
}

function removeColumns(){
    let headerRow = document.getElementById("header-row");
    let footerRow = document.getElementById("footer-row");
    if(headerRow.cells.length > 2){ // Залишаємо мінімум один стовпець
        headerRow.deleteCell(-1);
        footerRow.deleteCell(-1);
    }
}
let addColumnBtn = document.getElementById("add-column-btn");
addColumnBtn.addEventListener("click", addColumns);
let removeColumnBtn = document.getElementById("remove-column-btn");
removeColumnBtn.addEventListener("click", removeColumns);
builderBtn.addEventListener("click", openChartModal);