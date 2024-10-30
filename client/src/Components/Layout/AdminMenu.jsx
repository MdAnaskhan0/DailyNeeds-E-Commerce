import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="bg-gray-800 text-white w-64 p-6">
                <nav className="flex flex-col space-y-2">
                    <NavLink
                        to="/dashboard/admin/all-products"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        activeClassName="bg-gray-700"
                    >
                        All Products
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        activeClassName="bg-gray-700"
                    >
                        Create Category
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/add-product"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        activeClassName="bg-gray-700"
                    >
                        Add Product
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/all-user"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        activeClassName="bg-gray-700"
                    >
                        All Users
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/all-orders"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        activeClassName="bg-gray-700"
                    >
                        All Orders
                    </NavLink>
                </nav>
            </div>
        </>
    )
}

export default AdminMenu
