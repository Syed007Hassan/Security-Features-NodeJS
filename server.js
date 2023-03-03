const app = require("./app");

const https = require("https");

const PORT = process.env.PORT || 5000;

https.createServer({}, app).listen(PORT, () => {
  console.log("Listening on port " + PORT + "...");
});
