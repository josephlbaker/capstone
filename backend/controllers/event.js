const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  index: (req, res) => {
    db.Post.find({})
      .populate("user")
      .exec((err, foundEvents) => {
        console.log("HELLO user");
        if (err) return console.error(err);
        res.json(foundEvents);
      });
  },
  createEvent: (req, res) => {
    let newEvent = new db.Event({
      user: req.body.userId,
      players: req.body.players,
      post: req.body.post
    });
    db.Event.create(newEvent, (err, newEventCreated) => {
      if (err) return console.log(err);
      res.json(newEventCreated);
    });
  },

  deleteEvent: (req, res) => {
    let eventId = req.body._id;
    db.Post.findOneAndDelete({ _id: eventId }, (err, foundEvent) => {
      if (err) return console.log(err);
      console.log(foundEvent);
      res.json(foundEvent);
    });
  },
  updateEvent: (req, res) => {
    let eventId = req.body._id;
    console.log(eventId);
    db.Event.findOneAndUpdate(
      { _id: eventId },
      req.body,
      { new: true },
      (err, updatedEvent) => {
        if (err) return console.log(err);
        console.log(updatedEvent);
        res.json(updatedEvent);
      }
    );
  }
};
