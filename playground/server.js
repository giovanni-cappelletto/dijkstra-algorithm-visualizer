const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hey from the server");
});

app.listen(PORT, () => {
  console.log(`The server is runnning in http://localhost:${PORT}`);
});
