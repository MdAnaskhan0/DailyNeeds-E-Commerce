import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) =>{
        e.preventDefault();
        console.log({email, password})
    }

    return (
        <Layout>
            <div className="flex justify-center items-center h-fit pt-40">
                <form onSubmit={handleLogin} className="w-screen max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
