const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected ! ");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server Started on port${PORT} `);
});
