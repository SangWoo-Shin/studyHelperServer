const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    pool: true,
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    secure: false, 
    tls: {
        rejectUnauthorized: false 
    }
})

const sendMail = async(to, text) => {
    try {
        await transporter.sendMail({
            from: "AI Study Helper",
            to,
            subject: "OTP Verification",
            html: `<p>Welcome to AI Study Helper! Here is your OTP code, and have a nice day :)</p><br/> <p>${text}</p>`,
        });
    } catch(err) {
        console.log(err);
    }
};

module.exports = sendMail;