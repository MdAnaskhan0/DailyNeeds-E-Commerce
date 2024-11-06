import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
