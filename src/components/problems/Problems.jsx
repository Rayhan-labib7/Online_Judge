import React from 'react'
// import Problem from '../problem/Problem'
import Problem from '../../components/problem/Problem'
export default function Problems({problems}) {
  return (
    <>
      <div className="container mt-5 px-2">
        <div className="table-responsive">
          <table className="table table-responsive table-borderless">
            <thead>
              <tr className="bg-light">
                <th scope="col" width="5%">Id</th>
                <th scope="col" width="10%">Date</th>
                <th scope="col" width="20%" >Probelem Name</th>
                <th scope="col" width="10%">Problem Setter</th>
              </tr>
            </thead>

            <tbody>
              {problems.map(p=>( 
                <Problem problem={p}/>
              ))}
              
             

            </tbody>
          </table>

        </div>

      </div>

    </>
  )
}
