import React, { useState, useEffect } from 'react'
import AsideBar from '../../components/AsideBar'
import { useParams } from 'react-router-dom'
import axios from "axios"


const Shipping = () => {

    const { store } = useParams()
    const [handleShipping, setHandleShipping] = useState(false)
    const [showInputField, setShowInputField] = useState(false)
    const [regionsValue, setRegionsValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [savedValues, setSavedValues] = useState([]);
    // const [location, setLocation] = useState("")
    // const [fee, setFee] = useState("")
    const { email } = localStorage
    const CREATE_DELIVERY_URL = "http://localhost:9000/store/create-delivery"
    const GET_DELIVERY_URL = "http://localhost:9000/store/get-delivery"
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

    // const handleSave = () => {
    //     if (regionsValue !== '' && priceValue !== '') {
    //         const newSavedValues = [...savedValues, { regions: regionsValue, price: priceValue }];
    //         setSavedValues(newSavedValues);
    //         setPriceValue("")
    //         setRegionsValue("")
    //         console.log(savedValues)
    //     }
    // };

    // useEffect(() => {
    //     axios.post(GET_DELIVERY_URL, {
    //         email
    //     })
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // })
    useEffect(() => {
        fetchSavedValues();
      }, []);
    
      const fetchSavedValues = async () => {
        try {
          const response = await axios.post(GET_DELIVERY_URL, { email })
          console.log(response.data.data2)
          setSavedValues(response.data.data2);
        } 
        catch (error) {
          console.error('Error fetching saved values:', error);
        }
      };
    

    const handleSave = async () => {
        if (regionsValue !== '' && priceValue !== '') {
          const newItem = {
            location: regionsValue,
            fee: priceValue,
            email: email
          };
          try {
            const response = await axios.post(CREATE_DELIVERY_URL, newItem); // Replace with your server endpoint
            console.log(response)
            setSavedValues([...savedValues, response.data]);
            setRegionsValue('');
            setPriceValue('');
          } 
          catch (error) {
            console.error('Error saving the item:', error);
          }
        }
      };

      const handleRemove = async (id) => {
        try {
          await axios.delete(`http://localhost:9000/store/delete-delivery/${id}`)
          const updatedValues = savedValues.filter((item) => item.id !== id);
          console.log(updatedValues)
          setSavedValues(updatedValues);
        } 
        catch (error) {
            console.log(error.message)
          console.error('Error removing the item:', error.message);
        }
      };
    




    // axios.post(DELIVERY_URL, {
    //     email,
    //     fee,
    //     location
    // })
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    return (
        <div>
            <AsideBar />
            <main className='ease-soft-in-out xl:ml-68.5 relative h-screen max-h-screen rounded-xl transition-all duration-200'>
                <nav class='relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start'
                    navbarmain='true' navbar-scroll='true'>
                    <div class='flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit'>
                        <nav>
                            {/* <!-- breadcrumb --> */}
                            <ol class='flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16'>
                                <li class='leading-normal text-sm'>
                                    <a class='opacity-50 text-slate-700' href>Setup</a>
                                </li>
                                <li class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current='page'>
                                    Shipping
                                </li>
                            </ol>
                            <h6 class='mb-0 font-bold capitalize'>Shipping</h6>
                        </nav>
                        <div class='flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto'>
                            <ul class='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
                                {/* <!-- online builder btn  --> */}
                                <li class='flex items-center pl-4 xl:hidden'>
                                    <a href class='block p-0 transition-all ease-nav-brand text-sm text-slate-500' sidenav-trigger>
                                        <div class='w-4.5 overflow-hidden'> <i class='ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all' /> <i class='ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all'
                                        /> <i class='ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all' /> </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section className='min-h-screen mb-32' style={{ marginLeft: '7%', marginTop: '3%' }}>
                    <div>
                        <h5>Shipping setup for {store}</h5>
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
                    <div className='flex flex-wrap mt-4'>
                        {showInputField &&
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
                            </div>}
                        {showInputField &&
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
                            </div>}


                        {savedValues.length > 0 && (
                            <div className="mt-4">
                                <div className=''>
                                    <div className='flex flex-wrap justify-between'
                                        >
                                        <label className="  tracking-wide text-gray-700 text-xs font-bold mb-2">Regions</label>
                                        <label className="  tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            style={{marginLeft: "140px"}}>Price</label>
                                    </div>
                                    {savedValues.map((value, index) => (
                                        <div className='gap-0' key={value.id || index}>
                                            <div className='flex flex-wrap'>
                                                <p className=''>{value.regions || value.location}</p>
                                                <p className='' style={{marginLeft: "180px"}}>{value.price || value.fee}</p>
                                            </div>
                                            {/* <div className="cursor-pointer" style={{marginLeft: "50px"}}> */}
                                                <p className='cursor-pointer text-red-500' onClick={() => handleRemove(value.id)}
                                                    style={{marginLeft: "140%", marginTop: "-40px"}}>Remove</p>
                                                {/* <BsTrashFill onClick={removeInput} /> */}
                                            {/* </div> */}
                                        </div>


                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Shipping
