import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Homepage.css'
import logo from '../../assets/hmcLogoBlue.png'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

const Homepage = () => {

  const [registrationNumber, setRegistrationNumber] = useState();
  const navigate = useNavigate();

  const viewStatus= ()=>{
    // if(registrationNumber){
      navigate('/viewregistrationstatus')
    // }
  }

  return (

    <>

      <Nav />

      <div className='form-header home'>
        <img src={logo} className='logo home' />
        <div>Haryana Medical Council</div>
      </div>

      <div className='Homepage'>

        <div className='viewStatusDiv'>
          <div className='viewStatusHead'>
            View Your CME Registration Status
          </div>

          <div className='viewStatusFlex'>
            <input placeholder='Enter Registration Number' 
              type='number'
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
              value={registrationNumber}
            />
            <button className='home-button' onClick={()=> viewStatus()}>
              View Status
            </button>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Homepage
