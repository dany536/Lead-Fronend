import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Admin from './admin';
import Header from './header';
import url from './url';

const API_BASE_URL = url;

const LeadDetails = () => {
  const [lead, setLead] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchLead();
    }
  }, [id]);

  const fetchLead = async () => {
    const res = await axios.get(`${API_BASE_URL}/lead/${id}`);
    setLead(res.data);
    console.log(res.data);
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  return (
    <>
    <Header />
    <Admin />
    <div className="bg-gray-100 p-10">
      <div className='max-w-5xl mx-auto bg-white rounded shadow-lg'>
        <div className="text-gray-600 text-center text-base md:text-3xl p-5 pb-0">
          <p className="font-medium">Lead Details</p>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div className="p-4 px-4 md:p-10 md:pt-5">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label>Full Name</label>
                <input value={lead.name} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
              </div>

              <div className="md:col-span-5">
                <label>Email Address</label>
                <input value={lead.email} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
              </div>

              <div className="md:col-span-5">
                <label>Mobile Number</label>
                <input value={lead.phone} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
              </div>

              <div className="md:col-span-5">
                <label>Data Source</label>
                <input value={lead.data_source} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
              </div>

              <div className="md:col-span-5">
                <label >Project</label>
                <input value={lead.project} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
              </div>

              <div className="md:col-span-5">
                <label>Date of Lead</label>
                <input value={formatDate(lead.dateOfLead)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
              </div>

            </div>
          </div>
          <div>
            <div className="p-4 px-4 md:p-10 md:pt-5">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label>Assign To</label>
                  <input value={lead.assignedTo} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                </div>

                <div className="md:col-span-5">
                  <label for="dateOfLead">Date of Assign</label>
                  <input value={formatDate(lead.lastAssignedDate)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                </div>

                <div className="md:col-span-5">
                  <label>Status</label>
                  <input value={lead.status} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                </div>

                <div className="md:col-span-5">
                  <label for="dateOfLead">Last Status Update</label>
                  <input value={formatDate(lead.lastStatusUpdate)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled />
                </div>

                <div className="md:col-span-5">
                  <label for="data_source">Remarks</label>
                  <textarea rows="4" value={lead.remark} className="border mt-1 rounded p-3 w-full bg-gray-50" disabled></textarea>
                </div>

                <div className="md:col-span-5 text-right pt-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to="/leadList">Back</Link></button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
    </>

  );
};

export default LeadDetails;