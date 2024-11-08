import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REGISTER_URL}/api/v1/products/get-product`
            );
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // React Table configuration
    const columns = React.useMemo(
        () => [
            {
                Header: 'Image',
                accessor: '_id',
                Cell: ({ value }) => (
                    <img
                        src={`${import.meta.env.VITE_REGISTER_URL}/api/v1/products/product-photo/${value}`}
                        alt="product"
                        className="w-16 h-16 object-cover"
                    />
                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Category',
                accessor: 'category.name',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Price',
                accessor: 'price',
                sortType: 'number',
            },
            // New Action column
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <Link
                            to={`/dashboard/admin/product/${row.original.slug}`}
                            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Edit
                        </Link>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
    } = useTable({ columns, data: products }, useGlobalFilter, useSortBy);

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
                <div className="flex-grow p-4 sm:p-6">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6">
                        <h1 className="text-xl sm:text-2xl font-semibold mb-4">All Products List</h1>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                onChange={(e) => setGlobalFilter(e.target.value)}
                            />
                        </div>
                        <div className="overflow-x-auto">
                            <table
                                {...getTableProps()}
                                className="w-full border-collapse text-left text-gray-500"
                            >
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    className="px-4 py-2 bg-gray-100 font-medium"
                                                >
                                                    {column.render('Header')}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? ' 🔽'
                                                                : ' 🔼'
                                                            : ''}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                className="hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                {row.cells.map((cell) => (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-4 py-2 border-b border-gray-200"
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AllProducts;
