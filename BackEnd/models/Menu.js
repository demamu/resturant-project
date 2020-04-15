const mongoose = require('mongoose');

const MenuSchema= mongoose.Schema({

 name: {
     type: String,
     required : true
 },
 price: {
    type: Number,
    required : true,
    
},
calories: {
    type: String,
    required : true
},
imageURL: {
    type: String,
    //required: true
},
// reviews: [
//      {
    
// 	productId: _id,
// 	comment: String,
//     ratting:Number,
// }]
});

module.exports = mongoose.model('menu',MenuSchema);