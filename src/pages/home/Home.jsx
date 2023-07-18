import React from 'react'
import './home.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import home1 from './home(1).jpg'
import home2 from './home(2).jpg'
import home3 from './home(3).jpg'
export default function Home() {


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('/userinfo', { handles: handles });
  //     setUserInfo(response.data.result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (


    <div className='home'>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="card card-margin">
              <div class="card card-header no-border">
                <h5 class="card-title">Welcome!</h5>
              </div>

              <div class="card-body pt-1">
                <img className='img1' src={home1} alt='' />
                <p>Welcome to the new OJ website. This new
                  version contains a new faster judge
                  and modern UI.As this time we have completely
                  written the site from scratch, there can be
                  a few bugs. Also, it is a great opportunity
                  to add new features. Feel free to raise
                  issues on our Github tracking repository.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card card-margin">
              <div class="card card-header no-border">
                <h5 class="card-title">Upcoming Contest</h5>
              </div>

              <div class="card-body pt-2">
                <img className='img2' src={home2} alt='' />
                <p>
                  It's a <b>Educational Contest NO: 01</b>
                  <br />
                  This contest arranged <b>Comilla University : CSE Dept.</b>
                  You will be given 6 problems and 2 hours and 15 minutes to solve them.
                  <br />
                  <b>Contest Date : 03-02-2022</b>
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card card-margin">
              <div class="card card-header no-border">
                <h5 class="card-title">User Data</h5>
              </div>

              <div class="card-body pt-2">
                <img className='img3' src={home3} alt='' />
                <p className='UserData'>

                  <span>Solved Problem : 22 </span>
                  <br />

                  <span>Total Submission : 72</span>
                  <br />
                  Currrent Rating : 1450
                  <br />
                  Max Rating : 1665
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    // <div>

      // <form onSubmit={handleSubmit}>
      //   <label>
      //     Handles:
      //     <input type="text" value={handles} onChange={(event) => setHandles(event.target.value)} />
      //   </label>
      //   <button type="submit">Submit</button>
      // </form>
    //   {userInfo && (
    //     <div>
    //       <h1>User Information</h1>
    //       <ul>
    //         {userInfo.map((user) => (
    //           <li key={user.handle}>
    //             <strong>{user.handle}</strong>
    //             <ul>
    //               <li>Name: {user.firstName} {user.lastName}</li>
    //               <li>Rank: {user.rank}</li>
    //               <li>Max Rating: {user.maxRating}</li>
    //               <li>Current Rating: {user.rating}</li>
    //             </ul>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
  )
}
