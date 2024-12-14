const mangoose = require('mongoose');
const aboutProductSchema =  mangoose.Schema({
    star:{type:Number},
    comment:{type:Object}

})

const AboutProduct = mangoose.model("About-Product",aboutProductSchema);
module.exports = AboutProduct;