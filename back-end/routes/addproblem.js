const router = require("express").Router();
const User = require('../models/Users');
const Addproblem = require('../models/Addproblem')
const bcrypt = require('bcrypt');

     
//create

router.post('/problemset', async (req, res) => {
    const newProblem = new Addproblem(req.body);
    try{
        const savedProblem = await newProblem.save();
        res.status(200).json(savedProblem);
    }catch(err){
        res.status(500).json(err);
    }

})

//Update problem

router.put('/problemset/:id', async (req, res) => {
   try{
       const problem = await Addproblem.findById(req.params.id);

       if(problem.createdby === req.body.createdby){
       
         try{
                
                const updateProblem = await Addproblem.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },{new:true});
           res.status(200).json(updateProblem);
         }catch(err)
         {
            
            res.status(500).json(err);
         }
       }else{
        res.status(401).json("You can update only your problem!")
       }
   }catch(err){
    
    res.status(500).json(err);
   }

})

//delete problem

router.delete('/problemset/:id', async (req, res) => {
    try{
        const problem = await Addproblem.findById(req.params.id);
 
        if(problem.createdby === req.body.createdby){
        
          try{
                 
            await problem.delete();
            res.status(200).json("Problem has been deleted...");
          }catch(err)
          {
             
             res.status(500).json(err);
          }
        }else{
         res.status(401).json("You can delete only your problem!")
        }
    }catch(err){
     
     res.status(500).json(err);
    }
 
 })

//get problem

router.get('/problemset/:id',async(req,res)=>{
    try{
       const problem = await Addproblem.findById(req.params.id);
       res.status(200).json(problem);
    }catch(err){
        res.status(500).json(err);
    }
})

//get all problem

router.get('/problemset',async(req,res)=>{
    const username = req.query.user;
    try{
       let problems;
       if(username)
       {
         problems = await Addproblem.find({username:createdby});
       }
       else
       {
        problems =await Addproblem.find();
       }
       res.status(200).json(problems);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;