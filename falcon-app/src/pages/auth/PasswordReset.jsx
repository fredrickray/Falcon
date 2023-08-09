import React, { useState } from 'react';
import Axios from "axios"
import Swal from 'sweetalert2';
import { Link } from "react-router-dom"

const PasswordReset = () => {
    // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const URL = "http://localhost:9000/auth/password_reset"

    const verify = async () => {
        try {
            // setIsButtonDisabled(true)
            const response = await Axios.post(URL, { email, password })
            console.log(response.data.message)
            console.log(response.data.status)
            if(response.data.status === "Success") {
                console.log(response.data.message)
                Swal.fire({
                    position: 'top-right',
                    toast: true,
                    title: response.data.message,
                    color: 'green',
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3500,
                  });
                   window.location.href = "/Login"
            }
            Swal.fire({
                position: 'top-right',
                toast: true,
                title: response.data.message,
                color: 'red',
                showConfirmButton: false,
                timer: 2500,
              });
            
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                position: 'center',
                toast: true,
                title: error.message,
                color: 'red',
                showConfirmButton: false,
                timer: 2500,
              });
        }
    }

    return (
        <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
            <div className="container sticky top-0 z-sticky">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 flex-0">
                        {/* <!-- Navbar --> */}
                        <nav className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
                            <div className="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit">
                                <button
                                    navbar-trigger
                                    className="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
                                    type="button"
                                    aria-controls="navigation"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                                        <span
                                            bar1
                                            className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                                        />
                                        <span
                                            bar2
                                            className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                                        />
                                        <span
                                            bar3
                                            className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                                        />
                                    </span>
                                </button>
                                <div
                                    navbar-menu
                                    className="items-center flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto"
                                >
                                    <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
                                        <li>
                                            <Link
                                                className="block px-4 py-2 mr-2 font-normal transition-all lg-max:opacity-0 duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2"
                                                to="/Login"
                                            >
                                                <i className="mr-1 fas fa-key opacity-60" />
                                                Go back
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <main className="mt-0 transition-all duration-200 ease-soft-in-out">
                <section>
                    <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
                        <div className="container z-10">
                            <div className="flex flex-wrap mt-0 -mx-3">
                                <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                        <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                                            <p className="mb-0">
                                                Enter your email and password to sign in
                                            </p>

                                        </div>
                                        <div className="flex-auto p-6">
                                            <form>
                                                <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                                                    Email
                                                </label>
                                                <div className="mb-4">
                                                    <input
                                                        type="email"
                                                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                        placeholder="Email"
                                                        aria-label="Email"
                                                        aria-describedby="email-addon"
                                                        onChange={e => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                                                    Password
                                                </label>
                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                        placeholder="Password"
                                                        aria-label="Password"
                                                        aria-describedby="passsword-addon"
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                </div>


                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                                                        // disabled={isButtonDisabled ? true : false}
                                                        onClick={verify}
                                                    >
                                                        {/* {isButtonDisabled ? 'Verifying....' : 'Verify'} */}
                                                        Verify
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                                {/* <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                    <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                      <div
                        className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10"
                        style={{
                          backgroundImage: "url('../assets/img/curved-images/curved6.jpg')",
                        }}
                      />
                    </div>
                  </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default PasswordReset;