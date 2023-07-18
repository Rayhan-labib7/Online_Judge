import React, {} from 'react'
import './problem.css'
import {Link} from 'react-router-dom'


export default function Problem({problem}) {
  
  return (
      

    <tr>
      <td>{problem._id}</td>
      
      <td>
      <i class="fa-solid fa-calendar-days"></i>
        {new Date(problem.createdAt).toDateString()}
        </td>
      <Link className='link' to={`/problem/${problem._id}`}>
         <i class="fa-solid fa-bolt"></i>
          <td ><span  className=" ms-1">{problem.title}</span></td>
      </Link>
      <td>
      <Link className='link' to={'/settings'}>
        <div>
          
        </div>
            <i class="fa-solid fa-user" ></i>
            <td>{problem.createdby}</td>
      </Link>  
      </td>
      
     
    </tr>
    
 
  )
}
