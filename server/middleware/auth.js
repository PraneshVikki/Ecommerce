const jwt = require('jsonwebtoken')

module.exports =  async(req, res, next) => {
    const token = req.cookies.token;
    if (token == null)
      {
        return res.json({message:"Signup before adding element to the cart"})
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();                 
      } catch (err) {
        return res.json({ message: 'Token is not valid' });
      }
  };