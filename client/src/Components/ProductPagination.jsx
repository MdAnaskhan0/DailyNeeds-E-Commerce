import React from 'react';

const ProductPagination = ({ currentPage, totalPages, onChangePage }) => {
    // Function to handle page change
    const handlePageChange = (page) => {
        onChangePage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`page-button ${currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="pagination-container mt-4">
            <div className="pagination-buttons flex justify-left items-center space-x-2">
                {/* Previous Button */}
                <button
                    className="mt-5 px-5 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>


                <div className='text-lg flex space-x-2 pt-4 active:text-black'>
                    {renderPageNumbers()}
                </div>


                <button
                    className="mt-5 px-5 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Load More
                </button>
            </div>
        </div>
    );
};

export default ProductPagination;
