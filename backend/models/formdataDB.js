const mongoose = require('mongoose');
const {mongo} = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const {Schema}=mongoose;


const formdataSchema = new Schema({
    organizationName: {type:String},
    pdfURL:{type:Array}
   
});

module.exports =mongoose.model('formdata', formdataSchema);