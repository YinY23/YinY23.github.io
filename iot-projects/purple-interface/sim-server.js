// A server that simulates a device that is taking regular temperature readings.

// Load the http module to create an http server.
const http = require("http");
const WebSocket = require("ws");
const port = 8080;

//TODO 1: Variables and generateTemperature function
var temperature = 72;
nextChange = 0;

function generateTemperature() {
  let changeDifference = Math.random() - 0.5;
  nextChange += changeDifference;
  temperature += nextChange;
  if (temperature < 0) {
    temperature = 0;
  }
  if (temperature > 100) {
    temperature = 100;
  }
  nextChange = 0;
}

setInterval(generateTemperature, 1000);

// Configure our HTTP server.
const server = http.createServer(function (req, res) {
  /* DO NOT EDIT THIS CODE */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  /* DO NOT EDIT THIS CODE */

  //TODO 2: Regular Polling Server
  let temperatureJSON;
  try {
    res.writeHead(200, { "content-type": "application/json" });
    switch (req.method) {
      case "GET":
        temperatureJSON = { key: temperature };
        break;
    }
  } catch (e) {
  } finally {
    res.end(JSON.stringify(temperatureJSON));
  }
});

//TODO 7: WebSocket Server

/* DO NOT EDIT THIS CODE */
server.listen(port);
