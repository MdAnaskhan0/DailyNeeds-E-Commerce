import React, { useState } from 'react';
import { useSearch } from '../../Context/Search';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [value, setValue] = useState('');
    const [search, setSearch] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch({ ...search, keyword: value });
        // navigate(`/search?query=${value}`);
        navigate(`/search`);
    };

    return (
        <div className="flex justify-center items-center px-2">
            <form
                onSubmit={handleSubmit}
                className="flex items-center lg:w-[400px] w-full max-w-screen-lg border border-gray-300 rounded-md"
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="input input-bordered w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
                <button
                    type="submit"
                    className="px-3 py-2 bg-gray-500 text-white rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>
        </div>

    );
};

export default SearchInput;
