import * as React from 'react';
import { useState, useEffect } from 'react';
import url from './url';
import axios from 'axios';

const API_BASE_URL = url;

export default function employeeRank() {

    const [leads, setLeads] = useState([]);
    const [employee, setEmployee] = useState([]);

    const statusInFollowUpfn = (id) => {
        const employeeLead = leads.filter(({ assignedTo }) => assignedTo == id);
        const inFollowUp = employeeLead.filter(({ status }) => status === "In Follow Up");
        console.log("Employee Rank")
        return inFollowUp.length;
    }

    const data = (employee && employee.filter(user => user.name !== ("Sammeer Ajmani"))).map(item => ({
        label: item.name,
        value: statusInFollowUpfn(item._id)
    }));

    useEffect(() => {
        fetchLeads();
        fetchEmployee();
    }, []);

    const fetchLeads = async () => {
        const res = await axios.get(`${API_BASE_URL}/leadsadmin`);
        setLeads(res.data);
    };

    const fetchEmployee = async () => {
        axios.get(`${API_BASE_URL}/employees`)
            .then(res => setEmployee(res.data))
            .catch(err => console.log(err))
    };

    return (
        <>
            <div className=''>
                <div className="relative overflow-x-auto ">
                    <table className="w-full text-">
                        <thead className="text-gray-900 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Rank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    In follow Up
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {data
                                .sort((a, b) => a.value > b.value ? -1 : 1)
                                .map((item, index) => (
                                    <tr key={index + 1}>
                                        <th scope="row" className="px-6 font-medium text-center">
                                            {index + 1}
                                        </th>
                                        <td className="px-6">
                                            {item.label}
                                        </td>
                                        <td className="px-6 text-center">
                                            {item.value}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </>
    );
}



<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>
