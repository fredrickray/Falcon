import React from 'react';
import AsideBar from '../../components/AsideBar';
import CopyToClipboardLink from '../../components/ClipBoard';
import useFetchStore from '../../hooks/useFetchStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ManageStore = () => {
    const { store, data } = useFetchStore(`http://localhost:9000/store/get-store/`)
    const link = `http://localhost:3000/Store/${store}`
    const textToCopy = link
    const navigate = useNavigate()

    if (data) {
        return (
            <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
                <AsideBar />
                <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                    <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" navbar-main navbar-scroll="true">
                        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                            <nav>
                                {/* <!-- breadcrumb --> */}
                                <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                                    <li className="leading-normal text-sm">
                                        <a className="opacity-50 text-slate-700" href>Home</a>
                                    </li>
                                    <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">Store</li>
                                    <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">Products</li>
                                </ol>
                                <h6 className="mb-0 font-bold capitalize">Products</h6>
                            </nav>
                            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">

                                <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                                    <li className="flex items-center pl-4 xl:hidden">
                                        <a href className="block p-0 transition-all ease-nav-brand text-sm text-slate-500" sidenav-trigger>
                                            <div className="w-4.5 overflow-hidden">
                                                <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                                <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                                <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className='flex justify-between mt-1'>
                        <h3 style={{ paddingLeft: "40px", paddingTop: "20px" }}>Store settings</h3>
                        <button
                            type="button"
                            className="inline-block ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-green-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                            style={{ background: '#FF9B00', marginRight: "4%" }}
                            onClick={() => navigate('/Store/setup/edit')}
                        >
                            Edit store
                        </button>
                    </div>

                    <div className="container-fluid">
                        <div className='border-b border-solid border-black' style={{ paddingLeft: "40px", paddingTop: "50px" }}>
                            <h3>{store}</h3>
                            <div className='flex'>
                                <p className='cursor-pointer underline' style={{ color: "blue" }}>{link}</p>
                                <CopyToClipboardLink text={textToCopy}>
                                    <i
                                        style={{ marginLeft: "15px", cursor: "pointer" }}
                                        className="fa fa-clone"
                                        aria-hidden="true"
                                    />
                                </CopyToClipboardLink>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        );
    }
    else {
        return (
            <div>
                <AsideBar />
                <main className='ease-soft-in-out xl:ml-68.5 relative h-screen max-h-screen rounded-xl transition-all duration-200'>
                    <nav className='relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start'
                        navbarmain='true' navbar-scroll='true'>
                        <div className='flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit'>
                            <nav>
                                {/* <!-- breadcrumb --> */}
                                <ol className='flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16'>
                                    <li className='leading-normal text-sm'>
                                        <a className='opacity-50 text-slate-700' href>Store</a>
                                    </li>
                                    <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current='page'>
                                        Create product
                                    </li>
                                </ol>
                                <h6 className='mb-0 font-bold capitalize'>Create product</h6>
                            </nav>
                            <div className='flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto'>
                                <ul className='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
                                    {/* <!-- online builder btn  --> */}
                                    <li className='flex items-center pl-4 xl:hidden'>
                                        <a href className='block p-0 transition-all ease-nav-brand text-sm text-slate-500' sidenav-trigger>
                                            <div className='w-4.5 overflow-hidden'> <i className='ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all' /> <i className='ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all'
                                            /> <i className='ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all' /> </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <section className='min-h-screen mb-32' style={{ marginLeft: '21%', marginTop: '10%' }}>
                        {/* {handleShipping && ( */}
                        <div style={{ marginTop: '3%' }}>
                            <h1>You have not created a store yet</h1>
                            <h5 className='leading-tight text-xs text-slate-400'>
                                Begin right away!!
                            </h5>
                            <button
                                className='inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                                type=''
                                style={{ background: '#FF9B00' }}
                            >
                                <Link to="/Store/new">Create Store</Link>
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default ManageStore;