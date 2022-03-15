const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const cityData = require("./convertcsv.json");

const port = process.env.PORT || 4001;
const mainRoute = require("./routes/mainRoute");
const app = express();

const server = http.createServer(app);

const io = socketIo(server);

let interval;

var idx = 0;
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket, idx), 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket, i) => {
  const response = cityData[i].city;

  idx++;
  console.log(idx);

  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
const whitelist = ["https://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(mainRoute);

server.listen(port, () => console.log(`Listening on port ${port}`));
