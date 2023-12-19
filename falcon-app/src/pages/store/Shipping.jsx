import React, { useState, useEffect } from 'react'
import AsideBar from '../../components/AsideBar'
import axios from "axios"
import useFetch from '../../hooks/useFetch'
import { LineWave } from 'react-loader-spinner'
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2"

const Shipping = () => {
    const [handleShipping, setHandleShipping] = useState(false)
    const [showInputField, setShowInputField] = useState(false)
    const [regionsValue, setRegionsValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [savedValues, setSavedValues] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false)
    const { store, isFetching } = useFetch(`${process.env.REACT_APP_BACKEND_LOCAL_URL}/store/product`)
    const { email, token } = localStorage
    const CREATE_DELIVERY_URL = `${process.env.REACT_APP_BACKEND_LOCAL_URL}/store/delivery`
    const GET_DELIVERY_URL = `${process.env.REACT_APP_BACKEND_LOCAL_URL}/store/delivery`
    const DELETE_DELIVERY_URL = `${process.env.REACT_APP_BACKEND_LOCAL_URL}/store/delivery`
    // const DELETE_DELIVERY_URL = 
    const handleInputChange = () => {
        setShowInputField(true)
    }

    const removeInput = () => {
        setShowInputField(false)
        setPriceValue("")
        setRegionsValue("")
    }

    const handleShippingChange = (e) => {
        setHandleShipping(e.target.value === 'handle');
    };

    const handleNavOpen = () => {
        setIsNavOpen(prev => !prev)
    }

    const Toast = Swal.mixin ({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener ('mouseenter', Swal.stopTimer);
          toast.addEventListener ('mouseleave', Swal.resumeTimer);
        },
      });

    
    const fetchSavedValues = async () => {
        try {
          const response = await axios.get(GET_DELIVERY_URL, {
            params: { email }
          });
          setSavedValues(response.data.data);
        } 
        catch (error) {
          console.error('Error fetching saved values:', error);
        }
      };
      

    useEffect(() => {
        fetchSavedValues();
    }, []);




    const handleSave = async () => {
        if (regionsValue.trim() !== '' && priceValue !== '') {
            const newItem = {
                location: regionsValue,
                fee: priceValue,
                email
            };
            try {
                await axios.post(CREATE_DELIVERY_URL, newItem, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const createdItem = fetchSavedValues()// Assuming the server responds with the created item data
                setSavedValues(createdItem);
                setRegionsValue('');
                setPriceValue('');
            } catch (error) {
                console.error('Error saving the item:', error);
            }
        }
    };


    // useEffect(() => {
    //     console.log(savedValues)
    // }, [savedValues])
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${DELETE_DELIVERY_URL}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                        "Content-Type": "application/json"
                    },
                }
            )
            const updatedValues = savedValues.filter((item) => item.id !== id);
            console.log(updatedValues)
            setSavedValues(updatedValues);

              Toast.fire ({
                icon: 'success',
                title: `Item deleted successfully`,
              })

        }
        catch (error) {
            console.log(error.message)
            console.error('Error removing the item:', error.message);
        }
    };


    return (
        <div>
            <AsideBar handleNavOpen={handleNavOpen} isNavOpen={isNavOpen} />
            <main className='ease-soft-in-out xl:ml-68.5 relative h-screen max-h-screen rounded-xl transition-all duration-200'>
                <nav className='relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start'
                    navbarmain='true' navbar-scroll='true'>
                    <div className='flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit'>
                        <nav>
                            {/* <!-- breadcrumb --> */}
                            <ol className='flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16'>
                                <li className='leading-normal text-sm'>
                                    <a className='opacity-50 text-slate-700' href>Setup</a>
                                </li>
                                <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current='page'>
                                    Shipping
                                </li>
                            </ol>
                            <h6 className='mb-0 font-bold capitalize'>Shipping</h6>
                        </nav>
                        <div className='flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto'>
                            <ul style={{ marginLeft: "50%" }} className='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
                                {/* <!-- online builder btn  --> */}
                                <li className='flex items-center pl-4 xl:hidden'>
                                    <a href className='block p-0 transition-all ease-nav-brand text-sm text-slate-500' sidenav-trigger>
                                        <div className='w-4.5 overflow-hidden' onClick={handleNavOpen} >
                                            <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`} />
                                            <i className='ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all' />
                                            <i className={`ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all ${isNavOpen ? "translate-x-[5px]" : ""}`} />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {isFetching ? (
                    <LineWave
                        height="300"
                        width="300"
                        color="#4fa94d"
                        ariaLabel="line-wave"
                        wrapperStyle={{ justifyContent: "center", position: "absolute", display: "flex", alignItems: "center", transform: "translate(-30%, 40%)", top: "50%", left: "50%", }}
                        wrapperClass=""
                        visible={true}
                        firstLineColor="black"
                        middleLineColor="black"
                        lastLineColor="black"
                    />
                ) : (
                    <section className='min-h-screen mb-32' style={{ marginLeft: '7%', marginTop: '3%' }}>
                        <div>
                            <h5>{store ? `Shipping setup for ${store}` : "Shipping setup"}</h5>
                        </div>
                        <div>
                            <p>
                                Shipping preference
                            </p>
                            <select onChange={handleShippingChange} className='focus:shadow-soft-primary-outline block w-3 pl-3  py-2 text-base border-gray-300 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm '>
                                <option value='turn-off'>
                                    Turn off shipping
                                </option>
                                <option value='handle'>
                                    I'll handle my own shipping
                                </option>
                            </select>
                        </div>

                        {handleShipping && (
                            <div style={{ marginTop: '3%' }}>
                                <h5>Shipping regions and rates</h5>
                                <p className='leading-tight text-xs text-slate-400'>
                                    This would allow you to set shipping fees for your products
                                </p>
                                <button
                                    className='inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                                    type=''
                                    style={{ background: '#FF9B00' }}
                                    onClick={handleInputChange}>
                                    Add shipping region
                                </button>
                            </div>
                        )}

                        {handleShipping && (
                            <div className='mt-4'>
                                {showInputField &&
                                    <div className='flex sm:block'>
                                        <div
                                            className="w-full md:w-4/12 px-3 pb"
                                            style={{ marginTop: '5%' }}
                                        >
                                            <label
                                                className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="price"
                                            >
                                                Regions
                                            </label>

                                            <input
                                                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-3 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                type="text"
                                                id='regions'
                                                value={regionsValue}
                                                onChange={(e) => setRegionsValue(e.target.value)}
                                            />
                                        </div>

                                        <div
                                            className="flex items-center  w-full md:w-8/12 px-3 pb"
                                            style={{ marginTop: '2%' }}
                                        >
                                            <label
                                                className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="price"
                                            >
                                                Price
                                            </label>
                                            <input
                                                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-3 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                                                id="Style"
                                                type="number"
                                                style={{ marginTop: '8%' }}
                                                value={priceValue}
                                                onChange={(e) => setPriceValue(e.target.value)} />
                                            <button
                                                className="inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                                                type="button"
                                                style={{ background: '#FF9B00' }}
                                                onClick={handleSave}
                                            >Save
                                            </button>
                                            <div className="mt-4 cursor-pointer">
                                                <p className='cursor-pointer text-red-500' onClick={removeInput}>Remove</p>
                                                {/* <BsTrashFill onClick={removeInput} /> */}
                                            </div>
                                        </div>
                                    </div>}


                                {savedValues.length > 0 && (
                                    <div className="relative flex flex-col w-full  min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div className="flex-auto px-0 pt-0 pb-2">
                                            <div className="p-0 overflow-x-auto">
                                                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                                    <thead className="align-bottom">
                                                        <tr>
                                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Label</th>
                                                            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Regions</th>
                                                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Price</th>
                                                            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {savedValues.map((value, index) => (
                                                            <tr key={value.id}>
                                                                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                    <div className="flex px-2 py-1">

                                                                        <div className="flex flex-col justify-center">
                                                                            <h6 className="mb-0 leading-normal text-sm">{index + 1}</h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                    <p className="mb-0 font-semibold leading-tight text-xs">{value.regions || value.location}</p>
                                                                </td>
                                                                <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                    <span className="font-semibold leading-tight text-xs text-slate-400">{value.price || value.fee}</span>
                                                                </td>
                                                                <td className="p-2 pt-6 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent flex">
                                                                    <MdEdit className='mr-6 cursor-pointer'/>
                                                                    <p onClick={() => handleRemove(value.id)} className="font-semibold leading-tight text-xs text-red-500"> Remove </p>
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
                        )}
                    </section>
                )}


            </main>
        </div>
    )
}

export default Shipping
