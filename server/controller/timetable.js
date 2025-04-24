const Timetable = require('../model/timetable');

const addClass = async (req, res) => {
    try {
        const { teacher, room, subject, day, startTime, endTime } = req.body;

        // Check for teacher clash
        const teacherClash = await Timetable.findOne({
            teacher,
            day,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        if (teacherClash) {
            return res.status(400).json({ msg: 'Teacher has a class during this time.' });
        }

        // Check for room clash
        const roomClash = await Timetable.findOne({
            room,
            day,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        if (roomClash) {
            return res.status(400).json({ msg: 'Room is already booked during this time.' });
        }

        const newClass = new Timetable({ teacher, room, subject, day, startTime, endTime });
        await newClass.save();

        res.status(201).json({ success: true, msg: 'Class added successfully!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllClasses = async (req, res) => {
    try {
        const allClasses = await Timetable.find().sort({ day: 1, startTime: 1 });
        res.status(200).json(allClasses);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch classes' });
    }
};


module.exports = { addClass, getAllClasses };
