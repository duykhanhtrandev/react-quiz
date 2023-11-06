const express = require("express");
const app = express();
const questions = require("./data/questions.json");

app.get("/questions", function (req, res) {
  res.json(questions);
});

const port = 8000;

app.listen(port, () =>
  console.log(`Server is listening on port: http://localhost:${port}`)
);
