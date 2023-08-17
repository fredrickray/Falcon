import React, { useState, useEffect } from 'react';
import AsideBar from '../../components/AsideBar';
import axios from "axios";
import Swal from 'sweetalert2';



const Payments = () => {

    const [data, setData] = useState("")
    const { email } = localStorage
    const [searchItem, setSearchItem] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        handleGetPayments()
    }, [email])

    const handleGetPayments = async () => {
        try {
            const response = await axios.get('http://localhost:9000/payment/get_payment', {
                params: {
                    email,
                },
            });

            console.log(response.data)

            if (response.data.message === 'No transactions found for this email') {
                Swal.fire({
                    position: 'center',
                    toast: true,
                    title: response.data.message,
                    color: 'red',
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
            else {
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 2500,
                });
                setData(response.data.response)
            }
        }
        catch (error) {
            Swal.fire({
                position: 'top-end',
                toast: true,
                title: error.response.data.message,
                color: 'red',
                showConfirmButton: false,
                timer: 2500,
            });
            console.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (data) {
            // Filter the data and update filteredProducts
            const filtered = data.filter(item =>
                item.firstname.toLowerCase().includes(searchItem.toLowerCase()) ||
                item.lastname.toLowerCase().includes(searchItem.toLowerCase())
                // item.customer_emai.toLowerCase().includes(searchItem.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [data, searchItem]);


    return (
        <div className="sm-0 font-sans antialiased font-normal text-base leading-default bg-gray-50 text-slate-500">
            {/* <!-- sidenav  --> */}
            <AsideBar />
            {/* <!-- end sidenav --> */}

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
                                    Payments
                                </li>
                            </ol>
                            <h6 className="mb-0 font-bold capitalize">Payments</h6>
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
                                        placeholder="Type here..."
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
                                        <div className="w-4.5 overflow-hidden">
                                            <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                            <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                            <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                                        </div>
                                    </a>
                                </li>
                                <li className="flex items-center px-4">
                                    <a
                                        href
                                        className="p-0 transition-all text-sm ease-nav-brand text-slate-500"
                                    >
                                        <i
                                            fixed-plugin-button-nav
                                            className="cursor-pointer fa fa-cog"
                                            aria-hidden="true"
                                        />
                                        {/* <!-- fixed-plugin-button-nav  --> */}
                                    </a>
                                </li>

                                {/* <!-- notifications --> */}

                                <li className="relative flex items-center pr-2">
                                    <p className="hidden transform-dropdown-show" />
                                    <a
                                        href
                                        className="block p-0 transition-all text-sm ease-nav-brand text-slate-500"
                                        dropdown-trigger
                                        aria-expanded="false"
                                    >
                                        <i className="cursor-pointer fa fa-bell" aria-hidden="true" />
                                    </a>

                                    <ul
                                        dropdown-menu
                                        className="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer"
                                    >
                                        {/* <!-- add show className on dropdown open js --> */}
                                        <li className="relative mb-2">
                                            <a
                                                className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors"
                                                href
                                            >
                                                <div className="flex py-1">
                                                    <div className="my-auto">
                                                        <img
                                                            alt='asset-img'
                                                            src="../assets/img/team-2.jpg"
                                                            className="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-1 font-normal leading-normal text-sm">
                                                            <span className="font-semibold">New message</span>
                                                            {' '}
                                                            from Laur
                                                        </h6>
                                                        <p className="mb-0 leading-tight text-xs text-slate-400">
                                                            <i className="mr-1 fa fa-clock" aria-hidden="true" />
                                                            13 minutes ago
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>

                                        <li className="relative mb-2">
                                            <a
                                                className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                                                href
                                            >
                                                <div className="flex py-1">
                                                    <div className="my-auto">
                                                        <img
                                                            alt='asset-img'
                                                            src="../assets/img/small-logos/logo-spotify.svg"
                                                            className="inline-flex items-center justify-center mr-4 text-white text-sm bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-1 font-normal leading-normal text-sm">
                                                            <span className="font-semibold">New album</span>
                                                            {' '}
                                                            by Travis Scott
                                                        </h6>
                                                        <p className="mb-0 leading-tight text-xs text-slate-400">
                                                            <i className="mr-1 fa fa-clock" aria-hidden="true" />
                                                            1 day
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>

                                        <li className="relative">
                                            <a
                                                className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                                                href
                                            >
                                                <div className="flex py-1">
                                                    <div className="inline-flex items-center justify-center my-auto mr-4 text-white transition-all duration-200 ease-nav-brand text-sm bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl">
                                                        <svg width="12px" height="12px">
                                                            <title>credit-card</title>
                                                            <g
                                                                stroke="none"
                                                                strokeWidth="1"
                                                                fill="none"
                                                                fillRule="evenodd"
                                                            >
                                                                <g
                                                                    transform="translate(-2169.000000, -745.000000)"
                                                                    fill="#FFFFFF"
                                                                    fillRule="nonzero"
                                                                >
                                                                    <g transform="translate(1716.000000, 291.000000)">
                                                                        <g transform="translate(453.000000, 454.000000)">
                                                                            <path
                                                                                className="color-background"
                                                                                d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                                opacity="0.593633743"
                                                                            />
                                                                            <path
                                                                                className="color-background"
                                                                                d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h6 className="mb-1 font-normal leading-normal text-sm">
                                                            Payment successfully completed
                                                        </h6>
                                                        <p className="mb-0 leading-tight text-xs text-slate-400">
                                                            <i className="mr-1 fa fa-clock" aria-hidden="true" />
                                                            2 days
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {!data ? (
                    <div className='mt-4 ml-20' style={{ marginTop: "15%", marginLeft: "5%" }}>
                        <h1 className='text-md '>
                            There are no Payments to show <br />within this period.
                        </h1>
                        <p>
                            Your customers might be looking for ways to pay you, create a product<br /> and start selling.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap -mx-3 mt-5%" style={{ marginTop: '5%' }}>
                        <div className="flex-none w-full max-w-full px-3">
                            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                    <h6>{data.length} Transactions</h6>
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
                                                        Amount
                                                    </th>
                                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                                                        Trasaction_id
                                                    </th>
                                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                                                        Tx_Ref
                                                    </th>
                                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filteredProducts?.map((result) => (
                                                    <tr
                                                        key={result.id}
                                                        // onClick={() => navigate(`/Store/Product/${result.id}`)}
                                                        className='cursor-pointer'>

                                                        <td className="p-2 px-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <p className=" px-4 mb-0 font-semibold leading-tight text-xs">
                                                                {result.firstname} {result.lastname}
                                                            </p>
                                                        </td>

                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <p className="mb-0 font-semibold leading-tight text-xs">
                                                                ₦{result.amount.toLocaleString()}
                                                            </p>
                                                        </td>

                                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <span className="font-semibold leading-tight text-xs text-black-400">
                                                                {result.transaction_id}
                                                            </span>
                                                        </td>

                                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <span className="font-semibold leading-tight text-xs text-black-400">
                                                                {result.tx_ref}
                                                            </span>
                                                        </td>

                                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <span className="font-semibold leading-tight text-xs text-slate-400">
                                                                {new Date(result.created_at).toLocaleDateString()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            {/* // )} */}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

        </div>
    );
}

export default Payments;