const mongoose = require('mongoose');
const {mongo} = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const {Schema}=mongoose;


const userSchema = new Schema({
    id: {type:Number},
    password: {type:String},
    role:{type:String},
    refreshToken:{type:String}
    
//
});

module.exports =mongoose.model('Users',userSchema);

