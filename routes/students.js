const express = require("express");
const {StudentModel,validateStudent} = require("../models/studentsModel");
const router = express.Router();

router.get("/", async (req,res) =>{
    try{
        const limit = req.query.limit || 5;
        const page = req.query.page -1 || 0;

        // const sort = req.query.sort || "_score";
        // const reverse = req.query.reverse == "yes" ? 1 : -1;

        let filterFind = {};
        if(req.query.s){  
          const searchExp = new RegExp(req.query.s,"i");
          filterFind = {name:searchExp}
        }

        const data = await StudentModel
        .find(filterFind)
        .limit(limit)
        .skip(page * limit)
        .sort({score: -1})
        // .sort({[sort]:reverse});
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
})

router.post("/", async (req, res) =>{
    const validBody = validateStudent(req.body)
    if(validBody.error)
    {
        return res.status(400).json(validBody.error.details);
    }
    try{
        const student = new StudentModel(req.body);
        await student.save();
        res.status(201).json(student);
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
})

router.put("/:id",async(req,res) =>{
    const validBody = validateStudent(req.body)
    if(validBody.error)
    {
        return res.status(400).json(validBody.error.details);
    }
    try{
        const id = req.params.id;
        const data = await StudentModel.updateOne({_id:id},req.body);
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
    })

    router.delete("/:id", async(req, res) =>{
        try{
            const id = req.params.id;
            const data = await StudentModel.deleteOne({_id:id});
            res.json(data);
        }
        catch(err){
            console.log(err);
            res.status(502).json({err})
        }
    })

module.exports = router;