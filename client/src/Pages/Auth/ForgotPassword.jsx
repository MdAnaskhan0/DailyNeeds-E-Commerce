import React from 'react'
import Layout from '../../Components/Layout/Layout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'


// Zod schema for login validation
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    newpassword: z.string("New Password must be at least 6 characters long"),
    answer: z.string("Answer must be at least 6 characters long")
});



const ForgotPassword = () => {
    // Use useForm hook with zodResolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const navigate = useNavigate();

    // ForgotPassword handler
    const handleForgotPassword = async (data) => {
        console.log('Form Submitted:', data);
        console.log("Forgot Password URL: " + `${import.meta.env.VITE_REGISTER_URL}/api/v1/auth/forgot-password`)
        const { email, answer, newpassword} = data;

        try {
            const res = await axios.post(`${import.meta.env.VITE_REGISTER_URL}/api/v1/auth/forgot-password`, { email, answer, newpassword });
            if (res && res.data.success) {
                toast.success("Password Change Successfully");
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast("Something is wrong.")
        }
    };


    return (
        <Layout title='Forgot Password - E-commerce APP'>
            <div className="flex justify-center items-center h-fit pt-40">
                <form onSubmit={handleSubmit(handleForgotPassword)} className="w-screen max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            {...register("email")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Answer Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your favourite carton name"
                            {...register("answer")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            {...register("newpassword")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.newpassword && <p className="text-red-500 text-sm">{errors.newpassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    >
                        Submit
                    </button>


                    <div className='flex justify-between'>
                        {/* Login Button */}
                        <p onClick={() => { navigate('/login') }} className='pt-5 cursor-pointer text-gray-400 hover:text-gray-700'>Login</p>

                        {/* Create new account */}
                        <p onClick={() => { navigate('/register') }} className='pt-5 cursor-pointer text-gray-400 hover:text-gray-700'>Create new account</p>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
