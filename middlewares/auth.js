const jwt = require("jsonwebtoken")
const {config}= require("../config/secret")

exports.authToken = (req, res, next) => {
    console.log(req)
     let token = req.header("x-api-key");
    if (!token) {
        res.status(401).json({ msg: "you mast send token" })
    }
    try {
        let decodeToken = jwt.verify(token, config.tokenSecret);
       
        req.tokenData=decodeToken;
        // req.body.user_id = decoded.user_id;

        console.log(req.tokenData._id)
        next()
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ msg: "token invalid" })
    }
}