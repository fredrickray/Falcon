import React, { useState, useEffect } from 'react';
import AsideBar from '../components/AsideBar';
// import useFetch from '../hooks/useFetch';
// import Swal from 'sweetalert2';
import axios from 'axios';
import { MdOutlinePayments } from "react-icons/md"

const OverView = () => {
    // const { count, data: product } = useFetch("https://falcon-server-jaek.onrender.com/store/get-products")
    const [isNavOpen, setIsNavOpen] = useState(false)
    // const [totalMoney, setTotalMoney] = useState(0.00)
    // const [totalTransaction, setTotalTransaction] = useState(0.00)
    // const [productsSold, setProductsSold] = useState(0)
    // const { email,token } = localStorage
    // console.log(product)
    // const lastProduct = product[product.length - 1]
    // console.log(lastProduct)

    const handleNavOpen = () =>  setIsNavOpen(prev => !prev)
//     const popUp = ( position , message, color ) => {
//       Swal.fire({
//           position: position,
//           toast: true,
//           title: message,
//           color: color,
//           showConfirmButton: false,
//           timer: 2500,
//       });
//   }

//   useEffect(() => {
//     retrieveMoneyMade()
//     // retrieveOrders()
//   }, [])
//   const retrieveMoneyMade = async () => {
//     try {
//       const response = await axios.get('https://falcon-server-jaek.onrender.com/payment/get_payment', {
//           params: {
//               email,
//           },
//       });

//       // console.log(response.data)

//       if (response.data.message === 'No transactions found for this email') {
//           popUp("center", response.data.message)
//       }
//       else {
//           const transactions = response.data.response;
//           console.log(transactions.length)
//           const totalAmount = transactions.reduce((total, transaction) => {
//             return total + transaction.amount;
//           }, 0);
//           const formattedTotalAmount = totalAmount.toLocaleString(); 
//           setTotalMoney(formattedTotalAmount);
//           setTotalTransaction(transactions.length)
//       }
//   }
//   catch (error) {
//       popUp("top-end", error.response.data.message, "red")
//       console.error(error.response.data.message);
//   }
//   }

//   const retrieveOrders = async () => {
//     try{
//       const response = await axios.post("https://falcon-server-jaek.onrender.com/payment/orders", {my_email: email}
//         // headers: {
//         //     Authorization: `Bearer ${token}`,
//         //     "Content-Type": "application/json"
//         //   }
//     //   }
//       )
//       if(response.status === 404) {
//         console.log(response)
//         // popUp("top-end", response.data.message)
//       }
//       else{
//         console.log(response)
//         // setProductsSold(response.data.orderItems.length)
//       }
      
//     } 
//     catch(error) {
//       console.log(error)
//     }
//   }
const { token } = localStorage
    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        try {
            const response = await axios.get("http://localhost:9000/admin/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                  }
            })
            console.log(response)
        } 
        catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default  text-slate-500"
        // style={{backgroundColor: "#051139"}}
        >
      <AsideBar handleNavOpen={handleNavOpen} isNavOpen={isNavOpen}/>
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
                  className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                  aria-current="page"
                >
                  Dashboard
                </li>
              </ol>
              <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
            </nav>

            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <ul style={{marginLeft: "70%"}} className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
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

        {/* <!-- end Navbar --> */}

        {/* <!-- cards --> */}
        <div className="w-full px-6 py-6 mx-auto">
          {/* <!-- row 1 --> */}
          <div className="flex flex-wrap -mx-3">
            {/* <!-- card1 --> */}
            <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-row -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                      <div>
                        <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                          Total Money
                        </p>
                        <h5 className="mb-0 font-bold">
                          NGN 
                          {/* {totalMoney} */}
                          {/* <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                            +55%
                          </span> */}
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-black">
                        <i className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- card2 --> */}
            <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-row -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                      <div>
                        <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                          Total products
                        </p>
                        <h5 className="mb-0 font-bold">
                          {/* {count} */}
                          {/* <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                            +3%
                          </span> */}
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-black">
                        <i className="ni leading-none ni-world text-lg relative top-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- card3 --> */}
            <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-row -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                      <div>
                        <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                          Total Transactions
                        </p>
                        <h5 className="mb-0 font-bold">
                          {/* {totalTransaction} */}
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-black">
                        {/* <i className="ni leading-none ni-mo text-lg relative top-3.5 text-white" /> */}
                        <MdOutlinePayments className='leading-none text-lg relative top-3.5 text-white' style={{fontSize: "24px"}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- card4 --> */}
            <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-row -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                      <div>
                        <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                          Total Orders
                        </p>
                        <h5 className="mb-0 font-bold">
                          {/* {productsSold} */}
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-black">
                        <i className="ni leading-none ni-cart text-lg relative top-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* <!-- end cards --> */}
      </main>
    </div>
  );
};

export default OverView;
