const express = require("express");
var cors = require('cors')
const { connectToDB } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(cors())

app.use("/user", userRoute)

app.listen(process.env.PORT, async () => {
  try {
    await connectToDB
    console.log("Connected to mongodb.");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
