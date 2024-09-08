import React, { useState } from 'react'
import './Dashboard.css'
import Nav from '../Nav/Nav'


const RegistrarDash = () => {

    const [showNewApprovals, setShowNewApprovals] = useState(true)
    const [showPrevApprovals, setShowPrevApprovals] = useState(false)

    return (
        <div className=''>
            <Nav />

            <div className='Dashboard'>
                <div className='sideBar'>
                    <div className={showNewApprovals ? 'selected sidebarItem' : 'sidebarItem'}
                        onClick={() => { setShowNewApprovals(true); setShowPrevApprovals(false) }}>
                        New Approvals
                    </div>
                    <div className={showPrevApprovals ? 'selected sidebarItem' : 'sidebarItem'}
                        onClick={() => { setShowPrevApprovals(true); setShowNewApprovals(false) }}>
                        Previous Approvals
                    </div>
                </div>

                <div className='mainBar'>
                    <div className='dashMainHeading'>Registrar Dashboard</div>
                    {
                        showNewApprovals ?
                            <>
                                <div className='dashHeading'>New Approvals</div>

                                <div className='approvalsContainer'>
                                    <div className='approval'>
                                        <div className='approvalContent'>Approval 1</div>
                                        <button>
                                            Approve
                                        </button>
                                        <button>
                                            View
                                        </button>
                                    </div>

                                    <div className='approval'>
                                        <div className='approvalContent'>Approval 1</div>
                                        <button>
                                            Approve
                                        </button>
                                        <button>
                                            View
                                        </button>
                                    </div>

                                    <div className='approval'>
                                        <div className='approvalContent'>Approval 1</div>
                                        <button>
                                            Approve
                                        </button>
                                        <button>
                                            View
                                        </button>
                                    </div>
                                    
                                </div>

                            </>

                            :
                            <>
                                <div className='dashHeading'>Previous Approvals</div>

                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default RegistrarDash