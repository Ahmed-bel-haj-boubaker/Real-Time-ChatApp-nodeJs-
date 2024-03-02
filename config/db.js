const mongoose = require('mongoose');

const dbConnection = ()=>{
mongoose
  .connect(process.env.MONGO_URL)
  .then((conn)=>{
    console.log(`DataBase Connected : ${conn.connection.host}`);
})
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = dbConnection;