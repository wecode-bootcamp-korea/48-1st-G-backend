require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { AppDataSource } = require("./src/models/data-source");
const { routes } = require("./src/routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use(routes);

app.get("/ping", (req, res) => {
  res.status(200).json({"message": "pong"})
});

const startServer = async () => {
  const PORT = process.env.PORT;

  await AppDataSource.initialize();

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
