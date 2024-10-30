import React from 'react';
import Layout from '../Components/Layout/Layout';
import UserMenu from '../Components/Layout/UserMenu';

const Order = () => {
    return (
        <Layout title={"Orders - ECommerce-App"}>
            <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <UserMenu />

                {/* Orders Content */}
                <div className="bg-white p-6 rounded-md shadow-lg flex-grow">
                    <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
                    <p className="text-lg text-gray-700">Here you can view all of your orders.</p>
                </div>
            </div>
        </Layout>
    );
}

export default Order;
