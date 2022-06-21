import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(

  {

    message: {
      text: {
        type: String,
        require: true,
      },
    },
  
    users: Array,
    
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  
  },

  {
  
    timestamps: true,
  
  }
  
);

export default mongoose.model("message", messageSchema);
