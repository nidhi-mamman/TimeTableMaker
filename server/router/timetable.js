const express = require("express")
const { addClass, getAllClasses } = require('../controller/timetable')

const router = express.Router()

router.post('/addclass', addClass)
router.get('/getAllClass', getAllClasses)

module.exports = router