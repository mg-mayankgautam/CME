import React, { useState } from 'react'
import './Dashboard.css'
import AdminNav from '../Nav/AdminNav'

import './Dashboard.css'
// import Nav from '../Nav/Nav'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth';

import { Link } from 'react-router-dom';


const PresidentDash = () => {

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


    const [viewNewApprovalentry, setviewNewApprovalentry] = useState(false);

    const openFormData = () => {
        setviewNewApprovalentry(e => !e)

    }


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
                    <div className='dashMainHeading'>President Dashboard</div>

                    {/* {!viewNewApprovalentry?         */}
                    {showNewApprovals ?
                        <>
                            <div className='dashHeading'>New Approvals</div>

                            <div className='approvalsContainer'>

                                {Approvals && Approvals.length > 0 ?
                                    (Approvals
                                        .filter(item => item.approvals.president === false)
                                        .map((item, i) => (
                                            <div key={i} className='approval'>
                                                <div className='approvalContent'>
                                                    <div><strong>Organization Name:</strong> {item.organizationName}</div>
                                                    <div><strong>Theme:</strong> {item.theme}</div>
                                                    <div><strong>Dates:</strong> {item.cmeStartDate} to {item.cmeEndDate}</div>
                                                </div>

                                                <Link to={`/dashboard/president/${item._id}`} key={item._id}>
                                                    <button>
                                                        View
                                                    </button>
                                                </Link>

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
                                        .filter(item => item.approvals.president === true)
                                        .map((item, i) => (
                                            <div key={i} className='approval'>
                                                <div className='approvalContent'>
                                                    <div><strong>Organization Name:</strong> {item.organizationName}</div>
                                                    <div><strong>Theme:</strong> {item.theme}</div>
                                                    <div><strong>Dates:</strong> {item.cmeStartDate} to {item.cmeEndDate}</div>
                                                </div>

                                                <Link to={`/dashboard/president/${item._id}`} key={item._id}>
                                                    <button>
                                                        View
                                                    </button>
                                                </Link>

                                            </div>
                                        ))
                                    )
                                    :
                                    <div>No records available</div>
                                }

                            </div>
                        </>
                    }

                    {/* <div>
                        <button onClick={()=>{setviewNewApprovalentry(e=>!e)}}>back</button>
                    
                    </div>}  */}


                </div>
            </div>
        </div>
    )
}

export default PresidentDash