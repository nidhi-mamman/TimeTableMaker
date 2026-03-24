const mongoose=require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Student", studentSchema);
