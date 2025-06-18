import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Admin from './admin';
import Header from './header';
import url from './url';

const API_BASE_URL = url;

const LeadForm = () => {
  const [lead, setLead] = useState([]);
  const [message, setMessage] = useState();
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetchEmployee();
  }, []);

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
      // .then(res => {
      //   setMessage(res.data.Message)
      // })
      // .catch(err => console.log(err)
      // )

    }
    navigate('/leadList');
    console.log(lead);

  };

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : 'N/A';
  };

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-tr from-blue-100 via-white to-green-100'>
        <Admin />
        <form onSubmit={handleSubmit}>
          <div class="min-h-screen pt-10 flex items-center justify-center">
            <div class="container max-w-screen-lg mx-auto">
              <div>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="text-gray-600">
                      <p class="font-medium text-lg">Lead Details</p>
                      <p>Please fill out all the fields.</p>
                    </div>

                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <label for="full_name">Full Name</label>
                          <input type="text" name="name" onChange={handleChange} id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                        </div>

                        <div class="md:col-span-5">
                          <label for="email">Email Address</label>
                          <input type="text" name="email" onChange={handleChange} id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" required />
                        </div>

                        <div class="md:col-span-5">
                          <label for="phone">Mobile Number</label>
                          <input type="text" name="phone" onChange={handleChange} id="phone" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                        </div>

                        <div class="md:col-span-5">
                          <label for="data_source">Data Source</label>
                          <input type="text" name="data_source" onChange={handleChange} id="data_source" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                        </div>

                        <div class="md:col-span-5">
                          <label for="project">Project</label>
                          <input type="text" name="project" onChange={handleChange} id="project" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                        </div>

                        <div class="md:col-span-5">
                          <label for="dateOfLead">Date of Lead</label>
                          <input type="date" name="dateOfLead" onChange={handleChange} id="dateOfLead" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="assignedTo">New Assign To</label>
                          <select
                            name="assignedTo"
                            value={lead.assignedTo ? lead.assignedTo.name : '--'}
                            onChange={handleChange}
                            id="assignedTo" className="h-10 border mt-1 rounded p-2 w-full bg-gray-50"
                          >
                            <option>Select One</option>
                            {
                              employee.map((employee) => (
                                <option key={employee._id} value={employee._id}>{employee.name}</option>
                              ))
                            }
                          </select>
                          {/* <input type="text" name="assignedTo" value={lead.assignedTo ? lead.assignedTo.name : ''} onChange={handleChange} id="assignedTo" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" /> */}
                        </div>

                        <div className="md:col-span-5">
                          <label htmlFor="lastAssignedDate">Date of Assign</label>
                          <input type="date" name="lastAssignedDate" value={formatDate(lead.lastAssignedDate)} onChange={handleChange} id="lastAssignedDate" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>


                        <div class="md:col-span-5 text-right pt-2">
                          <div class="inline-flex items-end gap-2">
                            <button onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Back</button>
                            <button type='submit' class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{id ? 'Update' : 'Add'} Lead</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className='text-center text-black h-5'>
                    <p>{message}</p>
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

export default LeadForm;