const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
  name:String,
  subject:String,
  score:Number,
  // מאפיין שיווצר לבד בכל רשומה שנוסיף
  // לפי התאריך שנוספה הרשומה בברירת מחדל
  date_created:{
    type:Date, default:Date.now
  }
})

exports.StudentModel = mongoose.model("students",studentSchema);

exports.validateStudent = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    // email() -> בודק שהמייל שנשלח במאפיין הגיוני למייל
    subject:Joi.string().min(2).max(150).required(),
    score:Joi.number().min(1).max(100).required()
  })
  return joiSchema.validate(_reqBody)
}