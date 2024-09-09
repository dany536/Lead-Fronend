import React from 'react'
import { Link } from 'react-router-dom'

function admin() {
    return (
        <div className='shadow-md bg-white'>
            <div className="pb-5 pt-2 flex space-y-4 flex-row items-center justify-between md:space-y-0  max-w-6xl mx-auto bg-">
                <div>
                </div>
                <div>
                    <Link
                        type="button" to="/leadList"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Leads
                    </Link>
                    <Link
                        type="button" to="/employeeList"
                        className="rounded-md bg-black px-3 py-2 ml-5  text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Employees
                    </Link>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default admin