const mongoose = require('mongoose');
const {Schema} = mongoose;
// modelo Task para la api track
const TaskSchema =new Schema({
    title:{type: String, required:true},
    description:{type:String, required:true},
    timeStamp:{type:Date,  default: Date.now}
});

module.exports= mongoose.model('Task', TaskSchema);