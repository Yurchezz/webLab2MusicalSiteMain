var mongoose = require('mongoose');


var appealSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    appealHours:{
        type: String,
    },
    appealMinutes: String,
    appealDate: String
    
});

var Appeal = module.exports = mongoose.model('appeal', appealSchema);
module.exports.get = function(callback, limit){
    Appeal.find(callback).limit(limit);
}