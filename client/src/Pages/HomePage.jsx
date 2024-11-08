import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
// import { useAuth } from '../Context/Auth'
import axios from 'axios'
import { Checkbox, Radio} from 'antd'

const HomePage = () => {

    // const [auth, setAuth] = useAuth()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])

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
            <div>
                <div>
                    {/* Filter by Category */}
                    <div>
                        <h6>Filter By Category</h6>
                        <div>
                            {categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                            ))}
                        </div>
                    </div>

                    {/* Filter by Price*/}
                    <div>
                        <h6>Filter By Price</h6>
                        <div>
                            {categories?.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    {JSON.stringify(checked, null, 4)}
                    <h1>All Products</h1>
                    <div>
                        {products?.map((p) => (
                            <div>
                                <img src={`${import.meta.env.VITE_REGISTER_URL}/api/v1/products/product-photo/${p._id}`} alt={p.name} />
                                <div>
                                    <h5>{p.name}</h5>
                                    <p>{p.description}</p>
                                    <p>{p.price}</p>
                                </div>
                                <div>
                                    <button>Show Details</button>
                                    <button>Buy Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
