import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react';
import { Context } from '../../context/Context'
import './settings.css'
export default function Settings() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
   
  const [success, setSuccess] = useState(false);
  const {user,dispatch} = useContext(Context)
  const handleSubmit =async (e) =>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId:user._id,
      username,
      email,
      password,
    }
    try{
    const res = await  axios.put('/users/'+user._id,updatedUser);
    setSuccess(true);
    dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    }catch(err)
    {
       dispatch({type:"UPDATE_FAILURE"})
    }
   
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit }>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" 
          placeholder={user.username} 
          name="name" 
          onChange={e=>setUsername(e.target.value)}
          />
          <label>Email</label>
          <input type="email" 
          placeholder={user.email} 
          name="email" 
          onChange={e=>setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="password" 
          placeholder="Password" 
          name="password" 
          onChange={e=>setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      
    </div>
  )
}
