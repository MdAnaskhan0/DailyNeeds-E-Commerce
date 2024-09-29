import React from 'react';
import Layout from '../Components/Layout/Layout';

const About = () => {
    return (
        <Layout>
            <div className="bg-gray md:p-20">
                <div className="flex flex-col md:flex-row md:justify-between mb-10">
                    <div className="md:w-3/5 p-20">
                        <div className='flex flex-col align-center justify-center'>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                Our Dream is Global Learning Transformation
                            </h1>
                            <p className="text-lg text-gray-700 mb-6">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis eaque rem repellendus at aperiam! Maxime, officia. Maiores earum eveniet at exercitationem eos odio ducimus, alias ut consectetur sit. Id quam laboriosam fuga dicta architecto dolore perspiciatis suscipit? Voluptatibus hic assumenda odit officia architecto blanditiis aperiam, in debitis iure itaque quod quasi labore. Distinctio deserunt provident non rem culpa optio, dicta maiores laboriosam ipsam nihil iste, nisi ducimus sit magnam! Iure.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/5 md:pl-10 mb-6 md:mb-0 px-20">
                        <img
                            src="https://pbs.twimg.com/media/GYq2pQnacAAhRoD?format=jpg&name=4096x4096"
                            alt="Team working together"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center px-20">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-200">
                        <h2 className="text-3xl font-bold text-gray-800">3.5</h2>
                        <p className="text-gray-600">Years Experience</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-200">
                        <h2 className="text-3xl font-bold text-gray-800">23</h2>
                        <p className="text-gray-600">Project Challenges</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-200">
                        <h2 className="text-3xl font-bold text-gray-800">830+</h2>
                        <p className="text-gray-600">Positive Reviews</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-200">
                        <h2 className="text-3xl font-bold text-gray-800">100K</h2>
                        <p className="text-gray-600">Trusted Students</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default About;
