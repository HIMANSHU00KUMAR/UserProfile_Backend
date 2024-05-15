import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
  uid:{
    type:String,
    required:true,
    unique:true,
    
  },
  email:{
    type:String,
    required:true,
    unique:true,
    
  },

  name: {
    type: String,
  },
  phone: {
    type: String,
    // Add validation for phone number format if needed
  },
  about: {
    type: String,
  },
  address: {
    type: String,
  },
  profile: [],
 
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



export default  mongoose.model('User', userSchema);
