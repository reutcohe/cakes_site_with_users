const mongoose = require("mongoose");
 const Joi = require("joi");
 const jwt = require("jsonwebtoken");


const cakeSchema = new mongoose.Schema({
    name: String,
    cal: Number,
    img:String,
    user_id:String,
    date: {
        type: Date, default: Date.now()
    }
})
const cakeModel = mongoose.model("caks", cakeSchema)
exports.cakeModel = cakeModel;

exports.validcake = (_bodyData) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        cal: Joi.number().min(40).max(500).required(),
        img:Joi.string().min(20).max(500)
    })
    return joiSchema.validate(_bodyData)
}