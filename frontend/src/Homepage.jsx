import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>

      
        <input placeholder='enter registration number'></input>
        <button>view status</button>
        <br />
        <br />
      <Link to={'/Form'}><button>new registration</button></Link>  
    </div>
  )
}

export default Homepage
