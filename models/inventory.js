const mongoose = require('mongoose')


const inventorySchema = new mongoose.Schema({
    name: String,
    type: String,
    qty: Number,
    price: String,
    expiration: String,
    url: String,
    url2: String,
    url3: String,
});

const Item = mongoose.model('Item', inventorySchema);

module.exports = Item;
