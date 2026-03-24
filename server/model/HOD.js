const mongoose=require('mongoose')

const hodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
    },

    yearsOfExperience: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("HOD", hodSchema);
