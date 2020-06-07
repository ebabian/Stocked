const mongoose = require('mongoose')


const inventorySchema = new mongoose.Schema({
    name:  { type: String, required:true },
    type: { type: String, required:true } ,
    expiration: String,
    readyToEat: Boolean
});

const Item = mongoose.model('Item', inventorySchema);

module.exports = Item;
