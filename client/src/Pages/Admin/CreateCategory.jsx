import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Modal} from 'antd';
import CategoryForm from '../../Components/Form/categoryForm';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    // Handle category update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_REGISTER_URL}/api/v1/category/update-category/${selected._id}`, {
                name: updatedName,
            });
            if (data.success) {
                toast.success(data.message);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Handle category delete
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_REGISTER_URL}/api/v1/category/delete-category/${id}`);
            if (data.success) {
                toast.success(`${name} deleted successfully`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_REGISTER_URL}/api/v1/category/create-category`, {
                name,
            });
            if (data?.success) {
                toast.success(data.message);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REGISTER_URL}/api/v1/category/get-category`);
            if (data.success) {
                setCategories(data.allCategory);
            } else {
                toast.error("API fetching error");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <Layout>
            <div className="flex min-h-screen bg-gray-100">
                {/* Admin Sidebar */}
                <div className="w-64 bg-gray-800 text-white flex flex-col">
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
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Categories</h2>

                        {/* Category Form */}
                        <div className='mb-4'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>

                        <div>
                            <table className="min-w-full table-auto  border-none shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
                                <thead className="bg-gray-800 text-white border-none rounded-lg">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xl font-medium">Category Name</th>
                                        <th className="px-6 py-3 text-center text-xl font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {categories &&
                                        categories.map((category) => (
                                            <tr key={category._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-center text-[18px] font-medium text-gray-900">{category.name}</td>
                                                <td className="px-6 py-4 text-center text-[18px] font-medium text-gray-500">
                                                    <button
                                                        className="text-white text-sm font-semibold rounded-sm hover:bg-slate-600 hover:text-white bg-slate-500 px-5 py-2 mx-4"
                                                        onClick={() =>{
                                                            setVisible(true);
                                                            setSelected(category);
                                                            setUpdatedName(category.name);
                                                        } }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-white text-sm font-semibold rounded-sm hover:bg-red-600 hover:text-white bg-slate-500 px-5 py-2 mx-4"
                                                        onClick={() => handleDelete(category._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible} >
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
