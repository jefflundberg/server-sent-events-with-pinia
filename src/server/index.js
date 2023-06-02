// this is just to demo the concept of SSE, not intended for production usage.

import http from "http"

const HOST = "localhost";
const PORT = 3000;
const CHANGE_DATA_FREQUENCY = 500; // in milliseconds
const UPDATE_CLIENT_FREQUENCY = 1000; // in milliseconds

// A simple dataSource that changes over time
let dataSource = 0;
const updateDataSource = () => {
  dataSource += Math.random();
};

const requestListener = function (req, res) {
  if (req.url === "/counter") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(() => {
      const data = JSON.stringify({ ticker: dataSource });
      res.write(`id: ${new Date().toLocaleTimeString()}\ndata: ${data}\n\n`);
    }, UPDATE_CLIENT_FREQUENCY);
  } else {
    res.statusCode = 404;
    res.end("resource does not exist");
  }
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
  setInterval(() => updateDataSource(), CHANGE_DATA_FREQUENCY);
  console.log(`server running at http://${HOST}:${PORT}`);
});
