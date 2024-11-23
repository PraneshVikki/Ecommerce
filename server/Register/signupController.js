const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../User.js');
const generateToken = require('./generatingToken.js');
const bcrypt = require('bcrypt');
const addNewProduct = require('../AdminProduct.js');
const dotenv = require('dotenv');
dotenv.config();

router.post('/',async(req,res)=>{
    try{
      const verify = await User.findOne({ email: req.body.email });

      if (verify){
        return(res.json({message:"You are already login..",nextPage:false}))
      }
      else{
        return(res.json({message:"You will receive an otp",nextPage:true}))
      }
    }
    catch{
      res.json({message:"Internal server error",nextPage:false})
    }
  })

  router.post('/otp', (req, res) => {

    const { formData, otp } = req.body;
  
    if (!formData || !formData.email || !otp) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'praneshmern@gmail.com',
        pass: 'lvjdiqyfibjactij',
      }
    });
  
    const mailOptions = {
      from: 'praneshmern@gmail.com',
      to: formData.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.json({ message: 'Email sent successfully' });
      }
    });
  });
  
  router.post('/otpDB', async (req, res) => {
    try {
      if (req.body.storeOtp === req.body.formData.otp) {
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.formData.password, salt)
  
        const allProducts = await addNewProduct.find({});
        console.log(allProducts)
        const newUser = await User.create({
          name: req.body.formData.name,
          email: req.body.formData.email,
          password: newPassword,
          AdminProduct: allProducts,
          clientDetails: [{
            clientName: req.body.clientDetails.clientName,
            clientPhn: req.body.clientDetails.clientPhn,
            clientPin: req.body.clientDetails.clientPin,
            clientCity: req.body.clientDetails.clientCity,
            clientState: req.body.clientDetails.clientState,
            clientArea: req.body.clientDetails.clientArea,
            clientBuiding: req.body.clientDetails.clientBuiding,
            clientLandmark: req.body.clientDetails.clientLandmark
        }]
        });
        console.log("req.body.clientDetails..",req.body.clientDetails);
        const token = generateToken(newUser,res);
        res.json({ message: 'Success', nextPage: true });
      } else {
        res.json({ message: "Your otp is wrong", nextPage: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports = router;