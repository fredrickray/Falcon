import React from 'react';

const ServerError = () => {
    return (
        <div className="bg-gray-700">
            <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                    <p className="text-[10rem] md:text-[8rem] lg:text-[10rem] font-bold tracking-wider text-[#d1d5db]" >500</p>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-[#d1d5db] mt-2" >Server Error</p>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">Whoops, something went wrong on our servers.</p>
                </div>
                <div className="w-1/2 lg:h-full flex lg:items-end justify-center p-4">
                    <img alt='error' src="https://grafite.ca/img/svg/devops-flat.svg" className='w-full'/>
                </div>
            </div>
        </div>
    );
}

export default ServerError;