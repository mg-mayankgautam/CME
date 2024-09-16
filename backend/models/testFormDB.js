const mongoose = require('mongoose');
const {mongo} = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const {Schema}=mongoose;


const testformdataSchema = new Schema({
    organizationName: {type:String},
    pdfURL:{type:Array},
    approvals:{type:Object},
    time: {type: String},
});

module.exports =mongoose.model('testformdata', testformdataSchema);