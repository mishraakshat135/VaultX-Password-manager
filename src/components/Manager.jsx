import React from 'react'
import eye from "../assets/eye.png"
import hidden from "../assets/hidden.png"
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom"
import vault from "../assets/vault.png";


const Manager = () => {


    const [visiblePasswords, setVisiblePasswords] = useState({});

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    const navigate = useNavigate()


    useEffect(() => {

        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/login")
            return
        }

        getPasswords()

    }, [navigate])



    const ref = useRef()
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        const token = localStorage.getItem("token")
        let req = await fetch("http://localhost:3000/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let passwords = await req.json()
        setPasswordArray(passwords);
    }

    // useEffect(() => {
    //     getPasswords()
    // }, []);

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes(hidden)) {
            ref.current.src = eye
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = hidden
            passwordRef.current.type = "text"

        }
    }


    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            if (form.id) {

                const token = localStorage.getItem("token")
                await fetch("http://localhost:3000/", {
                    method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ id: form.id })
                })
            }
            const id = uuidv4()
            setPasswordArray([...passwordArray, { ...form, id }])
            const token = localStorage.getItem("token")

            await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...form, id })
            })
            //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
            setform({ site: "", username: "", password: "" })
            toast('Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        else {
            toast("Error: Password not saved")
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do u really want to delete the password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            const token = localStorage.getItem("token")
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...form, id })
            })

            //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            toast('Password Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            await getPasswords()
        }
    }

    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    const copyText = (text) => {
        toast('Copied to clickboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }

    return (


        <div >

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

            <div className="min-h-screen bg-[#050816] text-white relative">

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-30  h-50 w-100 rounded-full bg-green-700 blur-[120px]" />
                    <div className="absolute bottom-30 right-10 h-200 w-200 rounded-full bg-emerald-500/10 blur-[120px]" />
                    <div className="absolute top-30 left-10  h-200 w-200  bg-green-500/20 blur-[120px]" />


                </div>

                <div className=" absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

               

                <div className="text-center py-12 px-18">
                    <h1 className="text-6xl font-bold">
                        <span className="text-green-500">&lt;</span>
                        Vault
                        <span className="text-green-500">X/&gt;</span>
                    </h1>
                    <p className="text-gray-400 text-xl mt-4 mb-8 ">Secure. Store. Access Anytime.</p>
                    <div className="absolute w-45 right-60 top-3 hidden lg:block">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-[80px]" />
                        <img
                            src={vault}
                            alt="Vault"
                            className="w-56 rounded-xl opacity-80 brightness-140 contrast-120 shadow-2xl"
                        />
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8 shadow-2xl">

                        <div className="flex flex-col p-4 text-white items-center gap-8">
                            <input value={form.site} onChange={handleChange} placeholder="Enter website Url" className="w-full bg-black/20 border border-green-500/20 rounded-xl px-4 py-4 outline-none focus:border-green-400 transition-all" type="text" name="site" id="site" />
                            <div className="flex flex-col md:flex-row  w-full gap-8 justify-between">


                                <input value={form.username} onChange={handleChange} placeholder="Enter username" className="w-full bg-black/20 border border-green-500/20 rounded-xl px-4 py-4 outline-none focus:border-green-400 transition-all " type="text" name="username" id="username" />

                                <div className=" relative">

                                    <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter password" className=" w-full bg-black/20 border border-green-500/20 rounded-xl px-4 py-4 outline-none focus:border-green-400 transition-all" type="password" name="password" id="password" />
                                    <span className="absolute right-1 top-0.5 cursor-pointer" onClick={showPassword}>
                                        <img src={eye} className="invert-100 mt-3 mr-2 p-1" width={30} ref={ref} />
                                    </span>

                                </div>
                            </div>
                            <button onClick={savePassword} className="flex items-center gap-5 bg-green-600 hover:bg-green-500 transition-all px-8 py-3 rounded-xl font-semibold shadow-lg shadow-green-500/30">
                                <lord-icon
                                    src="https://cdn.lordicon.com/ueoydrft.json"
                                    trigger="hover">

                                </lord-icon>
                                Save Password</button>
                        </div></div>


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>🔒 End-to-End Encrypted</h3>
                            <p className="text-gray-400 text-sm">
                                Your data is 100% private
                            </p>
                        </div>
                        <div className="bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>🛡 Secure Storage</h3>
                            <p className="text-gray-400 text-sm">
                                Military-grade encryption
                            </p>
                        </div>
                        <div className="bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>⚡ Quick Access</h3>
                            <p className="text-gray-400 text-sm">
                                Get your passwords instantly
                            </p>
                        </div>
                        <div className="bg-white/5 border border-green-500/20 rounded-2xl p-5">
                            <h3>☁ Always Available</h3>
                            <p className="text-gray-400 text-sm">
                                Access anywhere, anytime
                            </p>
                        </div>
                    </div>

                    <h2 className="font-bold text-4xl mt-15 -mb-3 ">Passwords</h2>
                    <div className="passwords bg-white/5 border border-green-500/20 rounded-3xl overflow-hidden mt-10 backdrop-blur-xl">

                        {passwordArray.length === 0 && <div>No passwords to show</div>}
                        {passwordArray.length !== 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                                <thead className="bg-green-600/20  text-green-200">
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                        <th className="py-2">Site</th>
                                        <th className="py-2">Username</th>
                                        <th className="py-2">Password</th>
                                        <th className="py-2">Actions</th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white/5 text-slate-100 ">
                                    {passwordArray.map((item, index) => {


                                        return <tr key={index}>
                                            <td className=" py-2 border border-green-500/20 text-center w-32">
                                                <div className="flex justify-center items-center">
                                                    <a href={item.site} target="_blank" >{item.site}</a>
                                                    <div className="size-7 cursor-pointer " onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/hmpomorl.json"
                                                            trigger="hover">
                                                        </lord-icon></div></div>
                                            </td>
                                            <td className=" py-2 border border-green-500/20 text-center w-32">
                                                <div className="flex justify-center items-center">
                                                    <span>{item.username}</span>
                                                    <div className="size-7 cursor-pointer " onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/hmpomorl.json"
                                                            trigger="hover">
                                                        </lord-icon></div></div>
                                            </td>
                                            <td className="py-2 border border-green-500/20 text-center w-32">
                                                <div className="flex gap-4 justify-center items-center">



                                                    <span>{visiblePasswords[item.id] ? item.password : "*".repeat(item.password.length)}</span>

                                                    <button
                                                        onClick={() => togglePasswordVisibility(item.id)}
                                                        className="cursor-pointer"
                                                    >
                                                        <img
                                                            src={visiblePasswords[item.id] ? hidden : eye}
                                                            alt="toggle"
                                                            className="w-5 h-5 invert-100"
                                                        />
                                                    </button>


                                                    {/* <div className="size-7 cursor-pointer " onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/hmpomorl.json"
                                                        trigger="hover">
                                                    </lord-icon></div> */}
                                                </div>
                                            </td>
                                            <td className="py-2 border   border-green-500/20 text-center w-32">
                                                <span className="cursor-pointer mx-5" onClick={() => { editPassword(item.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon></span>
                                                <span className="cursor-pointer mx-5" onClick={() => { deletePassword(item.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon></span>
                                            </td>


                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>


                    <div className="mt-10 bg-linear-to-r from-green-900/20 to-transparent border border-green-500/20 rounded-3xl p-6">
                        <h1>🛡 Your vault is safe and secure.</h1>
                        <p className="text-slate-400">You're in control of your data.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager