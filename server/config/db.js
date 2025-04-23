const mongoose = require("mongoose")
const createDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = createDB