import express from 'express';
import bodyParser from 'body-parser';
import dbConnect from './db/dbConnect.js';
import cors from 'cors';
import { getProfileImg, getUserData, signUpData, storeUserData } from './db/userController.js';
import { upload } from './db/multer.js';
import User from './db/userModel.js';




const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json()); 
app.use(express.static('public'));
dbConnect();
// Middleware to parse incoming request bodies as JSON
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

  const cpUpload = upload.fields([{ name: 'profilePhoto' }, { name: 'coverPhoto'}])
  // app.post('/upload', cpUpload, (req, res) => {
  //   console.log("upload image ka hain = ",req.files)
  // })
  
  app.post("/api/users/upload/:uid", cpUpload, async function (req, res, next) {
    try {
      if (!req.files) {
        return res.status(400).send("No file uploaded!");
      }
  
      const { uid } = req.params;
      const user = await User.findOne({ uid });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const profileData = {
        profilePhoto: req.files.profilePhoto ? req.files.profilePhoto[0].filename : null,
        coverPhoto: req.files.coverPhoto ? req.files.coverPhoto[0].filename : null,
      };
  
      // Update user profile data (replace existing data)
      user.profile = profileData;
      const savedUser = await user.save();
  
      res.json({ message: 'Profile data updated successfully!', userprofile: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  });
  
  app.post('/api/users/signup',signUpData);
  app.post('/api/users/:uid', storeUserData); // Route to store user data
  app.get('/api/users/:uid', getUserData);
  app.get('/api/profileimg/:id',getProfileImg);

  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));