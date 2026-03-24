const mongoose=require('mongoose')

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,  //Building relation to the User model
      ref: "User",
      required: true,
      unique: true,
    },

    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Admin", adminSchema);
