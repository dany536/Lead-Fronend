import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '../header';
import url from '../url';

const API_BASE_URL = url;

const addPLead = () => {
    const { id } = useParams();

    const [lead, setLead] = useState({assignedTo: id});
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const handleChange = (e) => {
        setLead({ ...lead, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(lead);
        await axios.post(`${API_BASE_URL}/addPersonalLead`, lead);
        navigate(-1);

    };

    const today = new Date().toISOString().split('T')[0];

    const defaultValue = id;


    return (
        <>
            <Header />
            <div className='min-h-screen bg-gradient-to-tr from-blue-100 via-white to-green-100 p-4'>
                <form onSubmit={handleSubmit}>
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="container max-w-screen-lg mx-auto">
                            <div>
                                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                        <div className="text-gray-600">
                                            <p className="font-medium text-lg">Add Personal Lead Details</p>
                                            <p>Please fill out all the fields.</p>
                                        </div>

                                        <div className="lg:col-span-2">
                                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                                <div className="md:col-span-5">
                                                    <label htmlFor="name">Full Name</label>
                                                    <input type="text" name="name" onChange={handleChange} id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                                </div>

                                                <div className="md:col-span-5">
                                                    <label htmlFor="email">Email Address</label>
                                                    <input type="text" name="email" onChange={handleChange} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" required />
                                                </div>

                                                 <div className="md:col-span-5">
                                                    <label htmlFor="phone">Mobile Number</label>
                                                    <input type="text" name="phone" onChange={handleChange} id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                                </div>

                                                <div className="md:col-span-5">
                                                    <label htmlFor="data_source">Data Source</label>
                                                    <input type="text" name="data_source" onChange={handleChange} id="data_source" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                                </div>

                                                <div className="md:col-span-5">
                                                    <label htmlFor="project">Project</label>
                                                    <input type="text" name="project" onChange={handleChange} id="project" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                                </div>

                                                <div className="md:col-span-5">
                                                    <label htmlFor="dateOfLead">Date of Lead</label>
                                                    <input type="date" name="dateOfLead" onChange={handleChange} id="dateOfLead" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                                </div>

                                                <div className="md:col-span-5 text-right pt-2">
                                                    <div className="inline-flex items-end gap-2">
                                                        <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
                                                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Lead</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default addPLead;