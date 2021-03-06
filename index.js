const fs = require("fs");
const path = require("path");
const http = require("http");
const port = 5000;
const { isDevelopMode, logger } = require("nodejs-clg");

isDevelopMode(true);


const getFilePath = (req, res) => {
  return path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
};
const getExtname = (filePath) => {
  return path.extname(filePath);
};
const getContentType = (extname) => {
  let contentType;
  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".svg":
      contentType = "image/jpg";
      break;
    case ".ico":
      contentType = "image/ico";
      break;
    case "":
      contentType = "text/html";
      break;
    case ".html":
      contentType = "text/html";
      break;
    case ".htm":
      contentType = "text/html";
      break;
  }

  return contentType;
};

const func = (req, res) => {
  let filePath = getFilePath(req, res);
  const extname = getExtname(filePath);
  const contentType = getContentType(extname);


  if (contentType === "text/html" && extname === "") {
    filePath += ".html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
        logger(err);
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data);
        });
      } else {
        res.writeHead(500);
        res.end(`Server error : ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

const server = http.createServer(func);

server.listen(port, () => console.log(`Server running on port ${port}`));
