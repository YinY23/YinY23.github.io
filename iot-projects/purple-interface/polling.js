///////////////////////////////////////////////////////////
////////////////// JAVASCRIPT BEGINS HERE /////////////////
///////////////////////////////////////////////////////////
$(document).ready(function () {
  // Chart initialization code
  var maxDataPoints = 10;

  // Setup to use charts
  google.charts.load("current", { packages: ["corechart"] });
  google.setOnLoadCallback(drawVisualization);
  function drawVisualization() {
    /////////////////////////////////////////////////
    // CHART PREP SECTION: DO NOT TOUCH /////////////
    /////////////////////////////////////////////////
    var jsonSimChart = new google.visualization.LineChart(
      $("#json-sim-chart")[0],
    );
    var wsSimChart = new google.visualization.LineChart($("#ws-sim-chart")[0]);
    var ajaxTempChart = new google.visualization.LineChart(
      $("#ajax-temp-chart")[0],
    );
    var ajaxAirChart = new google.visualization.LineChart(
      $("#ajax-air-chart")[0],
    );
    var jsonSimData = google.visualization.arrayToDataTable([
      ["Time", "JSON Simulation Polling Temperature"],
      [getTime(), 0],
    ]);
    var wsSimData = google.visualization.arrayToDataTable([
      ["Time", "WebSocket Simulation Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxTempData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Purple Air Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxAirData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Purple Air Polling Quality"],
      [getTime(), 0],
    ]);

    var options = {
      title: "Temperature",
      curveType: "function",
      animation: {
        duration: 1000,
        easing: "in",
      },
      legend: { position: "bottom" },
    };
    /////////////////////////////////////////////////
    // END CHART PREP SECTION: //////////////////////
    /////////////////////////////////////////////////

    // Code to add a data point
    function addDataPoint(dataPoint, dataSet, chart) {
      if (dataSet.getNumberOfRows() > maxDataPoints) {
        dataSet.removeRow(0);
      }
      dataSet.addRow([getTime(), dataPoint.key]);
      chart.draw(dataSet, options);
    }

    // TODO 3: Initialize high and low records
    const jsonSim = {
      highest: 0,
      lowest: 100,
      highID: "#json-sim-highest",
      lowID: "#json-sim-lowest",
    };
    const wsSim = {
      highest: 0,
      lowest: 100,
      highID: "#ws-sim-highest",
      lowID: "#ws-sim-lowest",
    };
    const ajaxTemp = {
      highest: 0,
      lowest: 100,
      highID: "#ajax-temp-highest",
      lowID: "#ajax-temp-lowest",
    };
    const ajaxAir = {
      highest: 0,
      lowest: 100,
      highID: "#ajax-air-highest",
      lowID: "#ajax-air-lowest",
    };

    $("#json-sim-chart-container").append(
      `<p id=${jsonSim.highID.slice(
        1,
      )}>Highest recorded JSON Simulation value is ${jsonSim.highest}</p>`,
    );
    $("#json-sim-chart-container").append(
      `<p id=${jsonSim.lowID.slice(
        1,
      )}>Lowest recorded JSON Simulation value is ${jsonSim.lowest}</p>`,
    );
    $("#ws-sim-chart-container").append(
      `<p id=${wsSim.highID.slice(1)}>Highest recorded WS Simulation value is ${
        wsSim.highest
      }</p>`,
    );
    $("#ws-sim-chart-container").append(
      `<p id=${wsSim.lowID.slice(1)}>Lowest recorded WS Simulation value is ${
        wsSim.lowest
      }</p>`,
    );
    $("ajax-temp-chart-container").append(
      `<p id=${ajaxTemp.highID.slice(
        1,
      )}>Highest recorded Ajax Temperature value is ${ajaxTemp.highest}</p>`,
    );
    $("ajax-temp-chart-container").append(
      `<p id=${ajaxTemp.lowID.slice(
        1,
      )}>Lowest recorded Ajax Temperature value is ${ajaxTemp.lowest}</p>`,
    );
    $("ajax-air-chart-container").append(
      `<p id=${ajaxAir.highID.slice(1)}>Highest recorded Ajax Air value is ${
        ajaxAir.highest
      }</p>`,
    );
    $("ajax-air-chart-container").append(
      `<p id=${ajaxAir.lowID.slice(1)}>Lowest recorded Ajax Air value is ${
        ajaxAir.lowest
      }</p>`,
    );
    // TODO 4: Update high and low records
    function updateRecords(value, simType) {
      if (value < simType.lowest) {
        simType.lowest = value;
        $(simType.lowID).text(`Lowest recorded value is ${simType.lowest}`);
      }
      if (value > simType.highest) {
        simType.highest = value;
        $(simType.highID).text(`Highest recorded Value is ${simType.highest}`);
      }
    }

    // TODO 5: Simulation JSON Polling
    function doJSONPoll() {
      $.getJSON("http://localhost:8080/", function (data) {
        updateRecords(data.key.toFixed(2), jsonSim);
        addDataPoint(data, jsonSimData, jsonSimChart);
      });
    }

    setInterval(doJSONPoll, 5000);
    // TODO 7: WebSocket Polling
    var socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = function (event) {
      var result = JSON.parse(event.data);
      updateRecords(result.key.toFixed(2), wsSim);
      addDataPoint(result, wsSimData, wsSimChart);
    };
    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    // TODO 8: Purple Air JSON Polling
    

    // TODO 9: AJAX Polling
    function doPurpleAirAJAXPollTemp() {
      $.ajax("https://api.purpleair.com/v1/sensors/300625?fields=temperature", "GET");
      
    }

    // Do not work below this line
    function getTime() {
      var d = new Date();
      return d.toLocaleTimeString();
    }
  }
});
