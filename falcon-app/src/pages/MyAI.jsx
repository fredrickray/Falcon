import React from 'react';
import AsideBar from '../components/AsideBar';

const MyAI = () => {
    return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-slate-500">
            <AsideBar />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                <nav
                    class="flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start sticky top-[1%] backdrop-saturate-[200%] backdrop-blur-[30px] bg-[hsla(0,0%,100%,0.8)] shadow-blur z-110"
                    // navbarmain={true}
                    // navbar-scroll={true}
                >
                    <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                        <nav>
                            {/* <!-- breadcrumb --> */}
                            <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                                <li class="leading-normal text-sm">
                                    <a class="opacity-50 text-slate-700" href>Store</a>
                                </li>
                                <li
                                    class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                                    aria-current="page"
                                >
                                    New Store
                                </li>
                            </ol>
                            <h6 class="mb-0 font-bold capitalize">New Store</h6>
                        </nav>

                        <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                            <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                                {/* <!-- online builder btn  --> */}
                                <li class="flex items-center pl-4 xl:hidden">
                                    <a
                                        href
                                        class="block p-0 transition-all ease-nav-brand text-sm text-slate-500"
                                        sidenav-trigger
                                    >
                                        <div class="w-4.5 overflow-hidden">
                                            <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                            <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                            <i class="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </main>
        </div>
    );
}

export default MyAI;