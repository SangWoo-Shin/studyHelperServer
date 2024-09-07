const User = require("../models/user");

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

module.exports = { checkUserInfo };