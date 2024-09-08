import React from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'
import logo from '../../assets/hmcLogoBlue.png'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

const Homepage = () => {
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
            <input placeholder='Enter Registration Number' />
            <button className='home-button'>View Status</button>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Homepage
