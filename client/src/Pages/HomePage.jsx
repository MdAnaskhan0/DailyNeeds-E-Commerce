import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { FaStar } from "react-icons/fa";
import HeroSection from "../Components/HeroSection";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // Get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REGISTER_URL}/api/v1/category/get-category`
            );
            if (data.success) {
                setCategories(data.allCategory);
            } else {
                console.error("API fetching error");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Get products with pagination
    const getAllProducts = async (page = 1) => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REGISTER_URL}/api/v1/products/get-product?page=${page}&limit=10`
            );
            setProducts(data?.products);
            setTotalProducts(data?.total); // Set total number of products for pagination
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts(page);
    }, [checked.length, radio.length, page]);

    // Filter by category
    const handleFilter = (value, id) => {
        let updatedChecked = [...checked];
        if (value) {
            updatedChecked.push(id);
        } else {
            updatedChecked = updatedChecked.filter((item) => item !== id);
        }
        setChecked(updatedChecked);
    };

    const getFilteredProducts = async () => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_REGISTER_URL}/api/v1/products/product-filters`,
                { checked, radio }
            );
            setProducts(data?.filterproduct);
        } catch (error) {
            console.error("Error in getFilteredProducts:", error);
        }
    };

    useEffect(() => {
        if (checked.length || radio.length) getFilteredProducts();
    }, [checked, radio]);

    // Pagination Handlers
    const handleNextPage = () => {
        if (page * 10 < totalProducts) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div>
                    <HeroSection />
                </div>

                <div id="product" className="text-2xl font-semibold my-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
                    <p className="text-gray-600 font-medium tracking-wider text-lg">
                        Check & Get Your Desired Product!
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full max-h-[70vh] lg:w-1/4 bg-white shadow-md rounded-lg p-6">
                        <div className="mb-6">
                            <h6 className="text-lg font-semibold mb-4">Filter By Category</h6>
                            <div className="space-y-2">
                                {categories?.map((c) => (
                                    <div key={c._id} className="flex items-center">
                                        <Checkbox
                                            onChange={(e) => handleFilter(e.target.checked, c._id)}
                                            className="text-sm text-gray-600"
                                        >
                                            {c.name}
                                        </Checkbox>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h6 className="text-lg font-semibold mb-4">Filter By Price</h6>
                            <Radio.Group
                                onChange={(e) => setRadio(e.target.value)}
                                className="space-y-2"
                            >
                                {PriceCategory?.map((p) => (
                                    <div key={p._id} className="flex items-center">
                                        <Radio value={p.array} className="text-sm text-gray-600">
                                            {p.name}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div>
                            <button className="mt-5 px-5 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors" onClick={() => window.location.reload()}>
                                Clear Filter
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products?.map((p) => (
                                <div
                                    key={p._id}
                                    className="bg-white rounded-lg shadow-lg p-4 flex flex-col hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    <img
                                        src={`${import.meta.env.VITE_REGISTER_URL}/api/v1/products/product-photo/${p._id}`}
                                        alt={p.name}
                                        className="h-40 w-full object-contain rounded-md mb-4"
                                    />
                                    <div className="border-b border-gray-200 pb-2"></div>
                                    <div className="flex-grow pt-5">
                                        <h5 className="text-lg font-bold mb-2">{p.name}</h5>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                            {p.description.substring(0, 25)}...
                                        </p>
                                        <div className="flex gap-1">
                                            <div className="flex text-yellow-500">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <div>
                                                <span className="text-gray-600 text-sm">Best Rating</span>
                                            </div>
                                        </div>
                                        <p className="text-black-600 text-md font-semibold">
                                            <span>৳</span> {p.price}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 bg-gray-500 text-white text-sm py-2 rounded transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 shadow-md hover:shadow-lg">
                                            Show Details
                                        </button>
                                        <button className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm py-2 rounded transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 shadow-md hover:shadow-lg">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6">
                            <button
                                disabled={page === 1}
                                onClick={handlePrevPage}
                                className={`px-4 py-2 bg-gray-500 text-white rounded-md mr-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                            >
                                Previous
                            </button>
                            <button
                                disabled={page * 10 >= totalProducts}
                                onClick={handleNextPage}
                                className={`px-4 py-2 bg-gray-500 text-white rounded-md ${page * 10 >= totalProducts ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
