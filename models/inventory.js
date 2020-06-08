const mongoose = require('mongoose')


const inventorySchema = new mongoose.Schema({
    name:  { type: String, required:true },
    type: { type: String, required:true } ,
    qty: Number,
    expiration: String,
    url: String
});

const Item = mongoose.model('Item', inventorySchema);

module.exports = Item;
