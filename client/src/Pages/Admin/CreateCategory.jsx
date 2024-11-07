import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from 'antd';
import CategoryForm from '../../Components/Form/categoryForm';
import { useTable, useGlobalFilter } from 'react-table';

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
                setVisible(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    // Handle category delete
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_REGISTER_URL}/api/v1/category/delete-category/${id}`);
            if (data.success) {
                toast.success("Category deleted successfully");
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
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
                setName("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
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
            console.error(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // React Table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Category Name',
                accessor: 'name',
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div className="flex justify-left">
                        <button
                            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 mx-2"
                            onClick={() => {
                                setVisible(true);
                                setSelected(row.original);
                                setUpdatedName(row.original.name);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 mx-2"
                            onClick={() => handleDelete(row.original._id)}
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
        {
            columns,
            data: categories,
        },
        useGlobalFilter
    );

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
                    <div className="bg-white shadow rounded-lg p-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Categories</h2>

                            {/* Category Form */}
                            <div className='mb-4'>
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} className="w-full px-4 py-4 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300" />
                            </div>
                        </div>

                        {/* React Table */}
                        <div className='lg:max-w-[750px]'>
                            <input
                                type="text"
                                className="w-full px-4 py-4 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
                                placeholder="Search categories..."
                                onChange={(e) => setGlobalFilter(e.target.value)}
                            />
                            <table {...getTableProps()} className="w-full table-auto border border-gray-200 rounded mb-5">
                                <thead className="bg-gray-700 text-white">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps()}
                                                    className="px-4 py-2 text-left"
                                                >
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                                {row.cells.map((cell) => (
                                                    <td {...cell.getCellProps()} className="px-4 py-2 text-gray-800">
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
