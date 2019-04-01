const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.event.index);
router.get("/createevent", controllers.event.createEvent);

router.use((req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerHeader = bearer[1];
    req.token = bearerToken;
    let verified = jwt.verify(req.token, "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=");
    console.log("Verified ", verified);
    req.userId = verified._id;
    next();
  } else {
    res.sendStatus(403);
  }
});

router.delete("/deleteevent", controllers.event.deleteEvent);
router.put("/updateevent", controllers.event.updateEvent);

module.exports = router;
