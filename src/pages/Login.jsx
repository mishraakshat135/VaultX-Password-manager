import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import signupvault from '../assets/signup-vault.png'
import logo from '../assets/logo.png'
import { API_URL } from "../config";

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await response.json()

            if (data.success) {

                localStorage.setItem("token", data.token)
                localStorage.setItem("email", form.email)



                window.location.href = "/";
            }
            else {
                alert(data.message)
            }

        }
        catch (error) {
            console.log(error)
            alert("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen overflow-hidden relative text-white bg-[#050816]">

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-30 -right-20  h-180 w-180 rounded-full bg-green-500/20 blur-[120px]" />
                <div className="absolute bottom-30 right-10 h-200 w-200 rounded-full bg-emerald-500/10 blur-[120px]" />

                <div className="absolute -top-40 -left-15  h-150 w-150  bg-green-500/20 blur-[120px]" />
            </div>
            <div className=" absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />




            <div className="flex flex-col items-center md:flex-row gap-10">
                <div className="flex flex-col  mt-16">
                    <div className=" text-center py-12 px-18">
                        <h1 className="text-6xl font-bold">
                            <span className="text-green-500">&lt;</span>
                            Vault
                            <span className="text-green-500">X/&gt;</span>
                        </h1>
                        <p className="text-gray-400 text-xl mt-4 md:mb-8 ">Secure. Store. Access Anytime.</p>
                    </div>
                    <div className="hidden md:grid grid-cols-1 ml-20 w-70   gap-4 -mt-9">
                        <div className="px-12 bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>🔒 End-to-End Encrypted</h3>
                            <p className="text-gray-400 text-sm">
                                Your data is 100% private
                            </p>
                        </div>
                        <div className="px-12 bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>🛡 Secure Storage</h3>
                            <p className="text-gray-400 text-sm">
                                Military-grade encryption
                            </p>
                        </div>
                        <div className="px-12 bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>⚡ Quick Access</h3>
                            <p className="text-gray-400 text-sm">
                                Get your passwords instantly
                            </p>
                        </div>
                        <div className="px-12 bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>☁ Always Available</h3>
                            <p className="text-gray-400 text-sm">
                                Access anywhere, anytime
                            </p>
                        </div>
                    </div>


                </div>
                <div className="flex flex-col z-10  md:mt-30  bg-white/5 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8   shadow-2xl container  mx-auto max-w-md">
                    <img className="ml-29 md:ml-36 mb-5 rounded-full w-20" src={logo} />
                    <div className="flex flex-col justify-center items-center gap-1 mb-6">
                        <h1 className="text-3xl font-bold text-center ">
                            Login
                        </h1>
                        <p className="text-slate-400">Login to access your passwords</p></div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-green-500/20 rounded-xl px-4 py-4 outline-none focus:border-green-400 transition-all"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-green-500/20 rounded-xl px-4 py-4 outline-none focus:border-green-400 transition-all"
                            required
                        />

                        <button
                            type="submit"
                            className="flex justify-center items-center gap-5 bg-green-600 hover:bg-green-500 transition-all px-8 py-3 rounded-xl font-semibold shadow-lg shadow-green-500/30"
                        >
                            Login
                        </button>

                    </form>

                    <p className="mt-4 text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-500"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>

                <div>
                    <img src={signupvault} className="hidden md:flex w-120 mt-40 -ml-20 brightness-120 contrast-105 opacity-70" />



                </div>

            </div>
        </div>
    )
}

export default Login