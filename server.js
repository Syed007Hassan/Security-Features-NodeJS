const app = require("./app");
const https = require("https");
const fs = require("fs");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

https
  .createServer(
    {
      key: fs.readFileSync("key.cert"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(PORT, () => {
    console.log("Listening on port " + PORT + "...");
  });
