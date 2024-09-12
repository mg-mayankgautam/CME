import React, { useState } from 'react'
import './Dashboard.css'
// import Nav from '../Nav/Nav'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth';
import AdminNav from '../Nav/AdminNav'


const ClerkDash = () => {

    const [showNewApprovals, setShowNewApprovals] = useState(true)
    const [showPrevApprovals, setShowPrevApprovals] = useState(false)
    const [Approvals, setApprovals] = useState([])
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    // console.log(auth);

    useEffect(() => {
        console.log(auth);
        const token = auth.RawToken;
        const getformdata = async () => {

            try {
                const response = await axios.get('http://localhost:4700/getallforms', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })

                console.log(response.data)
                setApprovals(response.data)

            } catch (e) { console.log(e) }
        }


        getformdata();
    }, [])



    return (
        <div className=''>
            <AdminNav />

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
                    <div className='dashMainHeading'>Clerk Dashboard</div>
                    {showNewApprovals ?
                        <>
                            <div className='dashHeading'>New Approvals</div>

                            <div className='approvalsContainer'>

                                {Approvals && Approvals.length > 0 ?
                                    (Approvals
                                        .filter(item => item.approvals.clerk === false)
                                        .map((item, i) => (
                                            <div key={i} className='approval'>
                                                <div className='approvalContent'>
                                                    <div><strong>Organization Name:</strong> {item.organizationName}</div>
                                                    <div><strong>Theme:</strong> {item.theme}</div>
                                                    <div><strong>Dates:</strong> {item.cmeStartDate} to {item.cmeEndDate}</div>
                                                </div>
                                                <button>
                                                    Approve
                                                </button>
                                                <button>
                                                    View
                                                </button>
                                            </div>
                                        ))
                                    )
                                    :
                                    <div>No records available</div>
                                }

                            </div>

                        </>

                        :
                        <>
                            <div className='dashHeading'>Previous Approvals</div>

                            <div className='approvalsContainer'>

                                {Approvals && Approvals.length > 0 ?
                                    (Approvals
                                        .filter(item => item.approvals.clerk === true)
                                        .map((item, i) => (
                                            <div key={i} className='approval'>
                                                <div className='approvalContent'>
                                                    <div>{item.organizationName}</div>
                                                </div>
                                                <button>
                                                    Approve
                                                </button>
                                                <button>
                                                    View
                                                </button>
                                            </div>
                                        ))
                                    )
                                    :
                                    <div>No records available</div>
                                }

                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ClerkDash