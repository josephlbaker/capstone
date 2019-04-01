const express = require("express");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use("/users", userRoutes);

app.listen(process.env.PORT || 3001, () =>
  console.log("Server is now running")
);
