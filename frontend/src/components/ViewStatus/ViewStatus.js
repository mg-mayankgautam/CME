import React from 'react'
import './ViewStatus.css'
import logo from '../../assets/hmcLogoBlue.png'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

const ViewStatus = () => {
    return (

        <>

            <Nav />

            {/* <div className='form-header home'>
                <img src={logo} className='logo home' />
                <div>Haryana Medical Council</div>
            </div> */}

            <div className='ViewStatusPage'>
                <div className='ViewStatus'>
                    <div className='dashHeading'>
                        Your Registration Status
                    </div>

                    <div style={{ marginTop: '24px' }}>
                        <strong>Documents Approval: </strong>
                        Pending
                    </div>
                    <div>
                        <strong>Payment Approval: </strong>
                        Pending
                    </div>
                    <div>
                        <strong>Final Approval: </strong>
                        Pending
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ViewStatus