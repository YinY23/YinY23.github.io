const http = require("http");
const port = process.argv[2];

http
  .createServer(function (req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello ");
    res.end("World!</h1>");
  })
  .listen(port);
