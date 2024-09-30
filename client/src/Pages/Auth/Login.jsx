import React from 'react';
import Layout from '../../Components/Layout/Layout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for login validation
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

const Login = () => {
    // Use useForm hook with zodResolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    // Submit handler
    const handleLogin = (data) => {
        console.log('Form Submitted:', data);
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-fit pt-40">
                <form onSubmit={handleSubmit(handleLogin)} className="w-screen max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

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

                    {/* Password Input */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            {...register("password")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
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

export default Login;
