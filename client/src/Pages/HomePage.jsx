import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import HeroSection from "../Components/HeroSection";
import ProductPagination from "../Components/ProductPagination";
import FilterSection from "../Components/FilterSection";
import ProductList from "../Components/ProductList";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 12;

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

    // Get all products with pagination
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REGISTER_URL}/api/v1/products/get-product?page=${currentPage}&limit=${itemsPerPage}`
            );
            setProducts(data?.products);
            setTotalProducts(data?.total);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts();
    }, [checked.length, radio.length, currentPage]);

    // Get filtered products
    const getFilteredProducts = async () => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_REGISTER_URL}/api/v1/products/product-filters`,
                { checked, radio, page: currentPage, limit: itemsPerPage }
            );
            setProducts(data?.filterproduct);
            setTotalProducts(data?.total);
        } catch (error) {
            console.error("Error in getFilteredProducts:", error);
        }
    };

    useEffect(() => {
        if (checked.length || radio.length) getFilteredProducts();
    }, [checked, radio, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <HeroSection />
                <div id="product" className="text-2xl font-semibold my-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
                    <p className="text-gray-600 font-medium tracking-wider text-lg">
                        Check & Get Your Desired Product!
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Section */}
                    <FilterSection
                        categories={categories}
                        checked={checked}
                        setChecked={setChecked}
                        setRadio={setRadio}
                        onClear={() => { window.location.reload(); }}
                    />
                    {/* Products Section */}
                    <div className="w-full lg:w-3/4">
                        <ProductList products={products} />
                        <div className="mt-6">
                            <ProductPagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(totalProducts / itemsPerPage)}
                                onChangePage={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
