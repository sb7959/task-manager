const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const task = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
require("dotenv").config();

const port = 3000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", task);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
