const http = require("http");
const port = 3000;
let serverStatus = undefined;

const server = http.createServer(requestHandling).listen(port);

function requestHandling(req, res) {
  try {
    switch (req.method) {
      case "GET":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(serverStatus.status); //method 1 continued
        break;
      case "PUT":
        let body = "";
        req.on("data", function (chunk) {
          body += chunk;
        });
        req.on("end", function () {
          serverStatus = JSON.parse(body);
          // serverStatus.status = JSON.parse(body);
        });
        res.writeHead(200, { "Content-Type": "text/plain" }); //method 2
        res.write("The server has been updated.");
        break;
      case "DELETE":
        res.writeHead(200, { "Content-Type": "text/plain" });
        let tempStatus = serverStatus.status;
        serverStatus = undefined;
        res.write("Successfully deleted data:" + tempStatus);
        break;
      case "POST":
        let body2 = "";
        req.on("data", function (chunk) {
          body2 += chunk;
        });
        req.on("end", function () {
          serverStatus.messages = [];
          serverStatus.messages.push(body2);
        });

        break;
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write("The server has no data.");
  } finally {
    res.write("-and the message arrived");
    res.end();
  }
}
