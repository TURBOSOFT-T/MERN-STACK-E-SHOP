const mongoose = require("mongoose");

const connectDatabase = () => {
  DB_URL =
    "mongodb+srv://tuemothomas:admin123@cluster0.b0gmihk.mongodb.net/?retryWrites=true&w=majority";

  mongoose

    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
