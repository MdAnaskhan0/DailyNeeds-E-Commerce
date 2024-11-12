import React from 'react';
import { Checkbox, Radio } from 'antd';
import { PriceCategory } from './PriceCategory';

const FilterSection = ({ categories, checked, setChecked, setRadio, onClear }) => {
    const handleFilter = (value, id) => {
        let updatedChecked = [...checked];
        if (value) {
            updatedChecked.push(id);
        } else {
            updatedChecked = updatedChecked.filter((item) => item !== id);
        }
        setChecked(updatedChecked);
    };

    return (
        <div className="w-full sm:max-h-[80vh] lg:w-1/4 bg-white shadow-md rounded-lg p-6">
            {/* Filter by Category */}
            <h6 className="text-lg font-semibold mb-4">Filter By Category</h6>
            <div className="space-y-2">
                {categories.map((c) => (
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
            {/* Filter by Price */}
            <h6 className="text-lg font-semibold mt-6 mb-4">Filter By Price</h6>
            <Radio.Group onChange={(e) => setRadio(e.target.value)} className="space-y-2">
                {/* Map through your price categories */}
                {PriceCategory.map((p) => (
                    <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                    </div>
                ))}
            </Radio.Group>
            <div>
                <button className="mt-5 px-5 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600" onClick={onClear}>
                    Clear Filter
                </button>
            </div>
        </div>
    );
};

export default FilterSection;
