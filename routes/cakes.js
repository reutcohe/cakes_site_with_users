 const express = require("express");
 const router = express.Router();
 const { cakeModel, validcake } = require("../models/cakeModel");
 const { authToken } = require("../auth/authToken")


// const cake = {
//     name: "apple cake",
//     cals: 800,
//     price: 30,
//     img: "https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=…",
//     date_created: "2022-09-19T08:01:02.108+00:00",
//     category_id: "1",
//     user_id: "63280f16b12081bdbf5e3d62"
//   };


router.post("/", authToken, async (req, res) => {
   
    let validBody = validcake(user_id = req.tokenData._id, req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.detalis)
    }
    try {
        let cake = new cakeModel(req.body);
        cake.user_id = req.tokenData._id;
        await cake.save();
        res.status(201).json(cake);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }

});