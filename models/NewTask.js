/*jshint esversion:6*/
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const NewTaskSchema = new schema({
    task: {
        type:String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status: {
        type: Boolean,
        required: false,
        default: 0
    }
},{
    timestamps:true
});

const NewTasks = mongoose.model('newTask',NewTaskSchema);
module.exports = NewTasks;