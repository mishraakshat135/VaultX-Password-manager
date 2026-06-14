import React, { useState } from 'react'
import '../index.css'
import github from "../assets/github.png"
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const email = localStorage.getItem("email");
    console.log("email:",localStorage.getItem("email"))
    const username = email ? email.split("@")[0] : "User"

    const token = localStorage.getItem("token")

    return (
        <nav className="bg-slate-800 text-white">
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-15">
                <div className="logo font-bold text-white text-2xl">
                    <span className="text-green-700">{"<"}</span>
                    Vault
                    <span className="text-green-700">{"X/>"}</span>

                </div>
                <ul>
                    {/* <li className="flex gap-4">
                        <a className="hover:font-bold" href="/">Home</a>
                        <a className="hover:font-bold" href="#">About</a>
                        <a className="hover:font-bold" href="#">Contact Us</a>

                    </li> */}
                </ul>
                <div className="flex items-center gap-4">
                    {!token && (<>
                        <Link to="/login" className="hover:text-green-500">Login</Link>

                        <Link to="/signup" className="hover:text-green-500">Signup</Link>
                    </>
                    )}
                    {token && (
                        <div className="relative">
                            <button onClick={() => setShowDropdown(!showDropdown)} className=" flex items-center gap-2 bg-green-700 px-3 py-2 rounded-full hover:bg-green-600">
                                <div className="w-8 h-8 rounded-full bg-white text-green-700 font-bold flex items-center justify-center">
                                    {username[0].toUpperCase()}
                                </div>
                                <span>{username}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b text-gray-700">
                                        <p className="font-semibold">{username}</p>
                                        <p className="text-xs text-gray-500">{email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("token")
                                            localStorage.removeItem("email")
                                            window.location.href = "/login"
                                        }}
                                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}
                        </div>

                    )}
                    {/* <button className="text-white bg-green-700 px-2 rounded-full flex items-center ring-white ring-1">
                        <img src={github} className="invert p-1 w-12" />
                        <span className="font-bold px-1">GitHub</span>
                    </button> */}

                </div>
            </div>
        </nav>

    )
}

export default Navbar