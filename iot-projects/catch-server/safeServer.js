const http = require("http");
const port = 3000;
let serverStatus = undefined;

const server = http.createServer(requestHandling).listen(port);

function requestHandling(req, res) {
  try {
    switch (req.method) {
      case "GET":
        res.writeHead(200, { "Content-Type": "text/plain" });
        if (serverStatus?.status) {
          res.write(serverStatus.status);
        } else {
          res.write("No status yet.");
        }
        if (serverStatus?.messages) {
          for (let message of serverStatus.messages) {
            res.write(message + ", ");
          }
        }
        break;
      case "PUT":
        let body = "";
        req.on("data", function (chunk) {
          body += chunk;
        });
        req.on("end", function () {
          if (!serverStatus) {
            serverStatus = {};
          }
          serverStatus.status = body;
        });
        res.writeHead(200, { "Content-Type": "text/plain" }); //method 2
        res.write("The server has been updated.");
        break;
      case "DELETE":
        res.writeHead(200, { "Content-Type": "text/plain" });
        if (!serverStatus?.status) {
          res.write("There is no status.");
        } else {
          let tempStatus = serverStatus.status;
          serverStatus.status = null;
          res.write("Successfully deleted status:" + tempStatus);
        }
        break;
      case "POST":
        let body2 = "";
        req.on("data", function (chunk) {
          body2 += chunk;
        });
        req.on("end", function () {
          if (!serverStatus) {
            serverStatus = {};
          }
          if (!serverStatus?.messages) {
            serverStatus.messages = [];
          }
          serverStatus.messages.push(body2);
        });
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Successfully added message:" + body2);
        break;
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write("An error has ocurred.");
  } finally {
    res.write("-and the message arrived");
    res.end();
  }
}
