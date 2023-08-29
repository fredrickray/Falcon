import React, { useState } from 'react';
import AsideBar from '../components/AsideBar';

const MyAI = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const handleNavOpen = () => setIsNavOpen(prev => !prev)


    return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-slate-500">
            <AsideBar handleNavOpen={handleNavOpen} isNavOpen={isNavOpen} />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                <nav
                    className="flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start sticky top-[1%] backdrop-saturate-[200%] backdrop-blur-[30px] bg-[hsla(0,0%,100%,0.8)] shadow-blur z-110"
                // navbarmain={true}
                // navbar-scroll={true}
                >
                    <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                        <nav>
                            {/* <!-- breadcrumb --> */}
                            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                                <li className="leading-normal text-sm">
                                    <a className="opacity-50 text-slate-700" href>Store</a>
                                </li>
                                <li
                                    className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                                    aria-current="page"
                                >
                                    New Store
                                </li>
                            </ol>
                            <h6 className="mb-0 font-bold capitalize">New Store</h6>
                        </nav>

                        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                            <ul style={{ marginLeft: "50%" }} className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                                {/* <!-- online builder btn  --> */}
                                <li className="flex items-center pl-4 xl:hidden">
                                    <a
                                        href
                                        className="block p-0 transition-all ease-nav-brand text-sm text-slate-500"
                                        sidenav-trigger
                                    >
                                        <div className="w-4.5 overflow-hidden" onClick={handleNavOpen}>
                                            <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`}></i>
                                            <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                            <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`}></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="flex flex-wrap mt-6 -mx-3 w-full">
                    <div className="w-full px-3 mb-6 lg:mb-0 ml-[5%] lg:flex-none">
                        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                                        <div className="flex flex-col h-full">
                                            <p className="pt-2 mb-1 font-semibold">
                                                Most recent product
                                            </p>
                                            <h5 className="font-bold">I'm my own Bo$$</h5>
                                            <p className="mb-12">
                                                From clothing line, to various products, advertise them now easily and faster
                                            </p>
                                            <a
                                                className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500"
                                                // to="/store/Products/new"
                                                href
                                            >
                                                Get started
                                                <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200" />
                                            </a>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <input
                          className="focus:shadow-soft-2xl absolute shadow-soft-2xl inset-x-0 bottom-0  text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-4 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                          id="name"
                          type="text"
                        />
                        <div className='relative'>
                        <i style={{position: "absolute", right: "0px", bottom: "20px", fontSize: "20px"}} className="fa fa-paper-plane" aria-hidden="true"></i>
                        </div>
                </div>

            </main>
        </div>
    );
}

export default MyAI;