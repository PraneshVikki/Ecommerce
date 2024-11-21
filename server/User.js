const mongoose = require('mongoose');
const AdminProductSchema = require('./AdminProduct').schema;
const mongoooseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    AdminProduct: [AdminProductSchema],
    clientDetails: [{
        clientName: String,
        clientPhn: String,
        clientPin: String,
        clientCity: String,
        clientState: String,
        clientArea: String,
        clientBuiding: String,
        clientLandmark: String
      }]

}, { timestamps: true });

const auth = mongoose.model("User-Auth",mongoooseSchema);
module.exports = auth;