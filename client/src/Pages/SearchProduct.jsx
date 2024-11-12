import React from 'react'
import Layout from '../Components/Layout/Layout'
import {useSearch} from '../Context/Search'
const SearchProduct = () => {

    const [values, setValues] = useSearch();

    return (
        <Layout>
            <div>
                <h1>Search Result</h1>
                <h6>{values.result.length < 1 ? "No Product Found" : `Found ${values?.result.length}`}</h6>
            </div>
        </Layout>
    )
}

export default SearchProduct
