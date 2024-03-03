const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const userRoutes = require('./routes/userRoutes');


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

dbConnection();

app.use('/api/auth',userRoutes);


const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT} `);
});
