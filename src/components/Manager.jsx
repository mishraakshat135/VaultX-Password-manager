import React from 'react'
import eye from "../assets/eye.png"
import hidden from "../assets/hidden.png"
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async ()=>{
        let req= await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords);
    }

    useEffect(() => {
        getPasswords()
    }, []);

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
        if(form.site.length >3 && form.username.length >3 && form.password.length  >3){
        if(form.id){
        await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: form.id })})}
        const id = uuidv4()
        setPasswordArray([...passwordArray, {...form, id}])
        await fetch("http://localhost:3000/", {method:"POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...form, id })})
        //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
        setform({site:"", username:"", password:""})
        toast('Password Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });}
        else{
            toast("Error: Password not saved")
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do u really want to delete the password?")
        if(c){
         setPasswordArray(passwordArray.filter(item=>item.id!==id))
         
        await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...form, id })})

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
        setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        
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


        <div>

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



            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-green-500 opacity-20 blur-[100px]"></div></div>

            <div className="px-4 md:px-40 md:mycontainer ">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">&lt;</span>
                    Vault
                    <span className="text-green-700">X/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center ">Your own Password Manager</p>


                <div className="flex flex-col p-4 text-black items-center gap-8">
                    <input value={form.site} onChange={handleChange} placeholder="Enter website Url" className="rounded-full border border-green-500 w-full py-1 px-4" type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row  w-full gap-8 justify-between">



                        <input value={form.username} onChange={handleChange} placeholder="Enter username" className="rounded-full border border-green-500 w-full  py-1 p-4 " type="text" name="username" id="username"/>

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter password" className="rounded-full border border-green-500 w-full  py-1 p-4" type="password" name="password" id="password" />
                            <span className="absolute right-1 top-0.5 cursor-pointer" onClick={showPassword}>
                                <img src={eye} className="p-1" width={30} ref={ref} />
                            </span>

                        </div>
                    </div>
                    <button onClick={savePassword} className="flex justify-center items-center bg-green-600 rounded-full px-2 py-2 w-fit hover:bg-green-500">
                        <lord-icon
                            src="https://cdn.lordicon.com/ueoydrft.json"
                            trigger="hover">

                        </lord-icon>
                        Save Password</button>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4 ">Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>

                                </tr>
                            </thead>
                            <tbody className="bg-green-100 ">
                                {passwordArray.map((item, index) => {


                                    return <tr key={index}>
                                        <td className=" py-2 border border-white text-center w-32">
                                            <div className="flex justify-center items-center">
                                                <a href={item.site} target="_blank" >{item.site}</a>
                                                <div className="size-7 cursor-pointer " onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/hmpomorl.json"
                                                        trigger="hover">
                                                    </lord-icon></div></div>
                                        </td>
                                        <td className=" py-2 border border-white text-center w-32">
                                            <div className="flex justify-center items-center">
                                                <span>{item.username}</span>
                                                <div className="size-7 cursor-pointer " onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/hmpomorl.json"
                                                        trigger="hover">
                                                    </lord-icon></div></div>
                                        </td>
                                        <td className="py-2 border border-white text-center w-32">
                                            <div className="flex justify-center items-center">
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className="size-7 cursor-pointer " onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/hmpomorl.json"
                                                        trigger="hover">
                                                    </lord-icon></div></div>
                                        </td>
                                        <td className="py-2 border   border-white text-center w-32">
                                        <span className="cursor-pointer mx-5" onClick={()=>{editPassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                            >
                                            </lord-icon></span>
                                            <span className="cursor-pointer mx-5" onClick={()=>{deletePassword(item.id)}}><lord-icon
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
            </div>

        </div>
    )
}

export default Manager