import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const PaymentGateway = () => {
    const [username, setUsername] = useState('');
    const [caseId, setCaseId] = useState('');
    const [amount, setAmount] = useState('');
    const [formHtml, setFormHtml] = useState('');

    const getPaymentLink = () => {
        return "https://easypay.axisbank.co.in/index.php/api/payment";
    };

    const generatePaymentUrl = (username, caseId, regAmt, orderNo) => {
        const strCID = "5204";
        const strRID = orderNo.toString();
        const strCRN = caseId;
        const strAMT = regAmt.toString();

        const strCheckSumString = strCID + strRID + strCRN + strAMT + "#$g6";
        const checksum = sha256Hash(strCheckSumString);

        const plainText = `CID=${strCID}&RID=${strRID}&CRN=${strCRN}&AMT=${strAMT}&VER=1.0&TYP=PRD&CNY=INR&RTU=http://haryanamedicalcouncil.org/user/paymentgatewayresponse&PPI=${caseId}|${username}|${regAmt}&RE1=MN&RE2=&RE3=&RE4=&RE5=&CKS=${checksum}`;

        const encryptedString = encrypt(plainText, "7O2#h1u4Bf8lF8Vc");

        return encryptedString;
    };

    const sha256Hash = (value) => {
        return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
    };

    const encrypt = (input, key) => {
        const keyArray = CryptoJS.enc.Utf8.parse(key);
        const toEncryptArray = CryptoJS.enc.Utf8.parse(input);
        const encrypted = CryptoJS.AES.encrypt(toEncryptArray, keyArray, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    };

    const preparePOSTForm = (url, data) => {
        const formID = "PostForm";
        const form = document.createElement("form");
        form.setAttribute("id", formID);
        form.setAttribute("name", formID);
        form.setAttribute("action", url);
        form.setAttribute("method", "POST");

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", data[key]);
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);

        const script = document.createElement("script");
        script.text = `document.${formID}.submit();`;
        document.body.appendChild(script);

        return form.outerHTML + script.outerHTML;
    };

    const handlePayment = async () => {
        try {
            const colValue = `Caseid_RID='${caseId}' and CRN='${username}' and stc='000' and Status_RMK='success'`;
            const response = await axios.get(`/api/paymentHistory?filter=${encodeURIComponent(colValue)}`);
            const getPayHistory = response.data;

            if (getPayHistory.length > 0) {
                const ramt = amount.split('.');
                const regamt = parseInt(ramt[0], 10);
                window.location.href = `/user/paid?CaseID=${caseId}&amt=${regamt}`;
            } else {
                const orderNo = Date.now() + parseInt(caseId, 10);
                const ramt = amount.split('.');
                const regamt = parseInt(ramt[0], 10);
                const tranUrl = getPaymentLink();
                const encryptedString = generatePaymentUrl(username, caseId, regamt, orderNo);
                const data = { i: encryptedString };
                const strForm = preparePOSTForm(tranUrl, data);
                setFormHtml(strForm);
            }
        } catch (error) {
            console.error("Error fetching payment history:", error);
        }
    };

    return (
        <div>
            <h1>Payment Gateway</h1>
            <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="text" placeholder="Case ID" value={caseId} onChange={(e) => setCaseId(e.target.value)} required />
                <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
            <div dangerouslySetInnerHTML={{ __html: formHtml }} />
        </div>
    );
};

export default PaymentGateway;
