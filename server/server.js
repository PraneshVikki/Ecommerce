const express = require('express');
const User = require('./models/User.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');

const addNewProduct = require('./models/AdminProduct.js');
const Client_Details = require('./models/ClientDetails.js');
const multer = require("multer");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const authenticateToken = require('./middleware/auth.js')

const app = express();
app.use(express.json());
app.use(express.static('../client/src/assets/Images'));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000','http://127.0.0.1:3000','http://localhost:3002','http://127.0.0.1:3002'], 
  credentials: true
}));

const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE);

const LoginController = require('./controllers/Register/LoginController.js')
const signupController = require('./controllers/Register/signupController.js')

app.disable('x-powered-by');

mongoose.connect(process.env.MONGODB).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use("/loginDB", LoginController);

app.use("/signupDB",signupController);

 
  
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, '../client/src/assets/Images');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/newProduct', upload.single('productImage'), async (req, res) => {
  const imageName = req.file.filename;
  try {
    const newProduct = await addNewProduct.create({
      image: imageName,
      product: req.body.productName,
      amount: req.body.productAmount,
      cusAmount: req.body.productAmount,
      price: req.body.productPrice,
      cusPrice: req.body.productPrice,
      add: req.body.productAdd,
      cusAdd: req.body.productAdd,
    });
    await User.updateMany(
      {},
      { $push: { AdminProduct:  newProduct } }
    );
    res.json({ message: 'Product was added', nextpage: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Product was not added', nextpage: false });
  }
});

app.get('/details', async (req, res) => {
  try {
    const eachProduct = await addNewProduct.find({});
    res.json(eachProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.put('/addElements', authenticateToken, async (req, res) => {
  try {
    const particularUser = await User.findOne({ _id: req.user.id });
    if (particularUser) {
      let productUpdated = false;
      particularUser.AdminProduct.forEach((product, index) => {
        if (product._id.toString()===req.body.id) {
          particularUser.AdminProduct[index].add = true;
          productUpdated = true;
        }
      });

      if (productUpdated) {
        await particularUser.save();
        res.json({ message: "Successfully added", toggling: true });
      } else {
        res.status(404).json("No matching product found");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Error");
  }
});
app.put('/customer', authenticateToken, async (req, res) => {
  try {
    const particularUser = await User.findOne({ _id: req.user.id });
    let productUpdated = false;
    particularUser.AdminProduct.forEach((_,index)=>{
    if (particularUser) {
      particularUser.AdminProduct[index].cusAmount = req.body.AddedDetails[index].cusAmount;
      particularUser.AdminProduct[index].cusPrice = Math.ceil(((req.body.AddedDetails[index].cusAmount % req.body.AddedDetails[index].amount) / req.body.AddedDetails[index].amount) * req.body.AddedDetails[index].price + (req.body.AddedDetails[index].cusAmount / req.body.AddedDetails[index].amount) * req.body.AddedDetails[index].price);
      productUpdated = true;
    productUpdated = true;
    }})
    if (productUpdated) {
      await particularUser.save();
      console.log("way to Procedure")
      res.json({ message: "way to Procedure",nextState:true});
    }
    /*if (particularUser) {
      let productUpdated = false;
      particularUser.AdminProduct.forEach((product, index) => {
        if (product._id.toString()===req.body.detail._id) {
          particularUser.AdminProduct[index].cusAmount = req.body.newCusAmount;
          particularUser.AdminProduct[index].cusPrice = Math.ceil(((req.body.newCusAmount % req.body.detail.amount) / req.body.detail.amount) * req.body.detail.price + (req.body.newCusAmount / req.body.detail.amount) * req.body.detail.price);;
          productUpdated = true;
        }
      });

      if (productUpdated) {
        await particularUser.save();
        res.json({ message: "Successfully added", toggling: true });
      } else {
        res.status(404).json("No matching product found");
      }
    } else {
      res.status(404).json("User not found");
    }*/
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Error");
  }
});


app.get('/AddedDetails',authenticateToken,async(req,res) =>{
  const particularUser = await User.findOne({_id :req.user.id});
  if (particularUser){
    res.json({content:particularUser.AdminProduct,nextState:true});
  }else{
    res.json({content:[],nextState:false});
  }
}) 

app.delete('/removeItem', async (req, res) => {
  console.log(req.body.id)
  try {
    await addNewProduct.deleteOne({ _id: req.body.id });

    await User.updateMany(
      {},
      { $pull: { AdminProduct: { _id: req.body.id } } }
    );

    res.status(200).send({ message: 'Item removed successfully Refresh the page to see the result!!!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred' });
  }
});

app.delete(('/logout'),(req,res)=>{
  res.clearCookie('token');
  res.send('Cookie has been cleared');   

})

app.get("/checkStatus",async(req,res)=>{
  try{
  const token = req.cookies.token;
  if (token == null)
    {
      return res.json(res.json({Registeration:false,Status:false}))

    }
    if (token){
      if (token === process.env.ADMIN_TOKEN){
          res.json({Registeration:true,Status:true})
        }else{
          res.json({Registeration:true,Status:false})
      }}
    }
catch{
  console.log({Registeration:false,Status:false});
}
})

app.post('/stripe', async (req, res) => {

  try{
    Client_Details.create({
      clientName: req.body.clientDetails.clientName,
      clientPhn:req.body.clientDetails.clientPhn,
      clientCity: req.body.clientDetails.clientCity,
      clientState:req.body.clientDetails.clientState,
      clientArea:req.body.clientDetails.clientArea,
      clientBuiding:req.body.clientDetails.clientBuiding,
      clientLandmark:req.body.clientDetails.clientLandmark,
    })
  }catch(error){
    console.log("Error in updating user details")
  }
  try {
    const session = await stripe.checkout.sessions.create({
      email: process.env.STRIPE_EMAIL,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.AddedDetails.map((item) => {
        if (item.add === true){
        return {
          price_data: {
            currency: 'INR',
            product_data: {
              name: item.product
            },
            unit_amount: item.cusPrice * 100, 
          },
          quantity: 1,
        };}
      }),
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

