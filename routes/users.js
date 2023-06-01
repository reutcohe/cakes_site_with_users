const express= require("express");
const bcrypt = require("bcrypt");
const {auth} = require("../middlewares/auth");
const {UserModel,validUser, validLogin,createToken} = require("../models/userModel")
const router = express.Router();
const {authToken}= require ("../middlewares/auth")

router.get("/" , async(req,res)=> {
//   res.json({msg:"Users work"})
  try {
    let data = await UserModel.find({});
    res.json(data);
}
catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err });
}
})


router.post("/", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.detalis)
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10)

        await user.save();
        user.password = "******";
        res.status(201).json(user);
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: "Email already in system try login", code: 11000 })
        }

        console.log(err)
        res.status(500).json({ msg: "err", err })
    }

})

router.post("/login", async (req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.detalis)
    }
    console.log(req.body.email)
    let user = await UserModel.findOne({ email: req.body.email })
    
    if (!user) {
        return res.status(401).json({ msg: "email is worng ,code:1" })
    }
    let authPassword = await bcrypt.compare(req.body.password, user.password);
    if (!authPassword) {
        return res.status(401).json({ msg: "Password is worng ,code:2" });
    }
    let newToken = createToken(user._id)
    res.json({ token: newToken })


})
module.exports = router;