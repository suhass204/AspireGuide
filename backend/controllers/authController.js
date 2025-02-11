const User = require('../models/user');
const bcrypt = require('bcryptjs');


const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const user = new User({ name, email, password });
    await user.save();

    
    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    res.status(201).json({ message: 'Signup successful', user: req.session.user });
  } catch (err) {
    console.error("Signup error:", err); // Logs the actual error
    res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = { signup, login, logout };
