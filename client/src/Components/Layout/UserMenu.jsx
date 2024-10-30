import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="bg-gray-800 text-white w-full md:w-64 p-6 rounded-md">
                <nav className="flex flex-col space-y-4">
                    <NavLink
                        to="/dashboard/user/profile"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        activeClassName="bg-gray-700"
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        to="/dashboard/user/orders"
                        className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        activeClassName="bg-gray-700"
                    >
                        Orders
                    </NavLink>
                </nav>
            </div>
        </>
    )
}

export default UserMenu
