const fs = require("fs");
const path = require("path");
const http = require("http");
const port = 5000;

const home = (req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
};

const about = (req, res) => {
  if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
};

const func = (req, res) => {
  home(req, res);
  about(req, res);
};

const server = http.createServer(func);

server.listen(port, () => console.log(`Server running on port ${port}`));
