import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

const Nav = () => {

    return (

        <div className='Nav'>

            <div className='navMain'>
                CME PORTAL
            </div>

            <div className='navItems'>
                <Link to={'/dashboard'}>
                    <div className='navItem'>Dashboard</div>
                </Link>

                <Link to={'/Form'}>
                    <div className='navItem'>New Registration</div>
                </Link>
            </div>
        </div>
    )
}

export default Nav