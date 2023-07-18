import React, { useState } from 'react'
import './addProblem.css'
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
export default function AddProblem() {

  const [title,setTitle]=useState("");
  const [timelimit,setTimelimit]=useState("");
  const [createdby,setCreate]=useState("");
  const [problemstatement,setProblemstatement]=useState("");
  const [inputstatement,setInputstatement]=useState("");
  const [outputstatement,setOutputstatement]=useState("");
  const [constraint,setConstraint]=useState("");
  const [sampleinput,setSampleinput]=useState("");
  const [sampleoutput,setSampleoutput]=useState("");

  const handleSubmit =async (e) =>{
    e.preventDefault();
    const newProblem = {
      title,
      timelimit,
      createdby,
      problemstatement,
      inputstatement,
      outputstatement,
      constraint,
      sampleinput,
      sampleoutput,  
    }
    try{
    const res =await  axios.post('/addProblem/problemset',newProblem);
    window.location.replace('/problem/'+res.data._id);
    }catch(err)
    {

    }
   
  }

  return (
    <div className='addproblem'>
      <form onSubmit={handleSubmit}>
        <table className="title-table">
          <tr>
            <td><label>Title : </label></td>
            <td><input 
            type="text" 
            placeholder='Enter the problem Title' 
            onChange={e=>setTitle(e.target.value)}
            />
            </td>
          </tr>
          <tr>
            <td><label>Time Limit :</label></td>
            <td><input 
            type="text" 
            placeholder='Enter Time limit '
            onChange={e=>setTimelimit(e.target.value)}
            /></td>
          </tr>
          <tr>
            <td><label>CreatedBy :</label></td>
            <td>
            <input 
            type="text" 
            placeholder='User name'
            onChange={e=>setCreate(e.target.value)}
            />
            </td>
          </tr>
        </table>
        
        <div className="problem-details">
          <div className="statement">
            <div><label>Problem Statement :</label></div>
            <div><textarea 
            placeholder='Enter the problem statement' 
            className='quill'
            autoFocus={true}
            onChange={e=>setProblemstatement(e.target.value.replace(/\n/g, '<br>'))}
            /></div>
          </div>
          {/* <div className='problemstatement'>
          </div> */}
          <div className="statement">
            <div><label>Input Statement :</label></div>
            <div><textarea placeholder='Enter the Input statement' className='inputquill' onChange={e=>setInputstatement(e.target.value.replace(/\n/g, '<br>'))}/></div>
          </div>
          {/* <div className='input'>
          </div> */}
          
          {/* <div className='output'></div> */}
          <div className="statement">
            <div><label>Output Statement :</label></div>
            <div><textarea placeholder='Enter the Output statement' className='outputquill' onChange={e=>setOutputstatement(e.target.value.replace(/\n/g, '<br>'))}/></div>
          </div>
          <div className="statement">
            <div><label>Constraint :</label></div>
            <div><textarea placeholder='Enter the Constraint' className='sampleoutputquill' onChange={e=>setConstraint(e.target.value.replace(/\n/g, '<br>'))}/></div>
          </div>

          {/* <div className='sampleinput'></div> */}
          <div className="statement">
            <div><label>Sample Input :</label></div>
            <div><textarea placeholder='Enter the sample Input' className='samplequill' onChange={e=>setSampleinput(e.target.value.replace(/\n/g, '<br>'))}/></div>
          </div>
          {/* <div className='sampleoutput'></div> */}
          <div className="statement">
            <div><label>Sample Output :</label></div>
            <div><textarea placeholder='Enter the sample Output' className='sampleoutputquill' onChange={e=>setSampleoutput(e.target.value.replace(/\n/g, '<br>'))}/></div>
          </div>
          
        </div>
        <div className="">
        <button type="submit" class="btn btn-primary m-4" >Create Problem</button>
        </div>
       </form>
    </div>
    
  )
}

