import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import { PriceCategory } from '../Components/PriceCategory'
// import { useAuth } from '../Context/Auth'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import HeroSection from '../Components/HeroSection'


const HomePage = () => {

    // const [auth, setAuth] = useAuth()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])

    // get products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REGISTER_URL}/api/v1/products/get-product`)
            setProducts(data?.products)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

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
            // toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    // Filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all.splice(all.indexOf(id), 1);
        }
        setChecked(all);
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">


                {/* Hero Section */}
                <div>
                    <HeroSection />
                </div>


                {/* Full Product Section */}
                <div id='product' className="text-2xl font-semibold my-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
                    <p className='text-gray-600 font-medium tracking-wider text-lg'>Check & Get Your Desired Product!</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Filter Section */}
                    <div className="w-full max-h-[60vh] lg:w-1/4 bg-white shadow-md rounded-lg p-4">
                        {/* Filter by Category */}
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

                        {/* Filter by Price */}
                        <div>
                            <h6 className="text-lg font-semibold mb-4">Filter By Price</h6>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)} className="space-y-2">
                                {PriceCategory?.map((p) => (
                                    <div key={p._id} className="flex items-center">
                                        <Radio value={p.array} className="text-sm text-gray-600">
                                            {p.name}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="w-full lg:w-3/4">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products?.map((p) => (
                                <div key={p._id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col hover:scale-105 transition duration-300 ease-in-out">
                                    <img
                                        src={`${import.meta.env.VITE_REGISTER_URL}/api/v1/products/product-photo/${p._id}`}
                                        alt={p.name}
                                        className="h-40 w-full object-contain rounded-md mb-4"
                                    />
                                    <div className='border-b border-gray-200 pb-2'>

                                    </div>
                                    <div className="flex-grow pt-5">
                                        <h5 className="text-lg font-bold mb-2">{p.name}</h5>
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{p.description}</p>
                                        <div className='flex gap-1'>
                                            <div className='flex text-yellow-500'>
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
                                        <p className="text-Black-600 text-md font-semibold"><span>৳</span> {p.price}</p>
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
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
