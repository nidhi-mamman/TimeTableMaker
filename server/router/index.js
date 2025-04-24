const { createHOD, SignIn, getSecurityQuestion, verifySecurityAnswer, resetPassword } = require('../controller/index')
const express = require('express')

router = express.Router()

router.post('/post', createHOD)
router.post('/signin', SignIn)
router.post('/verify-hod', getSecurityQuestion)
router.post('/verify-answer', verifySecurityAnswer)
router.post('/reset-password', resetPassword)


module.exports = router