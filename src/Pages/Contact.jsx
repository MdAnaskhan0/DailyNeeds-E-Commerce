import React from 'react'
import Layout from '../Components/Layout/Layout'

const Contact = () => {
    return (
        <Layout>
            <section className="bg-white py-10 px-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <img
                            src="https://iventurebd.com/wp-content/uploads/2023/07/Our-Callcenter.jpeg"
                            alt="Contact Center"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>

                    {/* Right Side: Contact Info */}
                    <div className="w-full md:w-1/2 md:pl-8">
                        <h2 className="text-2xl font-bold mb-4 text-black">
                            CONTACT US
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Any query and info about products, feel free to call anytime. We are available 24x7.
                        </p>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-center">
                                <span className="mr-2">📧</span>
                                <a href="mailto:help@ecommerceapp.com" className="hover:underline">help@ecommerceapp.com</a>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📞</span>
                                012-3456789
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">🎧</span>
                                1800-0000-0000 (Toll Free)
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Contact
