import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, Form } from 'react-router-dom';
import moment from 'moment';
import Admin from './admin';
import Header from './header';
import url from './url';

const API_BASE_URL = url;

const LeadUpdate = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [date, setDate] = useState([]);


    useEffect(() => {
        if (id) {
            fetchEmployee();
        }
    }, [id]);

    const fetchEmployee = async () => {
        axios.get(`${API_BASE_URL}/employee/${id}`)
            .then(res => setEmployee(res.data))
            .catch(err => console.log(err))
    };

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`${API_BASE_URL}/employee/${id}`, employee);
        } else {
            await axios.post(`${API_BASE_URL}/addEmployee`, employee);

        }
        navigate('/employeeList');
    };

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    };

    // setDate(moment(formatDate(lead.lastAssignedDate)).format('YYYY-MM-DD'))

    return (
        <>
        <Header />
        <Admin />
            <form onSubmit={handleSubmit}>
                <div className="bg-gray-100 p-10">
                    <div className='max-w-5xl mx-auto bg-white rounded shadow-lg'>
                        <div className="text-gray-600 text-center text-base md:text-3xl p-5 pb-0">
                            <p className="font-medium">{id ? 'Update' : 'Add'} Employee Details</p>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1'>
                            <div className="p-4 px-4 md:p-10 md:pt-5">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name">Full Name</label>
                                        <input type="text" name="name" value={employee.name} onChange={handleChange} id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="text" name="email" value={employee.email} onChange={handleChange} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="phone">Mobile Number</label>
                                        <input type="text" name="phone" value={employee.phone} onChange={handleChange} id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="password">Password</label>
                                        <input type="text" name="password" value={employee.password} onChange={handleChange} id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>

                                </div>
                            </div>
                            <div className="p-4 px-4 md:p-10 md:pt-5">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                    <div className="md:col-span-5 text-right pt-2">
                                        <div className="inline-flex items-end gap-2">
                                            <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
                                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{id ? 'Update' : 'Add'} Employee</button>
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

export default LeadUpdate;