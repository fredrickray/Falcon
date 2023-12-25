import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Axios from "axios"
// import { LineWave } from "react-loader-spinner"
import AsideBar from '../components/AsideBar';
// import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MerchantDetail = () => {
    // const { email } = useParams()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    const [data, setData] = useState(null)
    const [totalTransaction, setTotalTransaction] = useState(0.00)
    // const [isFetching, setIsFetching] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false)
    useEffect(() => {
        if (email) {
            console.log(email)
            // getDetails()
        }
    }, [email])

    const getDetails = async () => {
        try {
            const response = await Axios.get(`http://localhost:9000/admin/test?email=${email}`)
            console.log(response.data.slice(0, 10))
            const responseData = response.data
            const totalTransaction = responseData.reduce((total, transaction) => {
                return total + transaction.amount
            }, 0)
            const formattedTotalTransactions = totalTransaction.toLocaleString()
            setTotalTransaction(formattedTotalTransactions)
            setData(response.data.slice(0, 10))
        } catch (error) {
            console.log(error)
        }
    }

    //     const createdAtDate = new Date(info.created_at);

    //   // Format the date to "26 March 2020, at 12:30 PM"
    //   const formattedCreatedAt = createdAtDate.toLocaleString('en-US', {
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: true,
    //   });

    const handleNavOpen = () => setIsNavOpen(prev => !prev)
    return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-50 text-slate-500">
            <AsideBar handleNavOpen={handleNavOpen} isNavOpen={isNavOpen} />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                {/* <!-- Navbar --> */}
                <nav
                    className=" flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all  duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start sticky top-[1%] backdrop-saturate-[200%] backdrop-blur-[30px] bg-[hsla(0,0%,100%,0.8)] shadow-blur z-110"
                    navbarmain="true"
                    navbar-scroll="true"
                >
                    <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                        <nav>
                            {/* <!-- breadcrumb --> */}
                            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                                <li className="leading-normal text-sm">
                                    <a className="opacity-50 text-slate-700" href>Home</a>
                                </li>
                                <li
                                    className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/'] cursor-pointer"
                                    aria-current="page"
                                >
                                    Merchant
                                </li>
                                <li
                                    className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                                    aria-current="page"
                                >
                                    Detail
                                </li>
                            </ol>
                            <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
                        </nav>

                        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                            <ul style={{ marginLeft: "70%" }} className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                                {/* <!-- online builder btn  --> */}
                                <li className="flex items-center pl-4 xl:hidden">
                                    <a
                                        href
                                        className="block p-0 transition-all ease-nav-brand text-sm text-slate-500 sidenav-trigger"

                                    >
                                        <div className="w-4.5 overflow-hidden" onClick={handleNavOpen}>
                                            <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`} />
                                            <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                            <i className={`ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`} />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="w-full px-6 py-6 mx-auto">
                    {/* <!-- content --> */}

                    <div className="flex flex-wrap -mx-3">
                        <div className="max-w-full px-3 lg:w-2/3 lg:flex-none">
                            <div className="flex flex-wrap -mx-3">

                                <div className="w-full max-w-full px-3 xl:w-full xl:flex-col">
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none">
                                            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                                <div className="p-4 mx-6 mb-0 text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                                    <div className="w-16 h-16 text-center bg-center icon bg-black shadow-soft-2xl rounded-xl">
                                                        <i className="relative text-white opacity-100 fas fa-landmark text-xl top-31/100"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-auto p-4 pt-0 text-center">
                                                    <h6 className="mb-0 text-center">Transactions</h6>
                                                    <span className="leading-tight text-xs">Total Money</span>
                                                    <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                                                    <h5 className="mb-0">₦ {totalTransaction}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full max-w-full px-3 mt-6 md:mt-0 md:w-1/2 md:flex-none">
                                            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                                <div className="p-4 mx-6 mb-0 text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                                    <div className="w-16 h-16 text-center bg-center icon bg-black shadow-soft-2xl rounded-xl">
                                                        <i className="relative text-white opacity-100 fab fa-paypal text-xl top-31/100"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-auto p-4 pt-0 text-center">
                                                    <h6 className="mb-0 text-center">Products</h6>
                                                    <span className="leading-tight text-xs">Total Products</span>
                                                    <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                                                    <h5 className="mb-0">$455.00</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full max-w-full px-3 lg:w-1/3 lg:flex-none">
                            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                                            <h6 className="mb-0">Invoices</h6>
                                        </div>
                                        <div className="flex-none w-1/2 max-w-full px-3 text-right">
                                            <button className="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75">View All</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-auto p-4 pb-0">
                                    <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                                            <div className="flex flex-col">
                                                <h6 className="mb-1 font-semibold leading-normal text-sm text-slate-700">March, 01, 2020</h6>
                                                <span className="leading-tight text-xs">#MS-415646</span>
                                            </div>
                                            <div className="flex items-center leading-normal text-sm">
                                                $180
                                                <button className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 fas fa-file-pdf text-lg"></i> PDF</button>
                                            </div>
                                        </li>
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                                            <div className="flex flex-col">
                                                <h6 className="mb-1 font-semibold leading-normal text-sm text-slate-700">February, 10, 2021</h6>
                                                <span className="leading-tight text-xs">#RV-126749</span>
                                            </div>
                                            <div className="flex items-center leading-normal text-sm">
                                                $250
                                                <button className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 fas fa-file-pdf text-lg"></i> PDF</button>
                                            </div>
                                        </li>
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                                            <div className="flex flex-col">
                                                <h6 className="mb-1 font-semibold leading-normal text-sm text-slate-700">April, 05, 2020</h6>
                                                <span className="leading-tight text-xs">#FB-212562</span>
                                            </div>
                                            <div className="flex items-center leading-normal text-sm">
                                                $560
                                                <button className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 fas fa-file-pdf text-lg"></i> PDF</button>
                                            </div>
                                        </li>
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                                            <div className="flex flex-col">
                                                <h6 className="mb-1 font-semibold leading-normal text-sm text-slate-700">June, 25, 2019</h6>
                                                <span className="leading-tight text-xs">#QW-103578</span>
                                            </div>
                                            <div className="flex items-center leading-normal text-sm">
                                                $120
                                                <button className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 fas fa-file-pdf text-lg"></i> PDF</button>
                                            </div>
                                        </li>
                                        <li className="relative flex justify-between px-4 py-2 pl-0 bg-white border-0 rounded-b-inherit rounded-xl text-inherit">
                                            <div className="flex flex-col">
                                                <h6 className="mb-1 font-semibold leading-normal text-sm text-slate-700">March, 01, 2019</h6>
                                                <span className="leading-tight text-xs">#AR-803481</span>
                                            </div>
                                            <div className="flex items-center leading-normal text-sm">
                                                $300
                                                <button className="inline-block px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 text-sm active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 fas fa-file-pdf text-lg"></i> PDF</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full max-w-full px-3 mt-6 md:w-7/12 md:flex-none">
                            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                    <h6 className="mb-0">Products</h6>
                                </div>
                                <div className="flex-auto p-4 pt-6">
                                    <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                        {data?.map(info => (
                                            <li key={info.transaction_id} className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                                                <div className="flex flex-col">
                                                    <h6 className="mb-4 leading-normal text-sm">{info.name}</h6>
                                                    <span className="mb-2 leading-tight text-xs">Price: <span className="font-semibold text-slate-700 sm:ml-2">₦{info.price.toLocaleString()}</span></span>
                                                    <span className="mb-2 leading-tight text-xs">Quantity: <span className="font-semibold text-slate-700 sm:ml-2">{info.quantity}</span></span>
                                                    <span className="leading-tight text-xs">Created At: <span className="font-semibold text-slate-700 sm:ml-2">{info.created_at}</span></span>
                                                </div>
                                                <div className="ml-auto text-right">
                                                    <img src={info.image} alt="" style={{ height: "100px", width: "100px", borderRadius: "10px" }} />
                                                </div>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-full px-3 mt-6 md:w-5/12 md:flex-none">
                            <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                                            <h6 className="mb-0">Transactions</h6>
                                        </div>
                                        <div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
                                            {/* <i className="mr-2 far fa-calendar-alt"></i> */}
                                            <input type="month" name="" value="" className='mr-2' />
                                            {/* <small>23 - 30 March 2020</small> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-auto p-4 pt-6">
                                    <h6 className="mb-4 font-bold leading-tight uppercase text-xs text-slate-500">Newest</h6>
                                    <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                        {data?.map(info => {
                                            const createdAtDate = new Date(info.created_at);

                                            // Format the date to "26 March 2020, at 12:30 PM"
                                            const formattedCreatedAt = createdAtDate.toLocaleString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            });
                                            return (
                                                <li key={info.transaction_id} className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                                                    <div className="flex items-center">
                                                        <button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-red-600 border-transparent bg-transparent text-center align-middle font-bold uppercase text-red-600 transition-all hover:opacity-75"><i className="fas fa-arrow-down text-3xs"></i></button>
                                                        <div className="flex flex-col">
                                                            <h6 className="mb-1 leading-normal text-sm text-slate-700">{info.firstname} {info.lastname}</h6>
                                                            <span className="leading-tight text-xs">{formattedCreatedAt}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center">
                                                        <p className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">₦{info.amount.toLocaleString()}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}

                                    </ul>
                                    <h6 className="my-4 font-bold leading-tight uppercase text-xs text-slate-500">Yesterday</h6>
                                    <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                                            <div className="flex items-center">
                                                <button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75"><i className="fas fa-arrow-up text-3xs"></i></button>
                                                <div className="flex flex-col">
                                                    <h6 className="mb-1 leading-normal text-sm text-slate-700">Stripe</h6>
                                                    <span className="leading-tight text-xs">26 March 2020, at 13:45 PM</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">+ $ 750</p>
                                            </div>
                                        </li>
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 text-inherit rounded-xl">
                                            <div className="flex items-center">
                                                <button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75"><i className="fas fa-arrow-up text-3xs"></i></button>
                                                <div className="flex flex-col">
                                                    <h6 className="mb-1 leading-normal text-sm text-slate-700">HubSpot</h6>
                                                    <span className="leading-tight text-xs">26 March 2020, at 12:30 PM</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">+ $ 1,000</p>
                                            </div>
                                        </li>
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 text-inherit rounded-xl">
                                            <div className="flex items-center">
                                                <button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75"><i className="fas fa-arrow-up text-3xs"></i></button>
                                                <div className="flex flex-col">
                                                    <h6 className="mb-1 leading-normal text-sm text-slate-700">Creative Tim</h6>
                                                    <span className="leading-tight text-xs">26 March 2020, at 08:30 AM</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="relative z-10 items-center inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">+ $ 2,500</p>
                                            </div>
                                        </li>
                                        <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 rounded-b-inherit text-inherit rounded-xl">
                                            <div className="flex items-center">
                                                <button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-slate-700 border-transparent bg-transparent text-center align-middle font-bold uppercase text-slate-700 transition-all hover:opacity-75"><i className="fas fa-exclamation text-3xs"></i></button>
                                                <div className="flex flex-col">
                                                    <h6 className="mb-1 leading-normal text-sm text-slate-700">Webflow</h6>
                                                    <span className="leading-tight text-xs">26 March 2020, at 05:00 AM</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="flex items-center m-0 font-semibold leading-normal text-sm text-slate-700">Pending</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <footer className="pt-4">
                        <div className="w-full px-6 mx-auto">
                            <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
                                <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                                    <div className="leading-normal text-center text-sm text-slate-500 lg:text-left">
                                        ©
                                        <script>
                                            document.write(new Date().getFullYear() + ",");
                                        </script>
                                        made with <i className="fa fa-heart"></i> by
                                        <a href="https://www.creative-tim.com" className="font-semibold text-slate-700">Creative Tim</a>
                                        for a better web.
                                    </div>
                                </div>
                                <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                                    <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com" className="block px-4 pt-0 pb-1 font-normal transition-colors ease-soft-in-out text-sm text-slate-500" >Creative Tim</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/presentation" className="block px-4 pt-0 pb-1 font-normal transition-colors ease-soft-in-out text-sm text-slate-500">About Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://creative-tim.com/blog" className="block px-4 pt-0 pb-1 font-normal transition-colors ease-soft-in-out text-sm text-slate-500">Blog</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/license" className="block px-4 pt-0 pb-1 pr-0 font-normal transition-colors ease-soft-in-out text-sm text-slate-500">License</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer> */}
                </div>
            </main>
        </div>
    );
}

export default MerchantDetail;