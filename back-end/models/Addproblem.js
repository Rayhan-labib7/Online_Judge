const mongoose=require("mongoose");
const AddproblemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    timelimit:{
        type:String,
        required:true,
    },
    problemstatement:{
        type:String,
        required:true,
    },
    inputstatement:{
        type:String,
        required:true,
    },
    outputstatement:{
        type:String,
        required:true,
    },
    constraint:{
        type:String,
        required:true,
    },
    sampleinput:{
        type:String,
        required:true,
    },
    sampleoutput:{
        type:String,
        required:true,
    },
    createdby:{
        type:String,
        required:true,
    },
    issolved:{
        type:Boolean,
    },
},
{timestamps : true}
);
module.exports = mongoose.model("Addproblem",AddproblemSchema);