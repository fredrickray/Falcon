import React from 'react';
import AsideBar from '../components/AsideBar';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
const Home = () => {
    const { count, data: product } = useFetch("http://localhost:9000/store/get-products")
    // console.log(product.image)
  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default  text-slate-500"
        // style={{backgroundColor: "#051139"}}
        >
      {/* <!-- sidenav  --> */}
      <AsideBar />

      {/* <!-- end sidenav --> */}

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
              <div className="flex items-center md:ml-auto md:pr-4">
                <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                  <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <i className="fas fa-search" />
                  </span>
                  <input
                    type="text"
                    className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                    placeholder="Type here..."
                  />
                </div>
              </div>
              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                {/* <!-- online builder btn  --> */}
                <li className="flex items-center pl-4 xl:hidden">
                  <a
                    href
                    className="block p-0 transition-all ease-nav-brand text-sm text-slate-500 sidenav-trigger"
                    
                  >
                    <div className="w-4.5 overflow-hidden">
                      <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                      <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                      <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
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
                          Today's Money
                        </p>
                        <h5 className="mb-0 font-bold">
                          $53,000
                          <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                            +55%
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
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
                          {count}
                          <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                            +3%
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
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
                          New Clients
                        </p>
                        <h5 className="mb-0 font-bold">
                          +3,462
                          <span className="leading-normal text-red-600 text-sm font-weight-bolder">
                            -2%
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                        <i className="ni leading-none ni-paper-diploma text-lg relative top-3.5 text-white" />
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
                          Sales
                        </p>
                        <h5 className="mb-0 font-bold">
                          $103,430
                          <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                            +5%
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                      <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                        <i className="ni leading-none ni-cart text-lg relative top-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- cards row 2 --> */}
          <div className="flex flex-wrap mt-6 -mx-3">
            <div className="w-full px-3 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap -mx-3">
                    <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                      <div className="flex flex-col h-full">
                        <p className="pt-2 mb-1 font-semibold">
                          Most recent product
                        </p>
                        <h5 className="font-bold">I'm my own Bo$$</h5>
                        <p className="mb-12">
                          From clothing line, to various products, advertise them now easily and faster
                        </p>
                        <Link
                          className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500"
                          to="/store/Products/new"
                        >
                          Get started
                          <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200" />
                        </Link>
                      </div>
                    </div>
                    <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                      <div className="h-full bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl">
                        <img
                          src="../assets/img/shapes/waves-white.svg"
                          className="absolute top-0 hidden w-1/2 h-full lg:block"
                          alt="waves"
                        />
                        <div className="relative flex items-center justify-center h-full">
                          <img
                            className="relative z-20 w-full pt-6"
                            src="../assets/img/illustrations/rocket-white.png"
                            alt="rocket"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
              <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
                <div
                  className="relative h-full overflow-hidden bg-cover rounded-xl"
                  style={{backgroundImage: "url('../assets/img/ivancik.jpg')"}}
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80" />
                  <div className="relative z-10 flex flex-col flex-auto h-full p-4">
                    <h5 className="pt-2 mb-6 font-bold text-white">
                      Take your business to the next level🚀🚀🚀
                    </h5>
                    <p className="text-white">
                      Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.
                    </p>
                    <a
                      className="mt-auto mb-0 font-semibold leading-normal text-white group text-sm"
                      href
                    >
                      Read More
                      <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* <!-- cards row 4 --> */}

          <div className="flex flex-wrap my-6 -mx-3">
            {/* <!-- card 1 --> */}

            <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/3 lg:flex-none">
              <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                  <div className="flex flex-wrap mt-0 -mx-3">
                    <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
                      <h6>Projects</h6>
                      <p className="mb-0 leading-normal text-sm">
                        <i className="fa fa-check text-cyan-500" />
                        <span className="ml-1 font-semibold">{count} done </span>
                        this month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-auto p-6 px-0 pb-2">
                  <div className="overflow-x-auto">
                    <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                      <thead className="align-bottom">
                        <tr>
                          <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            Products
                          </th>
                          <th className="px-6 py-3 pl-2 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            Qunatity
                          </th>
                          <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            Price
                          </th>
                          <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            Completion
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product?.map((result) => (
                        <tr 
                            key={result.id}>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={result.image.split('\r\n')[0]}
                                  className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
                                  alt="xd"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">
                                  {result.name}
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="mt-2 avatar-group">
                              <a
                                href
                                className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30"
                                data-target="tooltip_trigger"
                                data-placement="bottom"
                              >
                                <img
                                  src="../assets/img/team-1.jpg"
                                  className="w-full rounded-full"
                                  alt="team1"
                                />
                              </a>
                              <div
                                data-target="tooltip"
                                className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                role="tooltip"
                              >
                                Ryan Tompson
                                <div
                                  className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                  data-popper-arrow
                                />
                              </div>
                              <a
                                href
                                className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30"
                                data-target="tooltip_trigger"
                                data-placement="bottom"
                              >
                                <img
                                  src="../assets/img/team-2.jpg"
                                  className="w-full rounded-full"
                                  alt="team2"
                                />
                              </a>
                              <div
                                data-target="tooltip"
                                className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                role="tooltip"
                              >
                                Romina Hadid
                                <div
                                  className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                  data-popper-arrow
                                />
                              </div>
                              <a
                                href
                                className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30"
                                data-target="tooltip_trigger"
                                data-placement="bottom"
                              >
                                <img
                                  src="../assets/img/team-3.jpg"
                                  className="w-full rounded-full"
                                  alt="team3"
                                />
                              </a>
                              <div
                                data-target="tooltip"
                                className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                role="tooltip"
                              >
                                Alexander Smith
                                <div
                                  className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                  data-popper-arrow
                                />
                              </div>
                              <a
                                href
                                className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out text-xs hover:z-30"
                                data-target="tooltip_trigger"
                                data-placement="bottom"
                              >
                                <img
                                  src="../assets/img/team-4.jpg"
                                  className="w-full rounded-full"
                                  alt="team4"
                                />
                              </a>
                              <div
                                data-target="tooltip"
                                className="hidden px-2 py-1 text-white bg-black rounded-lg text-sm"
                                role="tooltip"
                              >
                                Jessica Doe
                                <div
                                  className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                  data-popper-arrow
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs">
                              ₦{result.price.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                          <div className="w-3/4 mx-auto">
                            <div>
                              <div>
                                <span className="font-semibold leading-tight text-xs">100%</span>
                              </div>
                            </div>
                            <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                              <div className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-full flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- card 2 --> */}

            <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
              <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                  <h6>Orders overview</h6>
                  <p className="leading-normal text-sm">
                    <i className="fa fa-arrow-up text-lime-500" />
                    <span className="font-semibold">24%</span> this month
                  </p>
                </div>
                <div className="flex-auto p-4">
                  <div className="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px">
                    <div className="relative mb-4 mt-0 after:clear-both after:table after:content-['']">
                      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                        <i className="relative z-10 text-transparent ni  ni-bell-55 leading-pro bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text fill-transparent" />
                      </span>
                      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                        <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">
                          $2400, Design changes
                        </h6>
                        <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                          22 DEC 7:20 PM
                        </p>
                      </div>
                    </div>
                    <div className="relative mb-4 after:clear-both after:table after:content-['']">
                      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                        <i className="relative z-10 text-transparent ni  ni-html5 leading-pro bg-gradient-to-tl from-red-600 to-rose-400 bg-clip-text fill-transparent" />
                      </span>
                      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                        <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">
                          New order #1832412
                        </h6>
                        <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                          21 DEC 11 PM
                        </p>
                      </div>
                    </div>
                    <div className="relative mb-4 after:clear-both after:table after:content-['']">
                      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                        <i className="relative z-10 text-transparent ni ni-cart leading-pro bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text fill-transparent" />
                      </span>
                      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                        <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">
                          Server payments for April
                        </h6>
                        <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                          21 DEC 9:34 PM
                        </p>
                      </div>
                    </div>
                    <div className="relative mb-4 after:clear-both after:table after:content-['']">
                      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                        <i className="relative z-10 text-transparent ni  ni-credit-card leading-pro bg-gradient-to-tl from-red-500 to-yellow-400 bg-clip-text fill-transparent" />
                      </span>
                      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                        <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">
                          New card added for order #4395133
                        </h6>
                        <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                          20 DEC 2:20 AM
                        </p>
                      </div>
                    </div>
                    <div className="relative mb-4 after:clear-both after:table after:content-['']">
                      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                        <i className="relative z-10 text-transparent ni ni-key-25 leading-pro bg-gradient-to-tl from-purple-700 to-pink-500 bg-clip-text fill-transparent" />
                      </span>
                      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                        <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">
                          Unlock packages for development
                        </h6>
                        <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                          18 DEC 4:54 AM
                        </p>
                      </div>
                    </div>
                    <div className="relative mb-0 after:clear-both after:table after:content-['']">
                      <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                        <i className="relative z-10 text-transparent ni ni-money-coins leading-pro bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text fill-transparent" />
                      </span>
                      <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                        <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">
                          New order #9583120
                        </h6>
                        <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">
                          17 DEC
                        </p>
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

export default Home;
