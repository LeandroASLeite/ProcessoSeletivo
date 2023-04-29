const Calendar = require('../models/CalendarModel');

exports.create = function (req, res, next) {
  Calendar.create(req.body).then(function (calendar) {
    res.send(calendar);
  }).catch(next);
};

exports.delete = function (req, res, next) {

  Calendar.findByIdAndRemove({ _id: req.params.id }).then(function (calendar) {
    res.send(calendar);
  }).catch(next);
};

exports.read = function (req, res) {
  Calendar.find({}).then(function (calendar) {
    res.send(calendar);
  });
};
exports.readTime = function (req, res) {
  Calendar.find({
    startDate: {
      $gte: new Date(req.body.startDate)   
    },finishDate: {
      $lte: new Date(req.body.finishDate)    }
  }).then(function (calendar) {
    res.send(calendar);
  });

};

exports.update = function (req, res, next) {
  Calendar.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (calendar) {
    res.send(calendar);
  }).catch(next);
};
