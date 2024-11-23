const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../User.js');
const generateToken = require('./generatingToken.js')

const admin = async (req, res) => {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
   
      const isAdmin =  email === adminEmail && password === adminPassword;
    console.log(email,password,isAdmin)
    return isAdmin;
  }

/*   const generateToken = async(user ,res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',            
      path: '/' 
    });
  }; */


router.post('/', async (req, res) => {
    try {
        const adminPermission  = await admin(req,res);
        if (adminPermission === true){
          res.cookie('token', process.env.ADMIN_TOKEN, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',       
            path: '/' 
          });
          res.json({message: "true", nextPage: true})
        }else{
          const user = await User.findOne({ email: req.body.email });
          if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
              generateToken(user,res);
              res.json({ message: "false", nextPage: true ,user:user });
            }
          }
          else{
          res.json({ message: "Login failed!!", nextPage: false });
          }
        }
  } catch (error) {
    console.error(error);
    res.json({ message: "Login failed!!!!", nextPage: false });
  }
  });

module.exports = router;