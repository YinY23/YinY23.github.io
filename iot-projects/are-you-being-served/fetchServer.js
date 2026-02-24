// fetchServer.js file
var args = process.argv.slice(2);
var url = args[0] ? args[0] : "https://yiny23.github.io/portfolio.html";
const http = require("http");
const port = 8686;

http
  .createServer(async function (req, res) {
    if (args[1].toLowerCase() == "html") {
      res.writeHead(200, { "Content-Type": "text/html" });
    }
    if (args[1].toLowerCase() == "text") {
      res.writeHead(200, { "Content-Type": "text/plain" });
    }
    let fetchResponse = await fetch(url);
    if (fetchResponse.ok) {
      let html = await fetchResponse.text();
      res.write(html);
    } else {
      res.write(fetchResponse.statusText + " " + fetchResponse.status);
    }
    res.end();
  })
  .listen(port);
