import React, { useState } from 'react';
import { GiClothes, GiArtificialIntelligence, GiTakeMyMoney } from 'react-icons/gi';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { MdLocalShipping, MdManageAccounts, MdDashboard } from 'react-icons/md';
import { TiShoppingCart } from "react-icons/ti"
import { ImScissors } from "react-icons/im"
import { FaStoreAlt } from "react-icons/fa"
// import { BiSolidDashboard } from "react-icons/s"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logout from './LogOut';


const AsideBar = ({isNavOpen, handleNavOpen}) => {
  const [show, setShow] = useState (false);
  const handleClick = () => {
    setShow (!show);
  };

  const coming_soon = () => {
    const Toast = Swal.mixin ({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener ('mouseenter', Swal.stopTimer);
        toast.addEventListener ('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire ({
      color: "red",
      icon: 'faliure',
      title: "This feature is coming soon.....",
    })
  }
  

  const { username } = localStorage

  return (
    <aside className={`max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full ${isNavOpen ? "translate-x-0" : "-translate-x-full"} flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent`}>
      <div className="h-19.5">
        <i
          className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"
          sidenav-close
        />
        <a
          className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
          href
        >
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
            {username}'s Dashboard
          </span>
        </a>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full">
            <Link
              className="py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
              to="/Home"
            >
              <div className="bg-black shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg  bg-center stroke-0 text-center xl:p-2.5 p-2">
                <MdDashboard size="500%" style={{height: '100%', color: "white"}} />

              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Overview
              </span>
            </Link>
          </li>

          <li onClick={coming_soon} className="mt-0.5 w-full">
            <Link
              className="py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
              // to="/MyAi"
            >
              <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                <GiArtificialIntelligence size="500%" style={{height: '100%'}} />

              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                My AI
              </span>
            </Link>
          </li>

          <li onClick={handleClick} className="mt-0.5 w-full">
            <Link className="py-2.7 shadow-soft-2xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer">
              <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                <FaStoreAlt size="500%" style={{height: '100%'}} />
              </div>
              <span className="flex-grow ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Store
              </span>
              {/* <i section-open-icon="true" className="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-plus text-xs"></i> */}

              {show ? <AiOutlineUp /> : <AiOutlineDown />}

              {/* <i section-close-icon="false" className="absolute right-0 pt-1 mr-4 leading-tight fa fa-minus text-xs"></i> */}
            </Link>
          </li>

          {show &&
            <li
              id="myDiv"
              className="mt-0.5 w-full transition-all ease-soft-in-out duration-500"
              section-content
            >
              <Link
                className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/Store/new"
              >
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                  <GiClothes size="500%" style={{height: '100%'}} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Create store
                </span>
              </Link>
            </li>}

          {show &&
            <li
              id="myDiv"
              className="mt-0.5 w-full transition-all ease-soft-in-out duration-500"
              section-content
            >
              <Link
                className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/store/products/new"
              >
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                  <ImScissors size="500%" style={{height: '100%'}} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Create product
                </span>
              </Link>
            </li>}

            {show &&
            <li
              id="myDiv"
              className="mt-0.5 w-full transition-all ease-soft-in-out duration-500"
              section-content
            >
              <Link
                className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/Payments"
              >
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                  <GiTakeMyMoney size="500%" style={{height: '100%'}} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  payments
                </span>
              </Link>
            </li>}

          {show &&
            <li
              id="myDiv"
              className="mt-0.5 w-full transition-all ease-soft-in-out duration-500"
              section-content
            >
              <Link
                className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/Orders"
              >
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                  <TiShoppingCart size="500%" style={{height: '100%'}} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Orders
                </span>
              </Link>
            </li>}

          {show &&
            <li className="mt-0.5 w-full">
              <Link
                className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                to="/products"
              >
                <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                  <svg width="12px" height="12px" viewBox="0 0 42 42">
                    <title>office</title>
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        transform="translate(-1869.000000, -293.000000)"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      >
                        <g transform="translate(1716.000000, 291.000000)">
                          <g transform="translate(153.000000, 2.000000)">
                            <path
                              className="fill-slate-800 opacity-60"
                              d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                            />
                            <path
                              className="fill-slate-800"
                              d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Products
                </span>
              </Link>
            </li>}

          <li className="w-full mt-4" style={{marginTop: '25%'}}>
            <a href>
              <h6 className="pl-6 ml-2 font-bold leading-tight uppercase text-xs opacity-60">
                SETUP
              </h6>
            </a>
          </li>

          <li className="mt-0.5 w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/Store/setup"
            >
              <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <MdManageAccounts />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Manage Store
              </span>
            </Link>
          </li>

          <li className="mt-0.5 w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/store/shipping"
            >
              <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                <MdLocalShipping />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Shipping
              </span>
            </Link>
          </li>

          <li className="w-full mt-4" style={{marginTop: '25%'}}>
            <a href>
              <h6 className="pl-6 ml-2 font-bold leading-tight uppercase text-xs opacity-60">
                Account pages
              </h6>
            </a>
          </li>

          <li className="mt-0.5 w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/profile"
            >
              <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 p-2">
                <svg width="12px" height="12px" viewBox="0 0 46 42">
                  <title>customer-support</title>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-1717.000000, -291.000000)"
                      fill="#FFFFFF"
                      fill-rule="nonzero"
                    >
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(1.000000, 0.000000)">
                          <path
                            className="fill-slate-800 opacity-60"
                            d="M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z"
                          />
                          <path
                            className="fill-slate-800"
                            d="M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z"
                          />
                          <path
                            className="fill-slate-800"
                            d="M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Profile
              </span>
            </Link>
          </li>

        </ul>
      </div>

      <div className="mx-4">
        <button className="inline-block w-full px-6 py-3 my-4 font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro text-xs bg-black  hover:shadow-soft-2xl hover:scale-102"
          onClick={Logout}>
          Logout{' '}
        </button>
      </div>
    </aside>
  );
};

export default AsideBar;
