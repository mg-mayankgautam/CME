import React, { useState } from 'react'
import './Dashboard.css'
// import Nav from '../Nav/Nav'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth';
import AdminNav from '../Nav/AdminNav'
import { Link, useParams } from 'react-router-dom';

const RegistrarApprovalPage = () => {
    //this page is used for form approvals
    const [showNewApprovals, setShowNewApprovals] = useState(true)
    const [showPrevApprovals, setShowPrevApprovals] = useState(false)
    const [Approvals, setApprovals] = useState([])
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const [formData, setformData] = useState({})
    const [token, settoken] = useState()
    // console.log(auth);

    const { _id } = useParams()
    // var token='';

    useEffect(() => {
        console.log(auth);
        const tokendata = auth.RawToken;

        settoken(e => e = tokendata)



        const getformdata = async () => {



            try {

                const response = await axios.get(`http://localhost:4700/getformdata?id=${_id}`, {
                    headers: {
                        'Authorization': `Bearer ${tokendata}`,
                        'Accept': 'application/json'
                    }
                })
                console.log(response.data)
                const fd = response.data;
                // console.log(fd[0].chairman)
                setformData(e => fd[0])
                console.log(formData)
                // setApprovals(response.data)

            } catch (e) { console.log(e) }
        }



        getformdata();
    }, [])


    const [viewNewApprovalentry, setviewNewApprovalentry] = useState(false);

    const openFormData = () => {
        setviewNewApprovalentry(e => !e)

    }

    const approveCME = async (e) => {

        console.log(token);
        // console.log(e.target.id);

        try {
            const response = await axios.post(
                `http://localhost:4700/Registrarapproval`,
                { _id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Replace with your actual token

                    }
                }
            );
            // console.log(response.data)
            // const fd = response.data;
            // // console.log(fd[0].chairman)
            // setformData(e => fd[0])
            // console.log(formData)
            // setApprovals(response.data)

        } catch (e) { console.log(e) }
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
                    <div className='dashMainHeading'>Registrar Dashboard</div>

                    <div className='dashHeadingFlex'>
                        <div className='dashHeading'>FORM DATA</div>
                        <Link to='/dashboard' className='backBtn'>
                            Back to All Records
                        </Link>
                    </div>

                    <div className='formDataDiv'>

                        <div className='formDatagrid'>
                            <div><strong>Organization Name: </strong>{formData?.organizationName}</div>
                            <div><strong>Email: </strong>{formData?.email}</div>
                            <div><strong>Address: </strong>{formData?.address}</div>
                            <div><strong>Theme: </strong>{formData?.theme}</div>
                            <div><strong>Registration Number: </strong>{formData?.registrationNumber}</div>
                            <div><strong>CME Start Date: </strong>{formData?.cmeStartDate}</div>
                            <div><strong>CME End Date: </strong>{formData?.cmeEndDate}</div>
                            <div><strong>No of Days: </strong>{formData?.daysDifference}</div>
                            <div><strong>Faculty 1: </strong>{formData?.faculty1}</div>
                            <div><strong>No of Delegates: </strong>{formData?.delegates}</div>
                            <div><strong>No of Exercise: </strong>{formData?.exercise}</div>
                            <div><strong>No of Hours: </strong>{formData?.hours}</div>
                            <div><strong>Chairman: </strong>{formData?.chairman}</div>
                            <div><strong>Secretary: </strong>{formData?.secretary}</div>
                            <div><strong>Methodology: </strong>{formData?.methodology}</div>
                            <div><strong>Permission Number: </strong>{formData?.permissionNumber}</div>
                            <div><strong>Permission Date: </strong>{formData?.permissionDate}</div>
                        </div>

                        <div className='pdfHead'>
                            Submitted Documents:
                        </div>


                        {formData?.pdfURL?.map((item) => (

                            <div className='viewPDFflex'>
                                <div>{item.PDF_Label}</div>
                                <a href={`${item.url}`} target="_blank">
                                    <button

                                    >
                                        View
                                    </button>
                                </a>

                            </div>


                        ))}


                        <div className='pdfHead'>
                            Approval Status:
                        </div>
                        <div>
                            <div className='StatusGrid'>
                                <strong>Accountant:</strong> {formData?.approvals?.accountant ?
                                    <span className='approvedLabel'>approved</span>
                                    : <span className='rejectedLabel'>not yet approved</span>}
                            </div>

                            <div className='StatusGrid'>
                                <strong>Clerk:</strong> {formData?.approvals?.clerk ?
                                    <span className='approvedLabel'>approved</span>
                                    : <span className='rejectedLabel'>not yet approved</span>}
                            </div>

                            <div className='StatusGrid'>
                                <strong>Registrar:</strong> {formData?.approvals?.registrar ?
                                    <span className='approvedLabel'>approved</span>
                                    : <span className='rejectedLabel'>not yet approved</span>}
                            </div>

                            <div className='StatusGrid'>
                                <strong>President:</strong> {formData?.approvals?.president ?
                                    <span className='approvedLabel'>approved</span>
                                    : <span className='rejectedLabel'>not yet approved</span>}
                            </div>
                        </div>


                        <button
                            onClick={() => { approveCME() }} className='approveBtn' style={{ marginTop: '24px' }}
                        >
                            Approve CME
                        </button>


                    </div>



                </div>
            </div>
        </div>
    )
}

export default RegistrarApprovalPage