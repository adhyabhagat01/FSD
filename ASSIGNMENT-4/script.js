Chart.defaults.font.size = 16;          // increase overall text
Chart.defaults.font.weight = "bold";   // make it readable
Chart.defaults.color = "#000";


// Manual dataset (offline)
const data = {
  pune: {
    week1: {
      temp: [30, 32, 31, 29, 28, 33, 35],
      humidity: [60, 65, 70, 55, 50, 68, 72],
      condition: [2, 2, 1, 1, 1]
    },
    week2: {
      temp: [31, 33, 34, 30, 29, 35, 36],
      humidity: [62, 67, 72, 58, 52, 70, 75],
      condition: [3, 1, 2, 1, 0]
    }
  },

  mumbai: {
    week1: {
      temp: [28, 29, 30, 31, 32, 33, 34],
      humidity: [75, 80, 82, 78, 76, 85, 88],
      condition: [1, 3, 2, 1, 0]
    },
    week2: {
      temp: [29, 30, 31, 32, 33, 34, 35],
      humidity: [78, 82, 85, 80, 79, 88, 90],
      condition: [2, 2, 2, 1, 0]
    }
  },

  delhi: {
    week1: {
      temp: [35, 36, 37, 38, 39, 40, 41],
      humidity: [40, 42, 45, 38, 35, 30, 28],
      condition: [4, 1, 0, 1, 1]
    },
    week2: {
      temp: [36, 37, 38, 39, 40, 41, 42],
      humidity: [42, 45, 48, 40, 38, 32, 30],
      condition: [3, 1, 1, 1, 1]
    }
  }
};

let charts = [];

function createCharts(city, week) {

  charts.forEach(c => c.destroy());
  charts = [];

  const d = data[city][week];

  document.getElementById("temp").innerText = d.temp[6] + " °C";
  document.getElementById("humidity").innerText = d.humidity[6] + " %";
  document.getElementById("wind").innerText = (10 + Math.random()*5).toFixed(0) + " km/h";

  // Temperature line chart
  charts.push(new Chart(document.getElementById("tempChart"), {
    type: "line",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Temperature (°C)",
        data: d.temp,
        borderColor: "red",
        fill: false
      }]
    }
  }));

  // Humidity bar chart
  charts.push(new Chart(document.getElementById("humidityChart"), {
    type: "bar",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Humidity (%)",
        data: d.humidity,
        backgroundColor: "blue"
      }]
    }
  }));

  // Pie chart
  charts.push(new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Sunny","Cloudy","Rainy","Windy","Storm"],
      datasets: [{
        data: d.condition,
        backgroundColor: ["yellow","gray","blue","green","purple"]
      }]
    }
  }));

  // Histogram (simulated)
  charts.push(new Chart(document.getElementById("histChart"), {
    type: "bar",
    data: {
      labels: d.temp,
      datasets: [{
        label: "Temperature Distribution",
        data: d.temp,
        backgroundColor: "orange"
      }]
    }
  }));
}

// Initial load
createCharts("pune", "week1");

// Dropdown events
document.getElementById("citySelect").addEventListener("change", update);
document.getElementById("dateSelect").addEventListener("change", update);

function update() {
  const city = document.getElementById("citySelect").value;
  const week = document.getElementById("dateSelect").value;
  createCharts(city, week);
}