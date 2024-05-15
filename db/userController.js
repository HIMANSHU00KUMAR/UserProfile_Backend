
import Profile from './profileModel.js';
import User from './userModel.js';


export const signUpData=async(req,res)=>{
  try {
    console.log(req.body);
    const { uid, email } = req.body;

    // Check if uid or email (or both) are missing
    if (!uid || !email) {
      return res.status(400).json({ message: 'Missing required fields: uid and email' });
    }

    // Check if a user with the same uid or email already exists
    const existingUser = await User.findOne({ $or: [{ uid }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User with provided uid or email already exists!' });
    }
    else{

   

    // Create a new user
    const newUser = new User({ uid, email });
    const savedUser = await newUser.save();

    res.json({ message: 'User registered successfully!', user: savedUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
}


export const storeUserData = async (req, res) => {
  const { uid } = req.params; 
  try {
    const { name, phone, about, address } = req.body;

    // Check if a user with the provided uid already exists
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      // Update existing user data
      existingUser.name = name;
      existingUser.phone = phone;
      existingUser.about = about;
      existingUser.address = address;

      const updatedUser = await existingUser.save();

      res.json({ message: 'User data updated successfully!', user: updatedUser });
    } else {
      // Create a new user
      const newUser = new User({ uid, name, phone, about, address });

      const savedUser = await newUser.save();

      res.json({ message: 'User data stored successfully!', user: savedUser });
    }
  } catch (error) {
    console.error('Error storing user data:', error);
    res.status(500).json({ message: 'Error storing user data' }); // Handle errors gracefully
  }
};




export const getUserData = async (req, res) => {
  const { uid } = req.params; // Extract user ID from request parameters

  try {
    const user = await User.findOne({uid});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return the user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' }); // Handle errors gracefully
  }
};


export const getProfileImg = async (req, res) => {
  const { id } = req.params; // Extract user ID from request parameters

  try {
    // Query the database for the profile by its ID
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }


    res.json(profile); // Return the user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' }); // Handle errors gracefully
  }
};




