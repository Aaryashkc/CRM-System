import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { 
      type: String, 
      required: true 
    },
    number: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    company: { 
      type: String, 
      required: true 
    },
    software: { 
      type: String, 
      required: true 
    },
    state: {
      type: Number,  
      required: true,
    },
    district: {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
