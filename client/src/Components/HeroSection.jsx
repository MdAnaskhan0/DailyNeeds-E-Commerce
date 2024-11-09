import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const images = [
        'https://cdn.pixabay.com/photo/2020/07/16/19/37/fashion-5412084_1280.jpg',
        'https://img.freepik.com/free-photo/girl-with-suspicious-look-hand-her-side-white-isolated-background_1258-110004.jpg?t=st=1731098365~exp=1731101965~hmac=fcffbfc4d39ffdab0627abe188c59edaf16033a1188840ca01340dd149cc309d&w=1380',
        'https://img.freepik.com/free-photo/3d-illustration-laptop-with-shopping-basket-paper-bags-online-shopping-e-commerce-concept_58466-14623.jpg?t=st=1731098530~exp=1731102130~hmac=580d3dd37ac3f3544085d0e07fa3fff486dee3a21c1b66999687f4b82cf459f7&w=996',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleScrollToProduct = () => {
        const productElement = document.getElementById('product');
        if (productElement) {
            productElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative h-[50vh] w-full overflow-hidden rounded-lg border-none">
            {images.map((url, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-transform duration-[3s] ease-in-out ${index === currentIndex ? 'transform translate-x-0' : 'transform -translate-x-full'
                        }`} 
                    style={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Favorite Outfit</h1>
                            <p className="text-lg md:text-xl mb-6">Shop the latest trends in fashion with exclusive deals and free shipping.</p>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-10 rounded-full font-semibold shadow-md transition duration-300" onClick={handleScrollToProduct}>
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroSection;
