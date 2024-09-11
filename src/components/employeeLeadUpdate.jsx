import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, Form } from 'react-router-dom';
import moment from 'moment';
import Header from './header';
import url from './url';

const API_BASE_URL = url;

const EmployeeLeadUpdate = () => {
    const [lead, setLead] = useState([]);
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [date, setDate] = useState([]);


    useEffect(() => {
        if (id) {
            fetchLead();
            fetchEmployee();
        }
    }, [id]);

    const fetchLead = async () => {
        axios.get(`${API_BASE_URL}/lead/${id}`)
            .then(res => setLead(res.data))
            .catch(err => console.log(err))
    };

    const fetchEmployee = async () => {
        axios.get(`${API_BASE_URL}/employees`)
            .then(res => setEmployee(res.data))
            .catch(err => console.log(err))
    };

    const handleChange = (e) => {
        setLead({ ...lead, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`${API_BASE_URL}/lead/${id}`, lead);
        } else {
            await axios.post(`${API_BASE_URL}/addLead`, lead);

        }
        navigate(-1);

    };

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : 'N/A';
    };

    // setDate(moment(formatDate(lead.lastAssignedDate)).format('YYYY-MM-DD'))

    const today = new Date();
    const test = today.setDate(today.getDate());
    const defaultValue = new Date(test).toISOString().split('T')[0]

    return (
        <>

            <Header />
            <form onSubmit={handleSubmit}>
                <div className="bg-gray-100 p-10">
                    <div className='max-w-5xl mx-auto bg-white rounded shadow-lg'>
                        <div className="text-gray-600 text-center text-base md:text-3xl p-5 pb-0">
                            <p className="font-medium">Update Lead Details</p>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <div className="p-4 px-4 md:p-10 md:pt-5">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">Full Name</label>
                                        <input type="text" name="name" value={lead.name} onChange={handleChange} id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="text" name="email" value={lead.email} onChange={handleChange} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" disabled />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="phone">Mobile Number</label>
                                        <input type="text" name="phone" value={lead.phone} onChange={handleChange} id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="data_source">Data Source</label>
                                        <input type="text" name="data_source" value={lead.data_source} onChange={handleChange} id="data_source" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="project">Project</label>
                                        <input type="text" name="project" value={lead.project} onChange={handleChange} id="project" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="dateOfLead">Date of Lead</label>
                                        <input type="date" name="dateOfLead" value={formatDate(lead.dateOfLead)} onChange={handleChange} id="dateOfLead" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                </div>
                            </div>
                            <div className="p-4 px-4 md:p-10 md:pt-5">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label>Assign To</label>
                                        <input value={lead.assignedTo ? lead.assignedTo.name : 'Not Assign'} id="assignedTo" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="lastAssignedDate">Date of Assign</label>
                                        <input type="date" value={formatDate(lead.lastAssignedDate)} name="lastAssignedDate" onChange={handleChange} id="lastAssignedDate" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="lastAssignedDate">Last Status Update</label>
                                        <input type="date" value={formatDate(lead.lastStatusUpdate)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                                    </div>

                                    <div className="md:col-span-5 hidden">
                                        <label htmlFor="lastStatusUpdate">Latest Status Update Date</label>
                                        <input id="lastStatusUpdate" type="date" name="lastStatusUpdate" value={lead.lastStatusUpdate = defaultValue} defaultValue={defaultValue} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="status">Status</label>
                                        <select
                                            name="status"
                                            value={lead.status}
                                            onChange={handleChange}
                                            id="status" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        >
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
                                        </select>
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="remark">Remarks</label>
                                        <textarea rows="5" name='remark' id='remark' value={lead.remark} onChange={handleChange} className="border mt-1 rounded p-3 w-full bg-gray-50" ></textarea>
                                    </div>

                                    <div className="md:col-span-5 text-right pt-2">
                                        <div className="inline-flex items-end gap-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(-1)}>Back</button>
                                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{id ? 'Update' : 'Add'} Lead</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    );
};

export default EmployeeLeadUpdate;