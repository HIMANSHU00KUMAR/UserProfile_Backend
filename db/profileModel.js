import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    
    profilePhoto: {
      type: String, // Store the path to the uploaded image
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw3cTqoAGfu1Sh5rZ6fPunaE&ust=1714993220608000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjjjOSt9oUDFQAAAAAdAAAAABAE"
    },
    coverPhoto: {
      type: String, // Store the path to the uploaded image
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ftrusteid.mioa.gov.mk%2Fwp-content%2Fplugins%2Fuix-page-builder%2Fuixpb_templates%2Fimages%2FUixPageBuilderTmpl%2F&psig=AOvVaw0-HVXTEULGRtqQQfM2Giq8&ust=1714993253167000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKiGgvCt9oUDFQAAAAAdAAAAABAE"
    },    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Add other personal details here (optional)
    createdAt: {
      type: Date,
      default: Date.now, // Automatically timestamp creation
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically timestamp updates
    },
  });   
  
  
  
  export default  mongoose.model('Profile', profileSchema);
  