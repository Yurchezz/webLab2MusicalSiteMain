var mongoose = require('mongoose');

var newSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    title:{
        type: String,
    },
    img: String,
    
    
});

var New_item = module.exports = mongoose.model('New', newSchema);
module.exports.get = function(callback, limit){
    New_item.find(callback).limit(limit);
}