import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {

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
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await response.json()

            if (data.success) {
                alert("Account created successfully!")
                window.location.href="/"
                
            }
            else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }
    }

    return (
        <div className="container mx-auto max-w-md p-8 mt-10">

            <h1 className="text-3xl font-bold text-center mb-6">
                Create Account
            </h1>

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
                    className="border p-3 rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-3 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded"
                >
                    Sign Up
                </button>

            </form>

            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-500"
                >
                    Login
                </Link>
            </p>

        </div>
    )
}

export default Signup