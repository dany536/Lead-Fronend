import React from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png";
import '../app.css';


export default function header() {
    const [cookies, removeCookie] = useCookies([]);

    const navigate = useNavigate()

    const handleSignOut = () => {
        removeCookie("accessToken");
        navigate('/');
    };

    return (
        <div className="relative w-full bg-blue-300 text-gray-600">
            <div className="mx-auto lg:flex max-w-7xl items-center justify-between py-2">
                <div className="lg:-ml-16 flex items-center justify-center lg:justify-start">
                    <img src={Logo} className='w-56 py-3'></img>
                    {/* <span className="font-bold">Vero Estate</span> */}
                </div>
                <div className="text-center">
                    <h1 className='lg:text-3xl text-2xl libre-bodoni'>LEAD MANAGEMENT SYSTEM</h1>
                </div>
                <div className="flex items-center justify-center lg:justify-end">
                    <button
                        onClick={handleSignOut}
                        type="button"
                        className="rounded-md px-3 py-2 font-semibold hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Sign Out
                    </button>

                </div>
            </div>
        </div>
    )
}
