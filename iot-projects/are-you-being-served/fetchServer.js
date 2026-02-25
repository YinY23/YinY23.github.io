// fetchServer.js file
var args = process.argv.slice(2);
var url = args[0] ? args[0] : "https://yiny23.github.io/portfolio.html";
var head =
  args[1] === "text"
    ? { "Content-Type": "text/plain" }
    : { "Content-Type": "text/html" };
const http = require("http");
const port = 8686;

http
  .createServer(async function (req, res) {
    res.writeHead(200, head);
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
