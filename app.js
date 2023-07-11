const express = require("express");
const app = express();
const PORT = process.env.port || 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys.js");
const cors = require("cors");
require("./models/model");
require("./models/post");

const path = require("path")
app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("Successfully Connected to database");
});

mongoose.connection.on("error", () => {
  console.log("not connected to database");
});

// serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*" , (req, res) => {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function(err){
      res.status(500).send(err);
    }
  )
})
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
