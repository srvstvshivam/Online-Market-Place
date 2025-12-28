import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token (Login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password').populate('favorites');

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    user.password = undefined; // Remove password before sending response
    res.status(200).json({ data: { user } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// @desc    Register a new user
const signupUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const user = await User.create({ name, email, phone, password });

  if (user) {
    generateToken(res, user._id);
    user.password = undefined;
    res.status(201).json({ data: { user } });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Logout user / clear cookie
const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logout successful' });
};

// @desc    Get user profile
const getUserProfile = async (req, res) => {
    // req.user is attached by the `protect` middleware
    const user = await User.findById(req.user._id).populate('favorites');
    if (user) {
        res.status(200).json({ data: user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        const updatedUser = await user.save();
        res.status(200).json({ data: updatedUser });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Toggle an ad in user's favorites
const toggleFavorite = async (req, res) => {
    const adId = req.params.id;
    const user = await User.findById(req.user._id);
    
    const adIndex = user.favorites.indexOf(adId);
    if (adIndex > -1) {
        user.favorites.splice(adIndex, 1); // Remove from favorites
    } else {
        user.favorites.push(adId); // Add to favorites
    }

    await user.save();
    res.status(200).json({ message: 'Favorites updated successfully' });
};

export { loginUser, signupUser, logoutUser, getUserProfile, updateUserProfile, toggleFavorite };