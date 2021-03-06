const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const jwt = require('jsonwebtoken');
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const eventRoutes = require("./routes/event");
const commentRoutes = require("./routes/comment");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('test');
// })

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/events", eventRoutes);
app.use("/comments", commentRoutes);


app.listen(process.env.PORT || 3001, () =>
  console.log("Server is now running")
);
