import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-lg shadow-lg p-4 flex flex-col hover:scale-105 transition duration-300 ease-in-out"
        >
          <img
            src={`${
              import.meta.env.VITE_REGISTER_URL
            }/api/v1/products/product-photo/${p._id}`}
            alt={p.name}
            className="h-40 w-full object-contain rounded-md mb-4"
          />
          <div className="flex-grow">
            <h5 className="text-base font-semibold mb-2">{p.name}</h5>
            <p className="text-gray-600 text-sm mb-2">
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
              <span className="ml-1 text-sm text-gray-500">Best Rating</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="flex-1 bg-gray-500 text-white text-sm py-2 rounded"
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              More Details
            </button>
            <button className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm py-2 rounded">
              Add to Cart
            </button>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-xl font-semibold text-gray-800">
              ৳ {p.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
