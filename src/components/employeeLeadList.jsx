import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardDataStats from './CardDataStats';
import Header from './header';
import url from './url';

import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
axios.defaults.withCredentials = true

const API_BASE_URL = url;

const EmployeeLeadList = () => {
  const [leads, setLeads] = useState([]);
  const [records, setRecords] = useState([]);
  const [employeeLeads, setEmployeeLeads] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [team, setTeam] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate()

  const [leadSection, setLeadSection] = useState(true)
  const [closeSection, setCloseSection] = useState(false)
  const [followUpSection, setFollowUpSection] = useState(false)
  const [noUpdateSection, setNoUpdateSection] = useState(false)
  const [didNotAnswerSection, setDidNotAnsswerSection] = useState(false)
  const [meetingDoneSection, setMeetingDoneSection] = useState(false)

  const leadfn = () => {
    setLeadSection(true)
    setCloseSection(false)
    setFollowUpSection(false)
    setNoUpdateSection(false)
    setDidNotAnsswerSection(false)
    setMeetingDoneSection(false)
  }

  const closefn = () => {
    setLeadSection(false)
    setCloseSection(true)
    setFollowUpSection(false)
    setNoUpdateSection(false)
    setDidNotAnsswerSection(false)
    setMeetingDoneSection(false)
  }

  const followUpfn = () => {
    setLeadSection(false)
    setCloseSection(false)
    setFollowUpSection(true)
    setNoUpdateSection(false)
    setDidNotAnsswerSection(false)
    setMeetingDoneSection(false)
  }

  const noUpdatefn = () => {
    setLeadSection(false)
    setCloseSection(false)
    setFollowUpSection(false)
    setNoUpdateSection(true)
    setDidNotAnsswerSection(false)
    setMeetingDoneSection(false)
  }

  const didNotAnswerfn = () => {
    setLeadSection(false)
    setCloseSection(false)
    setFollowUpSection(false)
    setNoUpdateSection(false)
    setDidNotAnsswerSection(true)
    setMeetingDoneSection(false)
  }

  const meetingDonefn = () => {
    setLeadSection(false)
    setCloseSection(false)
    setFollowUpSection(false)
    setNoUpdateSection(false)
    setDidNotAnsswerSection(false)
    setMeetingDoneSection(true)
  }

  useEffect(() => {
    if (id) {
      fetchLeads(id);
      fetchEmployee(id);
      fetchTeamMember(id);

    }
    // const Token = Cookies.get('accessToken');
    // if (!Token) {
    //   navigate('/')
    // }
  }, [id]);

  const fetchLeads = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/leadsadmin/${id}`);
    setLeads(res.data);
    setRecords(res.data);
  };

  const fetchEmployee = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/employee/${id}`);
    setEmployee(res.data);
    console.log(res.data)
  };

  const fetchTeamMember = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/leaderPannel/${id}`);
    console.log("Team Member Data:", res.data);
    setTeam(res.data);
    console.log(res.data)
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  const closeLead = leads.filter(({ status }) => status == "Close");
  const inFollowUpLead = leads.filter(({ status }) => status == "In Follow Up");
  const noUpdateLead = leads.filter(({ status }) => status == "No Update");
  const didNotAnswerLead = leads.filter(({ status }) => status == "Did Not Answer");
  const meetingDoneLead = leads.filter(({ status }) => status == "Meeting Done");

  function nameFilter(data) {
    const deep = data.target.value
    setRecords(leads.filter((lead) => {
      return deep.toLowerCase() === ''
        ? lead
        : lead.name.toLowerCase().includes(data.target.value);
    }))
  }

  function numberFilter(data) {
    const deep = data.target.value
    setRecords(leads.filter((lead) => {
      return deep.toLowerCase() === ''
        ? lead
        : lead.phone.toLowerCase().includes(data.target.value);
    }))
  }

  function statusFilter(data) {
    const deep = data.target.value
    setRecords(leads.filter((lead) => {
      return deep === ''
        ? lead
        : lead.status.includes(data.target.value);
    }))
  }

  // function lastUpdateFilter(data) {
  //   console.log(data);
  //   const deep = data.target.value
  //   setRecords(leads.filter((lead) => {
  //     return deep.toLowerCase() === ''
  //       ? lead
  //       : lead.lastStatusUpdate.toLowerCase().includes(data.target.value);
  //   }))
  // }


  return (
    <>
      <Header />

      <div className='min-h-screen bg-gradient-to-tr from-blue-100 via-white to-green-100 pt-2'>
        <section className="mx-auto w-full max-w-7xl px-4 py-4 md:mt-3">
          <div className="flex flex-col space-y-4 md:flex-row items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold">Lead Details</h2>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Hi {employee.name}</h2>
            </div>

            {team.length === 0 ? (
              <div></div>
            ) : (
              <div>
                <Link
                  type="button" to={`/leaderPannel/${employee._id}`}
                  className="rounded-md bg-gray-500 px-10 py-2 font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Leader Panel
                </Link>
              </div>
            )}

          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-4 max-w-7xl mx-auto pt-7 px-5">
            <button onClick={leadfn} className='bg-gradient-to-r from-white to-blue-400 rounded-xl'>
              <CardDataStats title="Total Leads" total={leads.length}>
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                    fill=""
                  />
                  <path
                    d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </button>

            <button onClick={closefn} className='bg-gradient-to-r from-white test rounded-xl'>
              <CardDataStats title="Leads Closed" total={closeLead.length} >
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                    fill=""
                  />
                  <path
                    d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </button>

            <button onClick={meetingDonefn} className='bg-gradient-to-r from-white to-yellow-400 rounded-xl'>
              <CardDataStats title="Meeting Done" total={meetingDoneLead.length} >
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                    fill=""
                  />
                  <path
                    d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </button>

            <button onClick={didNotAnswerfn} className='bg-gradient-to-r from-white to-red-400 rounded-xl'>
              <CardDataStats title="Did Not Answer" total={didNotAnswerLead.length} >
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                    fill=""
                  />
                  <path
                    d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </button>

            <button onClick={followUpfn} className='bg-gradient-to-r from-white to-purple-400 rounded-xl'>
              <CardDataStats title="In Follow Up" total={inFollowUpLead.length}>
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                    fill=""
                  />
                  <path
                    d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </button>

            <button onClick={noUpdatefn} className='bg-gradient-to-r from-white to-gray-400 rounded-xl'>
              <CardDataStats title="No Update" total={noUpdateLead.length}>
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                    fill=""
                  />
                  <path
                    d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                    fill=""
                  />
                  <path
                    d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </button>
          </div>

          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal"
                        >
                          <span>S. NO.</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal"
                        >
                          <span>Client Name</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal"
                        >
                          <span>Phone no.</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal"
                        >
                          <span>Date of Assign</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal"
                        >
                          Last Status Update
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal max-w-40"
                        >
                          Remark
                        </th>

                        <th
                          scope="col"
                          className="px-x py-3.5 text-sm font-normal"
                        >
                          Manage Leads
                        </th>
                      </tr>
                    </thead>


                    {
                      leadSection ?
                        <tbody className="divide-y divide-gray-200 bg-white text-center ">
                          <tr className='bg-white'>
                            <td className="whitespace-nowrap"></td>
                            <td className="whitespace-nowrap">
                              <form>
                                <input className='form-control text-center text-sm p-1 border' placeholder='Search Name' onChange={nameFilter} />
                              </form>
                            </td>
                            <td className="whitespace-nowrap">
                              <form>
                                <input className='form-control text-center text-sm p-1 border' placeholder='Search No.' onChange={numberFilter} />
                              </form>
                            </td>
                            <td className="whitespace-nowrap"></td>
                            <td className="whitespace-nowrap">
                              <form>
                                <select
                                  name="status"
                                  onChange={statusFilter}
                                  id="status" className="text-sm p-1 text-center border"
                                >
                                  <option>Select</option>
                                  <option value="No Update">No Update</option>
                                  <option value="Close">Close</option>
                                  <option value="In Follow Up">In Follow Up</option>
                                  <option value="Did Not Answer">Did Not Answer</option>
                                  <option value="Not Interested">Not Interested</option>
                                  <option value="Switched Off">Switched Off</option>
                                  <option value="Broker">Broker</option>
                                  <option value="Invalid Number">Invalid Number</option>
                                  <option value="Spam">Spam</option>
                                  <option value="Incoming Not Available">Incoming Not Available</option>
                                  <option value="Busy">Busy</option>
                                  <option value="Call Cut">Call Cut</option>
                                  <option value="Meeting Done">Meeting Done</option>
                                  <option value="Future Prospect">Future Prospect</option>
                                </select>
                              </form>
                            </td>
                            <td className="whitespace-nowrap"></td>
                            <td className="whitespace-nowrap"></td>
                            <td className="whitespace-nowrap"></td>

                          </tr>
                          {records.map((lead, index) => (
                            <tr key={index + 1}>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.phone}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastAssignedDate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.status}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastStatusUpdate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4" style={{ 'whiteSpace': 'unset' }}>
                                <div className="text-sm font-medium text-gray-900">{lead.remark}</div>
                              </td>

                              <td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
                                <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
                                  <Link to={`/employeeLeadDetails/${lead._id}`}>View</Link>
                                </div>
                                <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
                                  <Link to={`/employeeLeadUpdate/${lead._id}`}>Update</Link>
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>


                        : null
                    }

                    {
                      closeSection ?
                        <tbody className="divide-y divide-gray-200 bg-white text-center ">
                          {closeLead.map((lead, index) => (
                            <tr key={index + 1}>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.phone}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastAssignedDate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.status}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastStatusUpdate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4" style={{ 'whiteSpace': 'unset' }}>
                                <div className="text-sm font-medium text-gray-900">{lead.remark}</div>
                              </td>

                              <td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
                                <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
                                  <Link to={`/employeeLeadDetails/${lead._id}`}>View</Link>
                                </div>
                                <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
                                  <Link to={`/employeeLeadUpdate/${lead._id}`}>Update</Link>
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                        : null
                    }

                    {
                      followUpSection ?
                        <tbody className="divide-y divide-gray-200 bg-white text-center ">
                          {inFollowUpLead.map((lead, index) => (
                            <tr key={index + 1}>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.phone}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastAssignedDate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.status}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastStatusUpdate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4" style={{ 'whiteSpace': 'unset' }}>
                                <div className="text-sm font-medium text-gray-900">{lead.remark}</div>
                              </td>

                              <td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
                                <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
                                  <Link to={`/employeeLeadDetails/${lead._id}`}>View</Link>
                                </div>
                                <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
                                  <Link to={`/employeeLeadUpdate/${lead._id}`}>Update</Link>
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                        : null
                    }

                    {
                      noUpdateSection ?
                        <tbody className="divide-y divide-gray-200 bg-white text-center ">
                          {noUpdateLead.map((lead, index) => (
                            <tr key={index + 1}>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.phone}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastAssignedDate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.status}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastStatusUpdate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4" style={{ 'whiteSpace': 'unset' }}>
                                <div className="text-sm font-medium text-gray-900">{lead.remark}</div>
                              </td>

                              <td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
                                <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
                                  <Link to={`/employeeLeadDetails/${lead._id}`}>View</Link>
                                </div>
                                <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
                                  <Link to={`/employeeLeadUpdate/${lead._id}`}>Update</Link>
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                        : null
                    }

                    {
                      didNotAnswerSection ?
                        <tbody className="divide-y divide-gray-200 bg-white text-center ">
                          {didNotAnswerLead.map((lead, index) => (
                            <tr key={index + 1}>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.phone}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastAssignedDate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.status}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastStatusUpdate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4" style={{ 'whiteSpace': 'unset' }}>
                                <div className="text-sm font-medium text-gray-900">{lead.remark}</div>
                              </td>

                              <td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
                                <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
                                  <Link to={`/employeeLeadDetails/${lead._id}`}>View</Link>
                                </div>
                                <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
                                  <Link to={`/employeeLeadUpdate/${lead._id}`}>Update</Link>
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                        : null
                    }

                    {
                      meetingDoneSection ?
                        <tbody className="divide-y divide-gray-200 bg-white text-center ">
                          {meetingDoneLead.map((lead, index) => (
                            <tr key={index + 1}>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.phone}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastAssignedDate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4 text-sm">
                                {lead.status}
                              </td>

                              <td className="whitespace-nowrap px-4 py-4">
                                <div className="text-sm text-gray-900 ">{formatDate(lead.lastStatusUpdate)}</div>
                              </td>

                              <td className="whitespace-nowrap px-4 py-4" style={{ 'whiteSpace': 'unset' }}>
                                <div className="text-sm font-medium text-gray-900">{lead.remark}</div>
                              </td>

                              <td className="whitespace-nowrap flex gap-1 px-4 py-4 text-sm text-gray-700 place-content-center">
                                <div className="text-sm text-gray-900 rounded-full bg-green-400 px-4 py-1">
                                  <Link to={`/employeeLeadDetails/${lead._id}`}>View</Link>
                                </div>
                                <div className="text-sm text-white rounded-full bg-orange-500 px-4 py-1">
                                  <Link to={`/employeeLeadUpdate/${lead._id}`}>Update</Link>
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                        : null
                    }

                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>

  );
};

export default EmployeeLeadList;
