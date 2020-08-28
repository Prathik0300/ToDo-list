/*jshint esversion:6*/
const express = require('express');
const mongoose = require('mongoose');
const NewTasks = require('../models/NewTask');
const bodyParser = require('body-parser');

const newtaskRouter = express.Router();
newtaskRouter.use(bodyParser.json());

newtaskRouter.get('/', (req,res,next) => {
    NewTasks.all((err,todos) => res.format({
        json : () =>{
            res.status(200).json(todos);
        },
        html: ()=> {
            res.render("index.ejs", {todos:todos});
        }
    }));
});


newtaskRouter.post('/newTask',(req,res,next) => {
        var task = req.body.task;
        var date = req.body.date;
        var time = req.body.time;
        NewTasks.findOne({
            task:task,
            date:date,
            time:time
        }).then((result) => {
            if(result != null){
                var msg = `The task ${task} already exists at ${date} on ${time}`;
                var err = new Error('The Task already exists!');
                err.status = 403;
                return(
                    {status: err.status,Error:msg}
                );
            }
            else{
                return NewTasks.create({
                    task:task,
                    date:date,
                    time:time
                });
            }
        }).then((task) => {
            res.redirect('/');
        },(err) => next(err)).catch((err) => {
            next(err);
        });
    });


    
module.exports = newtaskRouter;