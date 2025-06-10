import * as React from 'react';
import { useState, useEffect } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import url from './url';
import axios from 'axios';

const API_BASE_URL = url;

export default function Chart() {

  const [leads, setLeads] = useState([]);
  const [records, setRecords] = useState([]);
  const [employee, setEmployee] = useState([]);

  const statusInFollowUpfn = (id) => {
    const employeeLead = leads.filter(({ assignedTo }) => assignedTo == id);
    const inFollowUp = employeeLead.filter(({ status }) => status === "In Follow Up");
    return inFollowUp.length;
  }

  const data = (employee && employee.filter(user => user.name !== ("Sammeer Ajmani"))).map(item => ({
    label: item.name,
    value: statusInFollowUpfn(item._id)
  }));

  const sizing = {
    margin: { right: 5 },
    width: 400,
    height: 400,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  useEffect(() => {
    fetchLeads();
    fetchEmployee();
  });

  const fetchLeads = async () => {
    const res = await axios.get(`${API_BASE_URL}/leadsadmin`);
    setLeads(res.data);
    setRecords(res.data);
  };

  const fetchEmployee = async () => {
    axios.get(`${API_BASE_URL}/employees`)
      .then(res => setEmployee(res.data))
      .catch(err => console.log(err))
  };

  return (
    <>
      <PieChart
        series={[
          {
            outerRadius: 190,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
          },
        }}
        {...sizing}
      />

      {/* <div>
        {employee.map(item => (
          <div>
          <h1>{item.name}</h1>
          <h6>{item._id}</h6>
          </div>

        ))}
      </div> */}
    </>
  );
}