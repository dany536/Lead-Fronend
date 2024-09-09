import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadList from './components/leadList';
import LeadForm from './components/leadform';
import LeadDetails from './components/leadDetails';
import LeadUpdate from './components/leadUpdate';
import Header from './components/header';
import EmployeeList from './components/employeeList';
import EmployeeLeadList from './components/employeeLeadList';
import EmployeeLeadUpdate from './components/employeeLeadUpdate';
import EmployeeLeadDetails from './components/employeeLeadDetails';
import Login from './components/login.jsx';
import Employee from './components/employee.jsx';
import EmployeeLogin from './components/employeeLogin.jsx';

function App() {

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/leadList" element={<LeadList />} />
            <Route path="/add" element={<LeadForm />} />
            <Route path="/leadUpdate/:id" element={<LeadUpdate />} />
            <Route path="/leadDetails/:id" element={<LeadDetails />} />


            <Route path='/addEmployee' element={<Employee />} />
            <Route path='/employee/:id' element={<Employee />} />
            <Route path='/employeeList' element={<EmployeeList />} />
            <Route path="/employeeLeadList" element={<EmployeeLogin />} />
            <Route path="/employeeLogin/:id" element={<EmployeeLogin />} />

            <Route path="/employeeLeadList/:id" element={<EmployeeLeadList />} />
            <Route path="/employeeLeadUpdate/:id" element={<EmployeeLeadUpdate />} />
            <Route path="/employeeLeadDetails/:id" element={<EmployeeLeadDetails />} />

          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
