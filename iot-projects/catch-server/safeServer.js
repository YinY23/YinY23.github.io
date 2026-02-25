const http = require("http");
const port = 3000;
let serverStatus = undefined;

const server = http.createServer(requestHandling).listen(port);

function requestHandling(req, res) {
  try {
    switch (req.getResponse()) {
      case "GET":
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        break;
      case "PUT":
        let body = "";
        req.on("data", function (chunk) {
          body += chunk.toString();
        });
        req.on("end", function () {
          res.statusCode = 200; // change this to only one line
        });
        break;
    }
  } catch (e) {
    res.statusCode = 500;
    res.write("The server has no data.\n");
  } finally {
    res.write("-and the message arrived");
    res.end();
  }
}
