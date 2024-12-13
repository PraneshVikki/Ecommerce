const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports = async(user ,res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',            
      path: '/' 
    });
  };