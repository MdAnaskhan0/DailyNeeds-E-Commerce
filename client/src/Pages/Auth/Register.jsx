import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';



// Define the Zod schema
const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
    address: z.string().min(1, "Address is required"),
    answer: z.string().min(6, "Answer must be at least 6 characters")
});

const Register = () => {
    // Use useForm hook with Zod resolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate()

    // onSubmit function to handle form submission
    const onSubmit = async (data) => {
        // console.log(data);
        // console.log('REGISTER_URL:', import.meta.env.VITE_REGISTER_URL);
    
        const { name, email, password, address, phone, answer } = data;
        try {
            const res = await axios.post(`${import.meta.env.VITE_REGISTER_URL}/api/v1/auth/register`, { name, email, password, address, phone, answer });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    

    const [message, setMessage] = useState("");

    return (
        <Layout>
            <div className="flex justify-center items-center h-fit pt-20 ">
                <form onSubmit={handleSubmit(onSubmit)} className="w-screen max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

                    {/* Name Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            {...register("name")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            {...register("email")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            {...register("password")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="mb-4">
                        <input
                            type="tel"
                            placeholder="Enter Your Phone"
                            {...register("phone")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Address Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter Your Address"
                            {...register("address")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    {/* Answer field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="What is your favourite carton name "
                            {...register("answer")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>}
                    </div>



                    {/* Submit Button */}
                    <button onClick={() => setMessage("Registration Done")}
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
