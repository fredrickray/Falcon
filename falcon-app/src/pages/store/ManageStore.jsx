import React, { useEffect, useState } from 'react';
import AsideBar from '../../components/AsideBar';
import CopyToClipboardLink from '../../components/ClipBoard';
// import useFetchStore from '../../hooks/useFetchStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BsEyeFill, } from "react-icons/bs"
import axios from "axios"
import useFetch from '../../hooks/useFetch';
import { LineWave } from 'react-loader-spinner';

const ManageStore = () => {
    const { store, isFetching } = useFetch("https://falcon-server-jaek.onrender.com/store/get-products")
    // useFetchStore(`https://falcon-server-jaek.onrender.com/store/get-store`)
    const link = `https://falcon-app.vercel.app/Store/${store}`
    const [isNavOpen, setIsNavOpen] = useState(false)
    const textToCopy = link
    const navigate = useNavigate()
    const { email, token } = localStorage

    const handleNavOpen = () => setIsNavOpen(prev => !prev)

    const viewStore = () => window.open(`https://falcon-app.vercel.app/Store/${store}`)

    const [discountCodes, setDiscountCodes] = useState([]);
    const [newDiscountName, setNewDiscountName] = useState('');
    const [newDiscountPrice, setNewDiscountPrice] = useState('');

    const addDiscountCode = async () => {
        if (newDiscountName.trim() !== '' && newDiscountPrice !== '') {
            const newDiscount = {
                name: newDiscountName,
                price: newDiscountPrice,
                email
            };

            try {
                // Make a request to the backend to add the new discount using Axios
                await axios.post(
                    'https://falcon-server-jaek.onrender.com/store/create-discount',
                    newDiscount,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                // Fetch the discounts again and update the state with the fetched data
                const fetchedDiscounts = await fetchDiscounts();
                setDiscountCodes(fetchedDiscounts);

                // Clear the input fields
                setNewDiscountName('');
                setNewDiscountPrice('');
            } catch (error) {
                console.error('Error adding discount:', error);
            }
        }
    };


    const handleDeleteDiscount = async (id) => {
        console.log('Deleting discount with id:', id);
        try {
            // Make a request to the backend to delete the item using Axios
            const response = await axios.delete(`https://falcon-server-jaek.onrender.com/store/delete-discount/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                        "Content-Type": "application/json"
                    },
                });
            console.log(response)
            // Update the state to remove the deleted discount
            const updatedDiscountCode = discountCodes.filter((item) => item.id !== id)
            console.log(updatedDiscountCode)
            // const updatedDiscounts = [...discountCodes];
            // updatedDiscounts.splice(index, 1);
            setDiscountCodes(updatedDiscountCode);
        } catch (error) {
            console.error('Error deleting discount:', error);
        }
    };

    async function fetchDiscounts() {
        try {
            const response = await axios.post("https://falcon-server-jaek.onrender.com/store/get-discount", { email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            //   console.log(response)
            return response.data.discounts;
        } catch (error) {
            console.error('Error fetching discounts:', error);
            return [];
        }
    }

    useEffect(() => {
        // Fetch discounts and update state when the component mounts
        async function fetchAndSetDiscounts() {
            const fetchedDiscounts = await fetchDiscounts();
            setDiscountCodes(fetchedDiscounts);
        }

        fetchAndSetDiscounts();
    }, []);

    // if (store) {
        return (
            <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
                <AsideBar handleNavOpen={handleNavOpen} isNavOpen={isNavOpen} />
                <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                    <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" navbar-main navbar-scroll="true">
                        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                            <nav>
                                {/* <!-- breadcrumb --> */}
                                <ol className='flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16'>
                                    <li className='leading-normal text-sm'>
                                        <a className='opacity-50 text-slate-700' href>Store</a>
                                    </li>
                                    <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current='page'>
                                        Setup
                                    </li>
                                </ol>
                                <h6 className='mb-0 font-bold capitalize'>Store Setup</h6>
                            </nav>
                            <div style={{maxWidth: "40px"}} className="flex max-w-[40px] items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">

                                <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                                    <li className="flex items-center pl-4 xl:hidden">
                                        <a href className="block p-0 transition-all ease-nav-brand text-sm text-slate-500" sidenav-trigger>
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

                    {isFetching && (
                        <LineWave
                            height="300"
                            width="300"
                            color="#black"
                            ariaLabel="line-wave"
                            wrapperStyle={{ justifyContent: "center", position: "absolute", display: "flex", alignItems: "center", transform: "translate(-30%, 40%)", top: "50%", left: "50%", }}
                            wrapperClass=""
                            visible={true}
                            firstLineColor=""
                            middleLineColor=""
                            lastLineColor=""
                        />
                    )}

                    {!isFetching && store && (
                        <div>
                            <div className='flex justify-between mt-1' style={{ margin: "0 38px"}}>
                                <h3 className='text-6 p-0 lg:p-[40px]' style={{ paddingTop: "20px", fontSize: "24px" }}>Store settings</h3>
                                <button
                                    type="button"
                                    className="mr-0 lg:mr-[4%]  inline-block ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-green-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                                    style={{ background: '#FF9B00' }}
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
                                        <CopyToClipboardLink text={textToCopy} title={"Link copied to ClipBoard"}>
                                            <i
                                                style={{ marginLeft: "15px", cursor: "pointer" }}
                                                className="fa fa-clone"
                                                aria-hidden="true"
                                            />
                                        </CopyToClipboardLink>
                                    </div>
                                    <p onClick={viewStore} style={{ paddingLeft: "70%", color: "blue", cursor: "pointer" }}>View Store <BsEyeFill /></p>
                                </div>
                            </div>

                            <div className="container-fluid">
                                <div className='border-b border-solid mx-9 border-black' style={{ paddingLeft: "40px", paddingTop: "50px", margin: "0 38px" }}>
                                    <h4>Add discount code</h4>
                                    <div className='flex flex-col md:flex-row' style={{ gap: "20px", paddingBottom: "20px" }}>

                                        <div className="mb-4 relative flex-row">
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                                                Discount name
                                            </label>
                                            <input
                                                style={{ padding: "10px 30px 10px 30px" }}
                                                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block  appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                type="text"
                                                value={newDiscountName}
                                                onChange={(e) => setNewDiscountName(e.target.value)} />
                                        </div>

                                        <div className="mb-4 relative flex-row">
                                            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                                                Discount price
                                            </label>
                                            <input
                                                style={{ padding: "10px 30px 10px 30px" }}
                                                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block  appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                type="number"
                                                value={newDiscountPrice}
                                                onChange={(e) => setNewDiscountPrice(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ padding: "15px" }}>
                                            <button
                                                style={{ padding: "10px 40px 6px 40px" }}
                                                className="inline-block w-32 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                                                type=""
                                                onClick={addDiscountCode}
                                            >Add</button>
                                        </div>

                                    </div>
                                    {discountCodes.length && (
                                        <div className="relative flex flex-col w-full  min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                            <div className="flex-auto px-0 pt-0 pb-2">
                                                <div className="p-0 overflow-x-auto">
                                                    <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                                        <thead className="align-bottom">
                                                            <tr>
                                                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Label</th>
                                                                <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Name</th>
                                                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Price</th>
                                                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Copy</th>
                                                                <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {discountCodes.map((discount, index) => (
                                                                <tr>
                                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <div className="flex px-2 py-1">

                                                                            <div className="flex flex-col justify-center">
                                                                                <h6 className="mb-0 leading-normal text-sm">{index + 1}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2  flex-col align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <CopyToClipboardLink text={discount.name} title={"Discount code copied"}><p className="mb-0 font-semibold cursor-pointer leading-tight text-xs" style={{ color: "#06c" }}>{discount.name}</p></CopyToClipboardLink>
                                                                    </td>
                                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <span className="font-semibold leading-tight text-xs text-black">₦{discount.price.toLocaleString()}</span>
                                                                    </td>
                                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <CopyToClipboardLink text={discount.name} title={"Discount code copied"}>
                                                                            <i
                                                                                // style={{ marginLeft: "15px", cursor: "pointer" }}
                                                                                className="fa fa-clone cursor-pointer"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </CopyToClipboardLink>
                                                                    </td>
                                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <p onClick={() => handleDeleteDiscount(discount.id)} className="font-semibold leading-tight text-xs text-red-500 cursor-pointer"> Remove </p>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {!isFetching && (!store || store.length === 0) && (
                        <section className='min-h-screen mb-32' style={{ marginLeft: '21%', marginTop: '10%' }}>
                            <div style={{ marginTop: '3%' }}>
                                <h1 style={{ paddingTop: "20%", fontSize: "20px" }}>You have not created a store yet</h1>
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
                    )}

                </main>
            </div>
        );
    // }
    // else {
    //     return (
    //         <div>
    //             <AsideBar handleNavOpen={handleNavOpen} isNavOpen={isNavOpen} />
    //             <main className='ease-soft-in-out xl:ml-68.5 relative h-screen max-h-screen rounded-xl transition-all duration-200'>
    //                 <nav className='relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start'
    //                     navbarmain='true' navbar-scroll='true'>
    //                     <div className='flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit'>
    //                         <nav>
    //                             {/* <!-- breadcrumb --> */}
    //                             <ol className='flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16'>
    //                                 <li className='leading-normal text-sm'>
    //                                     <a className='opacity-50 text-slate-700' href>Store</a>
    //                                 </li>
    //                                 <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current='page'>
    //                                     Setup
    //                                 </li>
    //                             </ol>
    //                             <h6 className='mb-0 font-bold capitalize'>Store Setup</h6>
    //                         </nav>
    //                         <div className='flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto'>
    //                             <ul className='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
    //                                 {/* <!-- online builder btn  --> */}
    //                                 <li className='flex items-center pl-4 xl:hidden'>
    //                                     <a href className='block p-0 transition-all ease-nav-brand text-sm text-slate-500' sidenav-trigger>
    //                                         <div className="w-4.5 overflow-hidden" onClick={handleNavOpen}>
    //                                             <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`}></i>
    //                                             <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
    //                                             <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`}></i>
    //                                         </div>
    //                                     </a>
    //                                 </li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </nav>
    //                 <section className='min-h-screen mb-32' style={{ marginLeft: '21%', marginTop: '10%' }}>
    //                     <div style={{ marginTop: '3%' }}>
    //                         <h1>You have not created a store yet</h1>
    //                         <h5 className='leading-tight text-xs text-slate-400'>
    //                             Begin right away!!
    //                         </h5>
    //                         <button
    //                             className='inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
    //                             type=''
    //                             style={{ background: '#FF9B00' }}
    //                         >
    //                             <Link to="/Store/new">Create Store</Link>
    //                         </button>
    //                     </div>
    //                 </section>
    //             </main>
    //         </div>
    //     )
    // }
}

export default ManageStore;