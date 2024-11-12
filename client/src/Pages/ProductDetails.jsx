import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IoHeartOutline } from "react-icons/io5";
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REGISTER_URL}/api/v1/products/single-product/${slug}`);
            setProduct(data.singleproduct);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Failed to load product details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) getProductDetails();
    }, [slug]);

    // Handlers for quantity change
    const handleIncrement = () => {
        if (product?.quantity > quantity) {  
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {  
            setQuantity(quantity - 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Layout>
            <div className="container mx-auto p-4 mt-10">
                {/* Product Details */}
                <div className="flex flex-col md:flex-row gap-2 shadow-lg p-10">
                    {/* Product Image */}
                    <div className="flex justify-center lg:w-1/2 p-4">
                        <div className="transform scale-100 hover:scale-105 transition duration-300 ease-in-out border-gray-300 p-4 rounded-lg">
                            <img
                                src={`${import.meta.env.VITE_REGISTER_URL}/api/v1/products/product-photo/${product?._id}`}
                                alt={product?.name}
                                className="w-full max-w-[400px] h-[400px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4">{product?.name}</h2>
                        <p className="text-black text-xl font-semibold mb-4">Price: {product?.price}<span className='text-base font-extrabold'>৳</span></p>
                        <p className="text-black-600 mb-4 flex text-yellow-500">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <span className="ml-1 text-sm text-gray-500">5.0</span>
                            <span className="ml-1 text-sm text-gray-500">(84 reviews)</span>
                        </p>
                        <p className="text-black-600 text-base font-medium mb-4">Category: {product?.category?.name}</p>
                        <p className="text-black text-base font-medium mb-4">Brand: {product?.name.split(' ')[0]}</p>
                        <p className="text-black mb-4 ">
                            <span className='border px-4 py-2 bg-orange-600 text-white rounded-md'>
                                {product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </p>
                        <p className="text-black mb-4 max-w-[400px]">Description: {product?.description}</p>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                className="bg-white text-black py-2 px-4 border rounded"
                                onClick={handleIncrement}
                                disabled={product?.quantity <= quantity}
                            >
                                +
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                                className="w-16 text-center border py-2"
                                min="1"
                            />
                            <button
                                className="bg-white text-black py-2 px-4 border rounded"
                                onClick={handleDecrement}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                        </div>

                        {/* Add to Cart & Wishlist */}
                        <div className="flex gap-2">
                            <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
                                Add to Cart
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-600 text-black py-2 px-4 rounded ml-2 flex gap-2 justify-center items-center">
                                <IoHeartOutline className="text-2xl" />
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className='mt-10'>
                    <hr className='border' />
                    <h2 className='text-2xl font-bold mt-4'>Related Products</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                        {product?.relatedProducts?.map((relatedProduct) => (
                            <ProductCard key={relatedProduct._id} product={relatedProduct} />
                        ))}
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
