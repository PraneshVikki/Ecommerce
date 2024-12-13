const mangoose = require('mongoose');
const ClientSchema =  mangoose.Schema({
    clientName: {type:String},
    clientPhn:{type: String},
    clientCity: {type: String},
    clientState:{type: String},
    clientArea:{type:String},
    clientBuiding:{type: String},
    clientLandmark:{type: String},

})

const Client_Details = mangoose.model("Client_Details",ClientSchema);
module.exports = Client_Details;