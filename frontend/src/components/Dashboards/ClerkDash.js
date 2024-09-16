import React, { useState } from 'react'
import './Dashboard.css'
// import Nav from '../Nav/Nav'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth';
import AdminNav from '../Nav/AdminNav'
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const ClerkDash = () => {

    const [showNewApprovals, setShowNewApprovals] = useState(true)
    const [showPrevApprovals, setShowPrevApprovals] = useState(false)
    const [showCertificate, setShowCertificate] = useState(false)
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



    const generateCertificate = async (_id) => {

        const doctorName = "Dr. Pankaj Mutneja";
        const conferenceDate = "08th September 2024";
        const location = "BPS Govt. Medical College, Khanpur Kalan, Sonepat";
        const honorarium = "₹5000/- per day";
        const taRate = "₹20 Rs. Per KM";

        const doc = new jsPDF();

        // Title and Header
        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text("HARYANA MEDICAL COUNCIL", 20, 20);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text("SCO-410, 2nd floor, Sector - 20, Panchkula, Haryana - 134116", 20, 28);
        doc.text("Email - registrarhmc@gmail.com, Office - 0172 - 2520165", 20, 34);

        // Line break
        doc.line(20, 40, 190, 40); // Horizontal line

        // Subject section
        doc.setFontSize(12);
        doc.setFont('times', 'bold');
        doc.text("HMC/2024/", 20, 50);
        doc.text("Dated:", 150, 50);

        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text("To,", 20, 60);
        doc.text("Dr. Atul Khandelwal,", 20, 66);
        doc.text("Organizing Secretary,", 20, 72);

        // Subject content
        doc.setFont('times', 'bold');
        doc.text("Subject:", 20, 82);
        doc.setFont('times', 'normal');
        doc.text(`Regarding Grant of Credit Hour's for the Conference/CME to be held on`, 40, 82);
        doc.text(`${conferenceDate} at ${location}.`, 20, 88);

        // Main Body
        doc.setFontSize(11);
        doc.setFont('times', 'normal');
        doc.text(
            `With reference to your application cited above, it is to inform you that the Haryana Medical Council has considered your proposal and grant to award 04 Credit Hour(s) for the CME/ Workshop/ Conference/ Seminar/ Training for "PMJAY & UROLOGY" to be held on ${conferenceDate} at ${location}.`,
            20,
            98,
            { maxWidth: 170 }
        );
        
        // Observer details
        doc.text(
            `The Haryana Medical Council appoints ${doctorName}, Vice-President HMC as the Observer.`,
            20,
            120,
            { maxWidth: 170 }
        );

        doc.setFontSize(11);
        doc.setFont('times', 'bold');
        doc.text(
            `"The Observer shall be provided a place on the Dias during the inauguration and his / her Honorarium (Rs. 5000/- per day), T.A. (Rs. 20  Per KM for own vehicle or as per actual taxi bill) & Accommodation shall be met by your organization/association. Observer shall be one of the signatories of the CME/Workshop Conference/Seminar/Training Certificate. However, the accreditation granted shall be liable to be terminated at any time, if the information furnished by the association/organization is found false or the Haryana Medical Council Appointed Observer finds any discrepancy or violation of guidelines. The association/organization could be debarred from future accreditation in such a case."`,
            20,
            124,
            { maxWidth: 170 }
        );

        // Final Note
        doc.setFontSize(11);
        doc.setFont('times', 'normal');
        doc.text(
            `The Organizer shall submit the CME Observer Feedback Form (Annexure-III) to the undersigned immediately after completion of the programme along with the names of all delegates & faculties/Speakers with their MCI/State Medical Council Registration Number, telephone number, address and subjects covered by Faculties/Speakers with duration for the record of this office which is mandatory.`,
            20,
            166,
            { maxWidth: 170 }
        );
        

        // Footer
        doc.text("With Regards,", 20, 191);
        doc.text("Registrar,", 20, 197);
        doc.text("Haryana Medical Council", 20, 203);

        doc.text("HMC/2024/", 20, 216);
        doc.text("Dated:", 150, 216);

        // Forwarding message
        doc.text(
            `Copy is forwarded to ${doctorName}, Vice-President HMC for information & further necessary action please. (MOBILE - 9812030191)`,
            20,
            226,
            { maxWidth: 170 }
        );

        // Save PDF
        doc.save(`certificate.pdf`);
    }



    return (
        <div className=''>
            <AdminNav />

            <div className='Dashboard'>
                <div className='sideBar'>
                    <div className={showNewApprovals ? 'selected sidebarItem' : 'sidebarItem'}
                        onClick={() => { setShowCertificate(false); setShowNewApprovals(true); setShowPrevApprovals(false) }}>
                        New Approvals
                    </div>
                    <div className={showPrevApprovals ? 'selected sidebarItem' : 'sidebarItem'}
                        onClick={() => { setShowCertificate(false); setShowPrevApprovals(true); setShowNewApprovals(false) }}>
                        Previous Approvals
                    </div>
                    <div className={showCertificate ? 'selected sidebarItem' : 'sidebarItem'}
                        onClick={() => { setShowCertificate(true); setShowNewApprovals(false); setShowPrevApprovals(false); }}>
                        Certificate Generation
                    </div>
                </div>

                <div className='mainBar'>
                    <div className='dashMainHeading'>Clerk Dashboard</div>

                    {/* {!viewNewApprovalentry?         */}
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

                                                <Link to={`/dashboard/clerk/${item._id}`} key={item._id}>
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
                        null
                    }

                    {showPrevApprovals ?
                        <>
                            <div className='dashHeading'>Previous Approvals</div>

                            <div className='approvalsContainer'>

                                {Approvals && Approvals.length > 0 ?
                                    (Approvals
                                        .filter(item => item.approvals.clerk === true)
                                        .map((item, i) => (
                                            <div key={i} className='approval'>
                                                <div className='approvalContent'>
                                                    <div><strong>Organization Name:</strong> {item.organizationName}</div>
                                                    <div><strong>Theme:</strong> {item.theme}</div>
                                                    <div><strong>Dates:</strong> {item.cmeStartDate} to {item.cmeEndDate}</div>
                                                </div>

                                                <Link to={`/dashboard/clerk/${item._id}`} key={item._id}>
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
                        : null
                    }

                    {showCertificate ?
                        <>
                            <div className='dashHeading'>Pending Certificates</div>

                            <div className='approvalsContainer'>

                                {Approvals && Approvals.length > 0 ?
                                    (Approvals
                                        .filter(item => item.approvals.clerk === true && item.approvals.registrar === true && item.approvals.accountant === true && item.approvals.president === true)
                                        .map((item, i) => (
                                            <div key={i} className='approval'>
                                                <div className='approvalContent'>
                                                    <div><strong>Organization Name:</strong> {item.organizationName}</div>
                                                    <div><strong>Theme:</strong> {item.theme}</div>
                                                    <div><strong>Dates:</strong> {item.cmeStartDate} to {item.cmeEndDate}</div>
                                                </div>

                                                {/* <Link to={`/dashboard/clerk/${item._id}`} key={item._id}> */}
                                                <button onClick={() => generateCertificate(item._id)} className='approveBtn'>
                                                    Generate Certificate
                                                </button>
                                                {/* </Link> */}

                                            </div>
                                        ))
                                    )
                                    :
                                    <div>No records available</div>
                                }

                            </div>
                        </>
                        : null
                    }

                    {/* <div>
                        <button onClick={()=>{setviewNewApprovalentry(e=>!e)}}>back</button>
                    
                    </div>}  */}


                </div>
            </div>
        </div>
    )
}

export default ClerkDash