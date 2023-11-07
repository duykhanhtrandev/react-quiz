const express = require("express");
const app = express();

var fs = require("fs"),
  json;

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

function readJsonFileSync(filepath, encoding) {
  if (typeof encoding == "undefined") {
    encoding = "utf8";
  }
  var file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getConfig(file) {
  var filepath = __dirname + "/" + file;
  return readJsonFileSync(filepath);
}

json = getConfig("./data/questions.json");

app.get("/questions", function (req, res) {
  res.json([json][0].questions);
});

const port = 8000;

app.listen(port, () =>
  console.log(`Server is listening on port: http://localhost:${port}`)
);
