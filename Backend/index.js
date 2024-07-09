const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => console.log("database connect"));

app.use("/", require("./Routes/crudroutes"));

app.listen(3001, () => {
  console.log(`server is running ${3001}`);
});
