const mangoose = require('mongoose');
const productSchema =  mangoose.Schema({
    image: {type:String},
    product:{type: String},
    amount: {type: Number},
    cusAmount:{type: Number},
    price:{type: Number},
    cusPrice:{type: Number},
    add:{type: Boolean},
    cusAdd:{type:Boolean},

})

const AdminProduct = mangoose.model("New-Product",productSchema);
module.exports = AdminProduct;