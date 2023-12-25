import React, { useState, useEffect } from 'react';
import AsideBar from '../../components/AsideBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LineWave } from 'react-loader-spinner';

const OrderDetail = () => {
    const { tx_ref } = useParams()
    const [orderDetail, setOrderDetail] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isFetching, setIsFetching] = useState(false)
    // console.log(orderDetail)
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true)
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_LOCAL_URL}/payment/order/order_details/${tx_ref}`)
                if (response.status === 400) {
                    setIsFetching(false)
                    return
                }
                else {
                    console.log(response.data)
                    setOrderDetail(response.data)
                    setIsFetching(false)
                }
    
            }
            catch (error) {
                console.log(error)
                setIsFetching(false)
            }
        }
        fetchData()
    }, [tx_ref])

    

    // const check = () => console.log("Clicking")

    useEffect(() => {
        if (orderDetail) {
            // Filter the data and update filteredProducts
            const filtered = orderDetail.filter(item =>
                item.name.toLowerCase().includes(searchItem.toLowerCase())
                // item.lastname.toLowerCase().includes(searchItem.toLowerCase())  
                // item.customer_emai.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [orderDetail, searchItem]);

    const handleNavOpen = () => setIsNavOpen(prev => !prev)

    // if (store) {
        return (
            <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
                <AsideBar handleNavOpen={handleNavOpen} isNavOpen={isNavOpen} />

                <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                    <nav
                        className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
                        navbar-main
                        navbar-scroll="true"
                    >
                        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                            <nav>
                                {/* <!-- breadcrumb --> */}
                                <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                                    <li className="leading-normal text-sm">
                                        <a className="opacity-50 text-slate-700" href>
                                            Home
                                        </a>
                                    </li>
                                    <li
                                        className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                                        aria-current="page"
                                    >
                                        Order
                                    </li>
                                    <li
                                        className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                                        aria-current="page"
                                    >
                                        List
                                    </li>
                                </ol>
                                <h6 className="mb-0 font-bold capitalize">Order List</h6>
                            </nav>

                            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                                <div className="flex items-center md:ml-auto md:pr-4">
                                    <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                                        <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                                            <i className="fas fa-search" aria-hidden="true" />
                                        </span>
                                        <input
                                            type="text"
                                            className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                            placeholder="Search..."
                                            onChange={e => setSearchItem(e.target.value)} value={searchItem}
                                        />
                                    </div>
                                </div>
                                <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                                    {/* <!-- online builder btn  --> */}


                                    <li className="flex items-center pl-4 xl:hidden">
                                        <a
                                            href
                                            className="block p-0 transition-all ease-nav-brand text-sm text-slate-500"
                                            sidenav-trigger
                                        >
                                            <div onClick={handleNavOpen} className="w-4.5 overflow-hidden">
                                                <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`} />
                                                <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                                <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`} />
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {isFetching && (
                        <LineWave
                            height="300"
                            width="300"
                            color="black"
                            ariaLabel="line-wave"
                            wrapperStyle={{ justifyContent: "center", position: "fixed", display: "flex", alignItems: "center", transform: "translate(-30%, -70%)", top: "50%", left: "50%", }}
                            wrapperClass=""
                            visible={true}
                            firstLineColor=""
                            middleLineColor=""
                            lastLineColor=""
                        />
                    )}

                    {!isFetching && orderDetail && (
                        <div className="flex flex-wrap -mx-3 mt-5%" style={{ marginTop: '5%' }}>
                            <div className="flex-none w-full max-w-full px-3">
                                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                    <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                        <h6>{orderDetail.length} List</h6>
                                        <div className='flex flex-wrap'>
                                            <label className='font-bold capitalize text-slate-900'>Created:</label>
                                            <p className='cursor-pointer' style={{ color: "blue", marginLeft: "20px" }}>{new Date(orderDetail[0].created_at).toLocaleDateString()}</p>
                                            {/* <CopyToClipboardLink text={textToCopy}>
                                            <i
                                                style={{ marginLeft: "15px", cursor: "pointer" }}
                                                className="fa fa-clone"
                                                aria-hidden="true"
                                            />
                                        </CopyToClipboardLink> */}
                                        </div>
                                    </div>
                                    <div className="flex-auto px-0 pt-0 pb-2">
                                        <div className="p-0 overflow-x-auto">
                                            <table className="items-center w-full mb-0 align-top border-gray-200 text-black-500">
                                                <thead className="align-bottom">
                                                    <tr>
                                                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900 ">
                                                            Name
                                                        </th>
                                                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                                                            Price
                                                        </th>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                                                            Quantity
                                                        </th>
                                                        {/* <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                                                        Tx_Ref
                                                    </th>
                                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                                                        Date
                                                    </th> */}
                                                    </tr>
                                                </thead>
                                                {filteredProducts?.length === 0 ? (
                                                    <p style={{ marginLeft: "140%", fontSize: "20px" }} className='p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent'>No item found</p>
                                                ) : (
                                                    <tbody>
                                                        {filteredProducts?.map((result) => (
                                                            <tr
                                                                key={result.id}
                                                                // onClick={() => navigate(`/Store/Product/${result.id}`)}
                                                                className='cursor-pointer'>

                                                                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent"
                                                                // style={{ textDecoration: "none", width: "100%" }}
                                                                >
                                                                    <div className="flex px-2 py-1" >
                                                                        <div>
                                                                            <img
                                                                                src={result.image}
                                                                                className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
                                                                                alt="user1"
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-col justify-center">
                                                                            <h6 className="mb-0 leading-normal text-sm">
                                                                                {result.name}
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                    <p className="mb-0 font-semibold leading-tight text-xs">
                                                                        ₦{result.price.toLocaleString()}
                                                                    </p>
                                                                </td>

                                                                <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                    <span className="font-semibold leading-tight text-xs text-black-400">
                                                                        {result.quantity}
                                                                    </span>
                                                                </td>

                                                                {/* <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <span className="font-semibold leading-tight text-xs text-slate-400">
                                                                {new Date(result.created_at).toLocaleDateString()}
                                                            </span>
                                                        </td> */}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                )}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isFetching && (!orderDetail || orderDetail.length === 0) && (
                        <div className='mt-4 ml-20' style={{ marginTop: "15%", marginLeft: "5%" }}>
                            <h1 className='text-md' style={{ fontSize: "25px", paddingTop: "20%" }}>
                                There are no orders to show <br />within this period.
                            </h1>
                            <p>
                                Your customers might be looking for ways to pay you, create a product<br /> and start selling.
                            </p>
                        </div>
                    )}

                    {!isFetching && orderDetail === null && (
                        <div className='mt-4 ml-20' style={{ marginTop: "15%", marginLeft: "5%" }}>
                            <h1 className='text-md ' style={{ fontSize: "32px", justifyContent: "center" }}>
                                There were no item found <br />for the provided tx_ref.
                            </h1>
                            <p>
                                Order list doesn't exist or it was deleted <br /> Go back and try again .
                            </p>
                        </div>
                    )}

                </main>
            </div>
        );
    // }
}

export default OrderDetail;