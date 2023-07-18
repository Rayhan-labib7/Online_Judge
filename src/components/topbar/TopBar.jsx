import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css'

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => { 
    dispatch({ type: "LOGOUT" });
  }

  return (

    
    <div className='top'>
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link to='/' className='link'>Home</Link>
            </li>
            <li className="topListItem">
              <Link className='link' to='/problemset'>Problemset</Link>
            </li>
            <li className="topListItem">
              <Link className='link' to='/addproblem'>AddProblem</Link>
            </li>
            <li className='topListItem' onClick={handleLogout}>
              {user && "Logout"}
            </li>
          </ul>
        </div>
      </div>
      <div className="topRight">
        {
          user ? (
            <>
           
            <Link to='/settings'>
              <img
                className='topImg'
                src='https://avatars.githubusercontent.com/u/87138791?s=400&u=77bccc3ad7243e84395063b3d8872e29a86110bc&v=4'
                alt=''
              />
            </Link>
            <span className='topSearchIcon '>{user.username }</span>
            </>
          ) : (
            <ul className='topList'>
              <li className='topListItem'>
                <Link to='/login' className='link'>Login</Link>
              </li>
              <li className='topListItem'>
                <Link to='/register' className='link'>Register</Link>
              </li>

            </ul>
          )

        }
      </div>


    </div>
  )
}
