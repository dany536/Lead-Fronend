import React from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'


export default function header() {
    const [cookies, removeCookie] = useCookies([]);

    const navigate = useNavigate()

    const handleSignOut = () => {
        removeCookie("accessToken");
        navigate('/');
    };

    return (
        <div className="relative w-full bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                    <span className="font-bold">Vero Estate</span>
                </div>
                <div className="grow flex-col items-center text-center flex">
                    <h1 className='text-3xl p-3'>LEAD MANAGEMENT SYSTEM</h1>
                </div>
                <div className="space-x-2">
                    <button
                        onClick={handleSignOut}
                        type="button"
                        className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Sign Out
                    </button>

                </div>
            </div>
        </div>
    )
}
