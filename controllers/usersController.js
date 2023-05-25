const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.index = async (req,res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err){
        res.status(400).json({ message: 'Users not found!' });
    }
}

exports.create_new_user = async (req,res) => {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save();

    res.status(201).json(savedUser);
}
