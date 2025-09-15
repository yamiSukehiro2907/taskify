const mongoose = require('mongoose');
const User = require('./user.model.js');

const TaskSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});


module.exports = mongoose.model("task", TaskSchema);