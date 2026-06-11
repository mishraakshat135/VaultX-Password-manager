import React from 'react'
import '../index.css'
import github from "../assets/github.png"

const Navbar = () => {
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
                <button className="text-white bg-green-700 px-2 my-5 rounded-full flex  items-center ring-white ring-1">
                    <img src={github} className="invert p-1 w-12" />
                    <span className="font-bold px-1">GitHub</span>
                </button>
            </div>
        </nav>

    )
}

export default Navbar