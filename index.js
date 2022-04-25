const fs = require("fs");
const path = require("path");
const http = require("http");
const port = 5000;

// const home = (req, res) => {
//   if (req.url === "/") {
//     fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
//       if (err) throw err;
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   }
// };

// const about = (req, res) => {
//   if (req.url === "/about") {
//     fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
//       if (err) throw err;
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   }
// };

const getFilePath = (req, res) => {
  return  path.join(
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
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });

  
};

const server = http.createServer(func);

server.listen(port, () => console.log(`Server running on port ${port}`));
