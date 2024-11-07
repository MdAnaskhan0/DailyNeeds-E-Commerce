import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../Context/Auth'

const AdminDashBoard = () => {

    const [auth] = useAuth();

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
                {/* Admin Sidebar */}
                <div className="w-full lg:w-64 bg-gray-800 text-white flex flex-col">
                    <div className="p-6 text-2xl font-bold border-b border-gray-700">
                        Admin Dashboard
                    </div>
                    <div className="flex-grow">
                        <AdminMenu />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow p-6">
                    <div className="bg-white shadow rounded-lg p-8">
                        <h1>{auth?.user?.name}</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashBoard
