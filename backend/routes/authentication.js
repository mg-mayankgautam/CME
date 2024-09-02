const path = require('path');
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
require("dotenv").config();

const authController = require('../controller/authController');


router.post('/addformdata',upload.any("PDF"),authController.submitformdata)
// router.post('/addrecruitingcompany',upload.array("image"), authController.addRecruitingCompany)


module.exports = router;
