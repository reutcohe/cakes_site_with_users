 const express = require("express");
 const router = express.Router();
 const { cakeModel, validcake } = require("../models/cakeModel");
 const { auth } = require("../middlewares/auth")

 router.get("/" , async(req,res)=> {
    //   res.json({msg:"Users work"})
      try {
        let data = await cakeModel.find({});
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err });
    }
    })


router.post("/", auth, async (req, res) => {
   
    let validBody = validcake( req.body);
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

module.exports=router;