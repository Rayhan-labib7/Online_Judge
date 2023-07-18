import React, { useEffect, useState } from 'react'
import Problems from '../../components/problems/Problems'
import axios from 'axios'
export default function Problemset() {
  const [problems,setProblems] = useState([]);
  
   
  useEffect(()=>{
    const fetchProblem = async () =>{
      const res = await axios.get('/addproblem/problemset');
      setProblems(res.data);
    }
    fetchProblem();
  }) 
  
  return (
    <div>
        <Problems problems={problems}/>
    </div>
  )
}
