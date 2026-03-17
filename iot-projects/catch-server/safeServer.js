const http = require("http");
const port = 3000;
let serverStatus = undefined;

const server = http.createServer(requestHandling).listen(port);

function requestHandling(req, res) {
  try {
    switch (req.url) {
      case "/":
        defaultHandler(req, res);
        break;
      case "/status":
        statusHandler(req, res);
        break;
      case "/message":
        messageHandler(req, res);
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("Wrong url");
        break;
    }
  } catch (e) {
    console.log(e);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.write("Some error ocurred");
  } finally {
    res.end();
  }
}

function statusHandler(req, res) {
  try {
    res.writeHead(200, { "Content-Type": "text/plain" });
    switch (req.method) {
      case "GET":
        if (!serverStatus?.status) {
          res.write("No status.");
        } else {
          res.write("Status:" + serverStatus.status);
        }
        break;
      case "PUT":
        let putData;
        req.on("data", function (chunk) {
          // what if no chunk
          putData = chunk;
        });
        req.on("end", function () {
          if (!serverStatus) {
            serverStatus = {};
          }
          serverStatus.status = putData;
        });
        res.write("Successfully put status.");
        break;
      case "DELETE":
        if (!serverStatus?.status) {
          res.write("No status to delete.");
        } else {
          serverStatus.status = undefined;
          res.write("Status deleted.");
        }
        break;
      case "POST":
        let postData;
        req.on("data", function (chunk) {
          postData = chunk;
        });
        req.on("end", function () {
          if (!serverStatus) {
            serverStatus = {};
          }
          if (!serverStatus?.status) {
            serverStatus.status = postData;
          } else {
            serverStatus.status += ", " + postData;
          }
        });
        res.write("Successfully posted status.");
        break;
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write("An error has ocurred.");
  } finally {
    res.end();
  }
}

function messageHandler(req, res) {
  try {
    res.writeHead(200, { "Content-Type": "text/plain" });
    switch (req.method) {
      case "GET":
        if (!serverStatus?.messages) {
          res.write("No messages.");
        } else {
          res.write("Messages:" + serverStatus.messages);
        }
        break;
      case "PUT":
        let putData;
        req.on("data", function (chunk) {
          putData = chunk;
        });
        req.on("end", function () {
          if (!serverStatus) {
            serverStatus = {};
          }
          serverStatus.messages = putData;
        });
        res.write("Successfully put message.");
        break;
      case "DELETE":
        if (!serverStatus?.messages) {
          res.write("No messages to delete.");
        } else {
          serverStatus.messages = undefined;
          res.write("Server messages deleted successfully.");
        }
        break;
      case "POST":
        let postData;
        req.on("data", function (chunk) {
          postData = chunk;
        });
        req.on("end", function () {
          if (!serverStatus) {
            serverStatus = {};
          }
          if (!serverStatus?.messages) {
            serverStatus.messages = postData;
          } else {
            serverStatus.messages += ", " + postData;
          }
        });
        res.write("Successfully posted message.");
        break;
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.write("An error has ocurred.");
  } finally {
    res.end();
  }
}

function defaultHandler(req, res) {
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
