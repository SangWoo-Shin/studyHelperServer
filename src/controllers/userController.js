const User = require("../models/user");
const bcrypt = require('bcrypt');

const checkUserInfo = async (req, res) => {
    const { email, name, picture } = req.body; 
    try {
        const userExist = await User.findOne({ email: email });

        if (!userExist) {
            const user = await User.create({
                email: email,
                name: name,
                image: picture
            });
            console.log(user);
            return res.status(201).json(user);
        } else {
            return res.status(200).json(userExist);
        }
    } catch (err) {
        console.log("Error occurred: ", err); 
        return res.status(400).json({ error: 'Internal Server Error' });
    }
}

const verifyUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.status(200).json({ message: 'Login successful', user: userExist });
    } catch (err) {
        console.error("Error occurred: ", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
    
const getUserInfo = async (req, res) => {
    const {id} = req.user;
    try {
        const userInfo = await User.findOne({ _id: id });
        res.status(200).json(userInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error."});
    }
};

module.exports = { checkUserInfo, getUserInfo, verifyUser };