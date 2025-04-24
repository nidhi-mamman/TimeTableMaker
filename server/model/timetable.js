const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    teacher: String,
    room: String,
    subject: String,
    day: String,
    startTime: String,
    endTime: String,
});

module.exports = mongoose.model('Timetable', timetableSchema);
