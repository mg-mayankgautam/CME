const mongoose = require('mongoose');
const {mongo} = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const {Schema}=mongoose;


const formdataSchema = new Schema({
    organizationName: {type:String},
    email: {type:String},
    address: {type:String},
    theme: {type:String},
    registrationNumber: {type:String},
    cmeStartDate: {type:String},
    cmeEndDate: {type:String},
    daysDifference: {type:String},
    faculty1: {type:String},
    delegates: {type:String},
    exercise: {type:String},
    hours: {type:String},
    chairman: {type:String},
    secretary: {type:String},
    methodology: {type:String},
    internationalPermissionNumber: {type:String},
    internationalPermissionDate: {type:String},
    pdfURL:{type:Array},
    approvals:{type:Object}
});

module.exports =mongoose.model('formdata',formdataSchema );