const path = require('path');
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
require("dotenv").config();
const verifyJWT = require('../middleware/verifyJWT')

const authController = require('../controller/authController');


router.post('/addformdata',upload.any("PDF"),authController.submitformdata)

//dont open this route until needed to make new user
//  router.post('/signup',authController.signup)

// router.post('/addrecruitingcompany',upload.array("image"), authController.addRecruitingCompany)
router.post('/login',authController.login)
router.post('/logout',authController.logout)
router.get('/getallforms',verifyJWT,authController.getallforms)
router.get('/getformdata',verifyJWT,authController.getfromdata)

router.post('/docapproval',verifyJWT,authController.docApproval)
router.post('/docapprovalall',verifyJWT,authController.docApprovalAll)

router.post('/Presidentapproval',verifyJWT,authController.PresidentAproval)
router.post('/Registrarapproval',verifyJWT,authController.RegistrarAproval)

// router.post('/generatecertificate',verifyJWT,authController.generateCertificate)






module.exports = router;
