import React from 'react';
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import { useAuth } from '../../Context/Auth';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - ECommerce-App"}>
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <UserMenu />

        {/* Main Content */}
        <div className="bg-white p-6 rounded-md shadow-lg flex-grow">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <div className="text-lg text-gray-700">
            <p><strong>Name:</strong> {auth?.user?.name}</p>
            <p><strong>Email:</strong> {auth?.user?.email}</p>
            <p><strong>Phone:</strong> {auth?.user?.phone}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
