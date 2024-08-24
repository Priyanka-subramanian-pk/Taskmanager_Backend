const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    // Add other fields as necessary
});

module.exports = mongoose.model('Task', taskSchema);
