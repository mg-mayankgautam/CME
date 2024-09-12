// require('dotenv').config();
const formdataDB = require("../models/formdataDB.js")
//  const formdataDB=require("../models/testFormDB.js")
const usersDB = require("../models/usersDB.js")

//  ACCESS_TOKEN_SECRET=c6761e1905b166a970ae1b5785e1bc82;
//  SECRET_TOEKN_SECRET=g290bd1e1810b8ea14182dee6c7f2f0d;

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const jwt = require('jsonwebtoken');
require('dotenv').config();
// const upload = multer({ storage: storage })
const crypto = require('crypto');


const bucketName = "test-cmeportal"
const bucketRegion = "ap-south-1"
const accessKeyId = "AKIA6GBMBOXSFEL2MLP5"
const secretAccessKey = "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"


const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { hasSubscribers } = require("diagnostics_channel");

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

module.exports.submitformdata = async (req, res) => {


    console.log(req.files);
    console.log(req.body);

    const { organizationName, email, address, theme, registrationNumber, cmeStartDate, cmeEndDate, daysDifference, faculty1, delegates, exercise, hours, chairman, secretary, methodology, internationalPermissionNumber, internationalPermissionDate } = req.body;
    const approvals = {clerk:false,registrar:false,accountant:false};

    const pdfArray = req.files
    const pdfURL = [];

    for (const pdf of pdfArray) {
        // console.log(img);
        const fileName = generateFileName();


        const uploadParams = {
            Bucket: bucketName,
            Body: pdf.buffer,
            Key: fileName,
            ContentType: pdf.mimetype
        }

        await s3Client.send(new PutObjectCommand(uploadParams));

        const URL = `https://test-cmeportal.s3.ap-south-1.amazonaws.com/${fileName}`
        //  console.log(URL);

        pdfURL.push({ url: URL, fileName: fileName, PDF_Label: pdf.fieldname })

    }

    let newformentry = new formdataDB({
        organizationName, email, address, theme, registrationNumber, cmeStartDate, cmeEndDate, 
        daysDifference, faculty1, delegates, exercise, hours,
        chairman, secretary, methodology, internationalPermissionNumber, internationalPermissionDate,
        pdfURL, approvals
    });



    newformentry.save()
        .then((saved) => {
            console.log('data added success');
             res.send(true);

        })
        .catch(err => { console.log(err); });






}

module.exports.signup = async (req, res) => {

    console.log('line86', req.body);
    const { id, password, role } = req.body;

    const refreshToken = '';
    let newuserentry = new usersDB({ id, password, role, refreshToken });



    newuserentry.save()
        .then((saved) => {
            console.log('user added success');
            // res.send(true);

        })
        .catch(err => { console.log(err); });


}

module.exports.getallforms = async (req, res) => {

    // console.log('here');
    try {
        const formdata = await formdataDB.find({})
        res.send(formdata);
        // res.json({ accessToken,formdata });

    } catch (e) { console.log(e) }




}


module.exports.getToken = async (req, res) => {

    // console.log('here');
    try {
        const formdata = await formdataDB.find({})
        res.send(formdata);
        // res.json({ accessToken,formdata });

    } catch (e) { console.log(e) }




}


module.exports.login = async (req, res) => {

    const { id, password } = req.body;

    const foundUser = usersDB.findOne({ id, password })
        .then((saved) => {

            // console.log('line 127',saved)
            if (saved) {

                // console.log(saved)
                //create JWT
                const accessToken = jwt.sign(
                    { "username": saved.id, "role": saved.role },

                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '600s' }
                );
                const refreshToken = jwt.sign(
                    { "username": saved.id, "role": saved.role },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );

                // saved.refreshToken=refreshToken;

                try {
                    usersDB.findOneAndUpdate({ id: id }, { refreshToken: refreshToken }, { returnDocument: 'after' })
                        .then((saved) => {
                            //  console.log('updated users',saved)
                            // res.send(saved.serviceType)
                            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                            res.json({ accessToken });
                        })
                        .catch((e) => { console.log(e) })
                }
                catch (e) { console.log('line 157', e) }
                // console.log(saved)
                // res.send(true);


            }
            else res.send(false);
        })
        .catch(err => {
            console.error('line 166', err)
            res.send(false)
        })






}

module.exports.logout = async (req, res) => {
    console.log('reached logout');



    const token = req.cookies.jwt;


    const base64Url = token.split(".")[1];


    const base64 = base64Url.replace("-", "+").replace("_", "/");


    const decodedString = Buffer.from(base64, 'base64').toString('utf-8');

    const TokenDataWithoutToken = JSON.parse(decodedString);
    console.log('TokenDataWithoutToken:', TokenDataWithoutToken);

    const id = TokenDataWithoutToken.username
    //   console.log('brkpnt 1', Role)


    // if (!cookies?.jwt) return res.sendStatus(401);
    // const refreshToken = cookies.jwt;
    const blankstring = '';
    // // console.log(refreshToken);

    usersDB.findOneAndUpdate({ id: id }, { refreshToken: blankstring }, { returnDocument: 'after' })
        .then((saved) => {
            console.log('updated user refresh token/logout', saved)
            // res.send(saved.serviceType)
            // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            //res.json({ accessToken });
            res.send('logged out')
        })
        .catch((e) => { console.log(e) })








}