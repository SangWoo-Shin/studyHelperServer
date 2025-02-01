const OTP = require('../models/otp');
const User = require('../models/user');
const otpService = require('../services/otpService');
const sendMail = require('../utils/mailer');
const generateToken = require('../utils/strategy');
const bcrypt = require('bcrypt');

const createOTP = async (req, res) => {
    console.log(req.body);

    const {email} = req.body;

    if(!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        await OTP.findOneAndDelete({ email });
        const otp = otpService.getOtp();

        const newOtp = new OTP({ email, otp });
        await newOtp.save();
        try {
            console.log(otp);
            await sendMail(email, `OTP Code: ${otp}`);
        } catch (err) {
            console.log("Error seding email: ", error);
            return res.status(500).json({ error: 'Internal server error'});
        }

        res.status(201).json({ message: 'OTP generated and sent successfully.', SentEmail: email});
    } catch (err) {
        console.log('Error generating OTP: ', err);
        res.status(500).json({ error: 'Internal server error'});
    }
}

const verifyOTP = async (req, res) => {
    const {name, email, otp, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    if( !email || !otp ) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    try {   
        const originOtp = await OTP.findOne({ email });

        if(!originOtp) {
            res.status(404).json({error: 'No OTP found for the provided email'});
        }

        if(otp == originOtp.otp) {
            const existingUser = await User.findOne({ email });
            if(existingUser) {
                const token = generateToken(existingUser);

                return res.status(200).json({
                    message: 'OTP verfied successfully',
                    token,
                    exists: true,
                    user: existingUser
                });
            } else {
                const newUser = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                })
                const token = generateToken(newUser);

                return res.status(200).json({
                    message: 'OTP verified successfully',
                    token,
                    exists: false,
                    user: newUser
                });
            }
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createOTP,
    verifyOTP
};