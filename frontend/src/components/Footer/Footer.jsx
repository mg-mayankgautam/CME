import React from 'react'
import logo from '../../assets/hmcLogo.png';
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <div className='Footer'>
            <div className='footerContent'>

                <div className='footerLeft'>
                    <div className='footerlogo'>
                        <img src={logo} />
                    </div>
                    <div className='footerAddress'>
                        <strong>Address: </strong><br />Haryana Medical Council<br /> SCO-410 2nd Floor, Sector-20 <br />Panchkula-134116
                    </div>
                </div>

                <div className='footerRight'>
                    <div className='footerMenu'>
                        <Link to='/Form'>New Registration</Link>
                        <Link to='/dashboard'>Dashboard</Link>
                    </div>

                    <div className='footerInfoFlex'>
                        <div className='footerInfo'>
                            <div>
                                <div className='footerInfoLarge'>
                                    Working Days
                                </div>
                                <div>Monday to Friday</div>
                            </div>
                            <div>
                                <div className='footerInfoBold'>Office Hours</div>
                                <div>9.00 AM to 5.00 PM</div>
                            </div>
                        </div>
                        <div className='footerInfo'>
                            <div>
                                <div className='footerInfoLarge'>
                                    Public Dealing Hours
                                </div>
                                <div>9.30 AM to 4.30 PM</div>
                            </div>
                            <div>
                                <div className='footerInfoBold'>Lunch Break</div>
                                <div>1.30 PM to 2.00 PM</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className='footerCopyright'>

            </div>
        </div>
    )
}

export default Footer