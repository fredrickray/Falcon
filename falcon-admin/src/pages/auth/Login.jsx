import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
// import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [isButtonDisabled, setIsButtonDisabled] = useState (false);
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // const [isNavOpen, setIsNavOpen] = useState(false)
  const LOGIN_URL = 'https://falcon-server-jaek.onrender.com/auth/login';

  const response = (message) => {
    Swal.fire ({
      position: 'top-end',
      // icon: 'success',
      toast: true,
      title: message,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  const handleNavOpen = () => {
    setIsNavOpen(prev => !prev)
  }

  const login = () => {
    console.log("login")
    setIsButtonDisabled (true);
    Axios.post (LOGIN_URL, {
      email: email,
      password: password,
    }, 
    // {
    //   withCredentials: true,
    // }
    )
      .then (response => {
        console.log (response);
        setIsButtonDisabled(false)
        // setIsLoading(true)
        const {fname, lname, email, username, phone} = response.data.data;
        const token = response.data.token;
        localStorage.setItem ('firstname', fname);
        localStorage.setItem ('lastname', lname);
        localStorage.setItem ('email', email);
        localStorage.setItem ('username', username);
        localStorage.setItem ('phone', phone);
        localStorage.setItem ('token', token);
        sessionStorage.setItem ('token', token);
        setIsButtonDisabled (false);

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
          icon: 'success',
          title: `Signed in successfully ${fname}`,
        }).then ((window.location.href = '/Home'));
        // }
      })
      .catch (err => {
        console.log (err.response.data);
        response(err.response.data.message)
        setIsButtonDisabled (false);
      });
  };

  const facebookReg = () => {
    response('FaceBook authentication is disabled')
  };

  const appleReg = () => {
    response('Apple authentication is disabled')
  };

  const googleReg = () => {
    response('Google authentication, coming soon!!!')
  };

  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      <div className="container sticky top-0 z-sticky">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full px-3 flex-0">
            {/* <!-- Navbar --> */}
            <nav className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
              <div className="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit">
                <button
                  // onClick={handleNavOpen}
                  navbar-trigger
                  className="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
                  type="button"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={handleNavOpen}
                >
                  <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                    <span
                      bar1
                      className={`w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300 ${isNavOpen ? "rotate-45 origin-10-10 mt-1" : ""}`}
                    />
                    <span
                      bar2
                      className={`w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300 ${isNavOpen ? "opacity-0" : ""}`}
                    />
                    <span
                      bar3
                      className={`w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300 ${isNavOpen ? "-rotate-45 origin-10-90 mt-0.75" : ""}`}
                    />
                  </span>
                </button>
                <div
                  navbar-menu
                  className={`items-center flex-grow  transition-all duration-500 ease-soft ${isNavOpen ? "lg-max:max-h-54" : "lg-max:max-h-0" } basis-full lg:flex lg:basis-auto`}
                >
                  <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
                    <li>
                      <Link
                        className={`block px-4 py-2 mr-2 font-normal transition-all ${isNavOpen ? "lg-max:opacity-100" : "lg-max:opacity-0" } duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2`}
                        to="/Register"
                      >
                        <i className="mr-1 fas fa-user-circle opacity-60" />
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`block px-4 py-2 mr-2 font-normal transition-all ${isNavOpen ? "lg-max:opacity-100" : "lg-max:opacity-0" } duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2`}
                        to="/Login"
                      >
                        <i className="mr-1 fas fa-key opacity-60" />
                        Sign In
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
                      <h3 className="relative z-10 font-bold text-transparent bg-black bg-clip-text">
                        Welcome back
                      </h3>
                      <div id="googleDiv">
                        
                      </div>
                      <div className="flex flex-wrap px-3 -mx-3  lg:px-6 xl:px-12">

                        <div className="w-3/12 max-w-full px-1 ml-auto flex-0">
                          <a
                            className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                            href
                          >
                            <svg width="24px" height="32px" viewBox="0 0 64 64"
                              onClick={facebookReg}>
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <g
                                  transform="translate(3.000000, 3.000000)"
                                  fillRule="nonzero"
                                >
                                  <circle
                                    fill="#3C5A9A"
                                    cx="29.5091719"
                                    cy="29.4927506"
                                    r="29.4882047"
                                  />
                                  <path
                                    d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 L39.0974944,9.05587273 Z"
                                    fill="#FFFFFF"
                                  />
                                </g>
                              </g>
                            </svg>
                          </a>
                        </div>

                        <div className="w-3/12 max-w-full px-1 flex-0">
                          <a
                            className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                            href
                          >
                            <svg width="24px" height="32px" viewBox="0 0 64 64"
                              onClick={appleReg}>
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <g
                                  transform="translate(7.000000, 0.564551)"
                                  fill="#000000"
                                  fillRule="nonzero"
                                >
                                  <path d="M40.9233048,32.8428307 C41.0078713,42.0741676 48.9124247,45.146088 49,45.1851909 C48.9331634,45.4017274 47.7369821,49.5628653 44.835501,53.8610269 C42.3271952,57.5771105 39.7241148,61.2793611 35.6233362,61.356042 C31.5939073,61.431307 30.2982233,58.9340578 25.6914424,58.9340578 C21.0860585,58.9340578 19.6464932,61.27947 15.8321878,61.4314159 C11.8738936,61.5833617 8.85958554,57.4131833 6.33064852,53.7107148 C1.16284874,46.1373849 -2.78641926,32.3103122 2.51645059,22.9768066 C5.15080028,18.3417501 9.85858819,15.4066355 14.9684701,15.3313705 C18.8554146,15.2562145 22.5241194,17.9820905 24.9003639,17.9820905 C27.275104,17.9820905 31.733383,14.7039812 36.4203248,15.1854154 C38.3824403,15.2681959 43.8902255,15.9888223 47.4267616,21.2362369 C47.1417927,21.4153043 40.8549638,25.1251794 40.9233048,32.8428307 M33.3504628,10.1750144 C35.4519466,7.59650964 36.8663676,4.00699306 36.4804992,0.435448578 C33.4513624,0.558856931 29.7884601,2.48154382 27.6157341,5.05863265 C25.6685547,7.34076135 23.9632549,10.9934525 24.4233742,14.4943068 C27.7996959,14.7590956 31.2488715,12.7551531 33.3504628,10.1750144" />
                                </g>
                              </g>
                            </svg>
                          </a>
                        </div>

                        <div className="w-3/12 max-w-full px-1 mr-auto flex-0">
                          <a
                            className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                            href
                          >
                            <svg width="24px" height="32px" viewBox="0 0 64 64"
                              onClick={googleReg}>
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g
                                  transform="translate(3.000000, 2.000000)"
                                  fill-rule="nonzero"
                                >
                                  <path
                                    d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                                    fill="#4285F4"
                                  />
                                  <path
                                    d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                                    fill="#34A853"
                                  />
                                  <path
                                    d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                                    fill="#FBBC05"
                                  />
                                  <path
                                    d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                                    fill="#EB4335"
                                  />
                                </g>
                              </g>
                            </svg>
                          </a>
                        </div>
                        <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                      <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">
                        or
                      </p>
                    </div>
                      </div>
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
                            onChange={e => setEmail (e.target.value)}
                            required
                          />
                        </div>
                        <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                          Password
                        </label>
                        <div className="mb-4 relative flex">
                          <input
                            type={`${isOpen ? "text" : "password"}`}
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            onChange={e => setPassword (e.target.value)}
                            required
                          />
                          <div onClick={() => setIsOpen(prevState => !prevState)} className="absolute inset-y-0 left-3 flex items-center" style={{marginLeft: "90%"}}>
                          {isOpen ? <BsEyeFill /> : <BsEyeSlashFill />}
                        </div>
                        </div>

                        <div className="text-center">
                          <button
                            type="button"
                            className={`inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft ${isButtonDisabled ? "bg-gray-600" : "bg-black"}  hover:scale-102 hover:shadow-soft-xs active:opacity-85`}
                            disabled={isButtonDisabled ? true : false}
                            onClick={login}
                          >
                            {isButtonDisabled ? 'Loading....' : 'Sign in'}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className='font-bold' style={{color: "blue", fontSize: "16px"}}>
                      <Link to="/Reset-password" className=''>
                         Forgot password?
                      </Link>
                    </div>
                    <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                      <p className="mx-auto mb-6 leading-normal text-sm">
                        Don't have an account?
                        <Link
                          to="/Register"
                          className="relative z-10 font-semibold  text-slate-700 bg-clip-text"
                        >
                           Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                  <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                    <div
                      className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10"
                      style={{
                        backgroundImage: "url('../assets/img/curved-images/curved8.jpg')",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
