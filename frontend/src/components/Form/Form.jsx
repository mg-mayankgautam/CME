import React, { useEffect } from 'react'
import './FormStyle.css'; // Ensure this CSS file is in the same directory
import logo from '../../assets/hmcLogo.png';
import { useState } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer'


const Form = () => {


  const [organizationName, setOrganizationName] = useState('');//regex lga
  const [orgNameError, setOrgNameError] = useState('');
  const [address, setAddress] = useState('');//regex lga
  const [addressError, setAddressError] = useState('');
  const [email, setEmail] = useState('');//regex lga
  const [emailError, setEmailError] = useState('');//regex
  const [theme, setTheme] = useState('');
  const [themeError, setThemeError] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [venue, setVenue] = useState('');//regex for 20 word input
  const [venueError, setVenueError] = useState('');
  const [cmeStartDate, setCmeStartDate] = useState('');
  const [cmeEndDate, setCmeEndDate] = useState('');
  const [daysDifference, setDaysDifference] = useState(0);
  const [faculty1, setFaculty1] = useState('');
  const [delegates, setDelegates] = useState('');//regex number only
  const [delegatesError, setDelegatesError] = useState('');
  const [scheduleFile, setScheduleFile] = useState(null);
  const [exercise, setExercise] = useState('');
  const [hours, setHours] = useState('');//regx number only
  const [hoursError, setHoursError] = useState('');
  const [chairman, setChairman] = useState('');
  const [secretary, setSecretary] = useState('');
  const [methodology, setMethodology] = useState('');
  const [permissionNumber, setPermissionNumber] = useState('');
  const [permissionDate, setPermissionDate] = useState('');
  const [registrationFiles, setRegistrationFiles] = useState(null);
  const [supportingFiles, setSupportingFiles] = useState(null);
  const [facultyDocuments, setFacultyDocuments] = useState(null);
  const [topicDocuments, setTopicDocuments] = useState(null);
  const [chairmanCertificate, setChairmanCertificate] = useState(null);
  const [secretaryCertificate, setSecretaryCertificate] = useState(null);
  const [isInternationalFaculty, setIsInternationalFaculty] = useState('');



  const [otpInput, setOtpInput] = useState('false')


  //below states are for checking file size limits
  const [fileSizechecker, setFilesizechecker] = useState(true)


  // Function to calculate the difference in days
  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = (end - start) / (1000 * 60 * 60 * 24);
    return (Number(difference) + 1);
  };

  // Handle date change and calculate difference
  const handleDateChange = (e, setter, isStartDate) => {
    const newDate = e.target.value;
    setter(newDate);
    if (isStartDate && cmeEndDate) {
      setDaysDifference(calculateDaysDifference(newDate, cmeEndDate));
    } else if (!isStartDate && cmeStartDate) {
      setDaysDifference(calculateDaysDifference(cmeStartDate, newDate));
    }
  };

  const handleOrganizationNameChange = (e) => {
    const value = e.target.value;
    console.log(value);
    const orgNameRegex = /^[a-zA-Z0-9\s,'.-]{1,50}$/; // Allows up to 50 characters

    if (value === '' || orgNameRegex.test(value)) {
      setOrganizationName(value);
      setOrgNameError('');
    } else {
      setOrgNameError('Invalid organization name');
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    const addressRegex = /^[a-zA-Z0-9\s,/.-]{1,50}$/; // Allows letters, numbers, spaces, commas, periods, and dashes

    if (value === '' || addressRegex.test(value)) {
      setAddress(value);
      setAddressError(''); // Clear error if address is valid
    } else {
      setAddressError('Invalid address. Only letters, numbers, spaces, commas, periods, and dashes are allowed.');
    }
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    const themeRegex = /^[a-zA-Z0-9\s,.]{1,20}$/;

    if (value === '' || themeRegex.test(value)) {
      setTheme(value);
      setThemeError(''); // Clear error if theme is valid
    } else {
      setThemeError('The theme must be up to 20 words.');
    }
  };

  const [isValid, setIsValid] = useState(true);

  const handleRegistrationNumChange = (e) => {
    const value = e.target.value;
    console.log(value);
    const RegNumRegex = /^[a-zA-Z0-9\s]{0,20}$/;

    if (RegNumRegex.test(value)) setRegistrationNumber(e => value)


  };

  //const [RegistrationNumberregex, setRegistrationNumberregex] = useState('')

  // useEffect(() => {

  //   const RegNumRegex = /^[a-zA-Z0-9\s]{0,20}$/;
  //   // if(registrationNumber==''){ setRegistrationNumberregex(registrationNumber)}
  //    if( RegNumRegex.test( registrationNumber)) setRegistrationNumberregex(registrationNumber)



  // }, [registrationNumber])




  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = e.target.value;

    // if(email.emailRegex.test(value)){
    setEmail(value);
    // setEmailError('');
    setIsValid(emailRegex.test(value));
    // }
    // else{
    //   setEmailError('Invalid Email Address');
    // }
  };

  const handleDelegatesChange = (e) => {
    const value = e.target.value;
    const numberRegex = /^\d+$/; // Allows only numbers

    if (value === '' || numberRegex.test(value)) {
      setDelegates(value);
      setDelegatesError(''); // Clear error if the input is valid
    } else {
      setDelegatesError('Please enter a valid number.');
    }
  };

  const handleHoursChange = (e) => {
    const value = e.target.value;
    const numberRegex = /^\d+$/; // Allows only numbers

    if (value === '' || numberRegex.test(value)) {
      setHours(value);
      setHoursError(''); // Clear error if the input is valid
    } else {
      setHoursError('Please enter a valid number.');
    }
  };

  const handleVenueChange = (e) => {
    const value = e.target.value;
    const venueRegex = /^[a-zA-Z0-9\s,/.-]{0,50}$/; // Allows letters, numbers, spaces, commas, periods, and dashes

    if (value === '' || venueRegex.test(value)) {
      setVenue(value);
      setVenueError(''); // Clear error if address is valid
    } else {
      setVenueError('Invalid address. Only letters, numbers, spaces, commas, periods, and dashes are allowed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('organizationName', organizationName);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('theme', theme);
    formData.append('registrationNumber', registrationNumber);
    formData.append('venue', venue);
    formData.append('cmeStartDate', cmeStartDate);
    formData.append('cmeEndDate', cmeEndDate);
    formData.append('daysDifference', daysDifference);
    formData.append('faculty1', faculty1);
    formData.append('delegates', delegates);

    formData.append('exercise', exercise);
    formData.append('hours', hours);
    formData.append('chairman', chairman);
    formData.append('secretary', secretary);
    formData.append('methodology', methodology);
    formData.append('internationalPermissionNumber', permissionNumber);
    formData.append('internationalPermissionDate', permissionDate);


    //  Registration Number of Association / Organization with evidence (attach documents)

    formData.append('Registration Number of Association / Organization with evidence', PDF1);


    //List of the Faculty with detailed qualification and experience.

    formData.append('List of the Faculty with detailed qualification and experience', PDF2);
    formData.append('Detailed programme schedule mentioning time, subject and the name of the Speaker', PDF3);
    formData.append('List of Topics', PDF4);
    formData.append('Medical Registration Certificate of the Organizing Chairman', PDF5);
    formData.append('Medical Registration Certificate of the Organizing Secretary', PDF6);
    formData.append('Any Other Supporting Documents', PDF7);



    console.log('Form Data Submitted:', formData);

    try {
      const formdata = await axios.post('http://localhost:4700/addformdata', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }


     
      )
      console.log(formdata)
      // if(formdata.data){setOtpInput(e=>!e)}



    }
    catch (e) { console.log(e) }

  };

  //below use states are for files

  const [PDF1, setPDF1] = useState('second')
  const [PDF2, setPDF2] = useState('second')
  const [PDF3, setPDF3] = useState('second')
  const [PDF4, setPDF4] = useState('second')
  const [PDF5, setPDF5] = useState('second')
  const [PDF6, setPDF6] = useState('second')
  const [PDF7, setPDF7] = useState('second')



  // Function to handle file change

  //not needed anymore


  // const handleFileChange = (e) => {
  //   const files = e.target.files[0];
  //   console.log(files.size
  //     // file size should be less than  3mb = 3000000 bytes
  //   )

  //   if (files.size > 3000000) {
  //     console.log('PDF too big')
  //   }

  //   else if (files.size < 30000) {

  //     setPDF1(e.target.files[0]);


  //   }


  // };

  return (

    <>

      <div className='formPage'>
        <div className='form-header'>
          <img src={logo} className='logo' />
          <div>CME Portal</div>
        </div>

        <div className='formPageContainer'>
          <div className='formSubHead'>
            Online Registration
          </div>

          {!otpInput?
            <div className="form-container">
            <form onSubmit={handleSubmit}>

              <div className="form-row">
                {/* allowed:- a-z,A-z,0-9, charachters allowed:-[,.-']   */}
                <label>Name of the Organization conducting CME / Workshop / Seminar / Conference / Training programme</label>
                <input
                  type="text"
                  // placeholder='Organization Name'
                  value={organizationName}
                  maxLength={50}
                  onChange={handleOrganizationNameChange}
                />
              </div>

              <div className='formWrap3'>

                <div className="form-row">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {!isValid && <span className='error'>Invalid email address</span>}
                </div>

                <div className="form-row">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                  />
                  {addressError && <span className="error">{addressError}</span>}
                </div>

                <div className="form-row">
                  {/* allowed:- a-z,A-z,0-9, charachters allowed:-[,.]   */}
                  <label>Theme</label>
                  <input
                    type="text"
                    value={theme}
                    onChange={handleThemeChange}
                  />
                  {themeError && <span className="error">{themeError}</span>}
                </div>
              </div>

              <div className='formWrap'>
                {/* <div className='formWrap'> */}
                <div className="form-row">
                  <label>Date of the CME / Workshop / Seminar / Conference / Training programme</label>

                  <div className='date_input_div'>
                    <div className='date_input_div_inner'>
                      <label>From</label>
                      <input
                        className='date_box'
                        type="date"
                        value={cmeStartDate}
                        onChange={(e) => handleDateChange(e, setCmeStartDate, true)}
                      />
                    </div>

                    <div className='date_input_div_inner'>
                      <label>To</label>
                      <input
                        className='date_box'
                        type="date"
                        value={cmeEndDate}
                        onChange={(e) => handleDateChange(e, setCmeEndDate, false)}
                      />
                    </div>
                  </div>
                  {cmeStartDate && cmeEndDate && daysDifference <= 0 ? 
                  <div className='error'>
                    To date can't be earlier than From date
                  </div>
                    : <div className='info'>Number of days: {daysDifference}</div>}
                </div>
                {/* </div> */}


                <div className="form-row">
                  <label>Registration Number of Association / Organization with evidence (attach documents)</label>
                  <div className='dual_column_input'>
                    <input
                      type="text"
                      value={registrationNumber}
                      // value={RegistrationNumberregex}

                      onChange={handleRegistrationNumChange}
                    // onChange={(e)=>{setRegistrationNumber(e.target.value)}}
                    />
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file.size < 3000000) {
                          setPDF1(file);
                        } else {
                          console.log('Size too big, select a smaller file');
                        }
                      }}
                      multiple
                      className="file-input inputFile"
                    />
                  </div>
                </div>

              </div>


              <div className='formWrap3' style={{ margin: '20px 0 0px' }}>
                {/* <div className='formWrap'> */}
                <div className="form-row">

                  <label>Venue of the CME / Workshop / Seminar / Conference / Training programme</label>
                  <input
                    type="text" placeholder='Venue'
                    value={venue}
                    onChange={handleVenueChange}
                  />
                  {venueError && <span className="error">{venueError}</span>}


                </div>

                <div className="form-row">
                  <label>Expected number of attending delegates</label>
                  <input
                    type="number"
                    value={delegates}
                    onChange={handleDelegatesChange}
                  />
                  {delegatesError && <span className="error">{delegatesError}</span>}
                </div>





                {/* </div> */}
                <div className="form-row">
                  <label>Expected No. of Hours</label>
                  <input
                    type="number"
                    value={hours}
                    onChange={handleHoursChange}
                  />
                  {hoursError && <span className="error">{hoursError}</span>}

                </div>
                
              </div>


              <div className='formWrap'>

                <div className="form-row">
                  <label>List of the Faculty with detailed qualification and experience.</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.size < 3000000) {
                        setPDF2(file);
                      } else {
                        console.log('Size too big, select a smaller file');
                      }
                    }}
                    multiple
                    className="file-input inputFile"
                  />
                </div>



                <div className="form-row">

                  <label>List of Topics</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.size < 3000000) {
                        setPDF4(file);
                      } else {
                        console.log('Size too big, select a smaller file');
                      }
                    }}
                    multiple
                    className="file-input"
                  />
                </div>





              </div>

              {/* <div className='formWrap'> */}
              <div className='formWrap'>
                <div className="form-row">
                  <label>Exercises to be covered in the CME / Workshop / Seminar / Training Programme</label>
                  <input
                    type="text"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <label>Detailed programme schedule mentioning time, subject and the name of the Speaker</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.size < 3000000) {
                        setPDF3(file);
                      } else {
                        console.log('Size too big, select a smaller file');
                      }
                    }}
                    multiple
                    className="file-input"
                  />
                </div>
                
              </div>
              {/* </div> */}


              <div className='formWrap'>
                <div className="form-row">
                  <label>Name of the Organizing Chairman</label>
                  <input
                    type="text"
                    value={chairman}
                    onChange={(e) => setChairman(e.target.value)}
                  />
                </div>
                <div className='form-row'>
                  <label>Medical Registration Certificate of the Organizing Chairman</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.size < 3000000) {
                        setPDF5(file);
                      } else {
                        console.log('Size too big, select a smaller file');
                      }
                    }}
                    multiple
                    className="file-input"
                  />
                </div>

                {/*  */}
                <div className="form-row">
                  <label>Name of the Organizing Secretary</label>
                  <input
                    type="text"
                    value={secretary}
                    onChange={(e) => setSecretary(e.target.value)}
                  />
                </div>

                <div className='form-row'>
                  <label>Medical Registration Certificate of the Organizing Secretary</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.size < 3000000) {
                        setPDF6(file);
                      } else {
                        console.log('Size too big, select a smaller file');
                      }
                    }}
                    multiple
                    className="file-input"
                  />

                </div>
              </div>


              <div className="form-row">
                <label>Methodology to be adopted by the Organization viz. Lecture / Workshop / Hands On Training / Discussion / Audio- Visual Presentation etc.</label>
                <textarea
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                />
              </div>

              <div className='form-row'>
                <label>Is there any International Faculty Involved?</label>
                <div className='form-flex'>
                  <input
                    type="radio"
                    name='isInternationalFaculty'
                    id='yes'
                    value="Yes"
                    checked={isInternationalFaculty === 'Yes'}
                    onChange={(e) => setIsInternationalFaculty(e.target.value)}
                  />
                  <label htmlFor="yes" className='cursor-pointer'>Yes</label>

                  <input
                    type="radio"
                    name='isInternationalFaculty'
                    id='no'
                    value="No"
                    checked={isInternationalFaculty === 'No'}
                    onChange={(e) => setIsInternationalFaculty(e.target.value)}
                  />
                  <label htmlFor="no" className='cursor-pointer'>No</label>
                </div>
              </div>

              {isInternationalFaculty === 'Yes' && (
                <div className='formWrap'>
                  <div className="form-row">
                    <label>Prior Permission of MCI in case of Foreign faculties (if applicable)</label>
                    <input
                      type="text"
                      value={permissionNumber}
                      onChange={(e) => setPermissionNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Permission Date</label>
                    <input
                      type="date"
                      value={permissionDate}
                      onChange={(e) => setPermissionDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-row">
                <label>If Any Other Supporting Documents</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file.size < 3000000) {
                      setPDF7(file);
                    } else {
                      console.log('Size too big, select a smaller file');
                    }
                  }}
                  multiple
                  className="file-input"
                />
              </div>

              <button type="submit"
                className="submit-button"
              // onClick={handleSubmit}
              >Submit</button>
            </form>
            </div>
            :<div>
              OTP SENT TO EMAIL ID
              <input type="number" />
                enter OTP
                <button 
                // onClick={}
                >Submit OTP and Proceed To payment</button>
              </div>
              
            }
        </div>

      </div >

      <Footer />
    </>
  )
}

export default Form
