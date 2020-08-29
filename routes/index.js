/* jshint esversion:6*/
var express = require('express');
const mongoose = require('mongoose');
const NewTasks = require('../models/NewTask');
const bodyParser = require('body-parser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  NewTasks.find({})
        .then((todos) => {
            res.render("../views/index.ejs",{todos:todos});
        }).catch((err) => {
            next(err);
        });
});

module.exports = router;
