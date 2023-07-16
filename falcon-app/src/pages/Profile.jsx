import React, {useState, useEffect} from 'react';
import AsideBar from '../components/AsideBar';
import {BsTrashFill} from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
const Profile = () => {
  const [showInputField, setShowInputField] = useState (false);
  const [showSecondInput, setShowSecondInput] = useState (false);
  const [showThirdInput, setShowThirdInput] = useState (false);
  const [isButtonDisabled, setIsButtonDisabled] = useState (false);
  const [image, setImage] = useState (
    'https://res.cloudinary.com/dlokxjygn/image/upload/v1684341637/utxs0yadssiqbxjre0ev.jpg'
  );
  // const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate()
  const {firstname, lastname, username, email, phone} = localStorage;
  const [fname, setFname] = useState (firstname);
  const [lname, setLname] = useState (lastname);
  const [uname, setUserName] = useState (username);
  const [instagram, setInstagram] = useState ('');
  const [twitter, setTwitter] = useState ('');
  const [tiktok, setTikTok] = useState ('');
  const URL = 'http://localhost:9000/auth/socials';
  const UPDATE_URL = 'http://localhost:9000/auth/update';
  const CLOUDINARY_API =
    'https://api.cloudinary.com/v1_1/dlokxjygn/image/upload';
    // const userInfo_URL = "http://localhost:9000/auth/getUser"
    const { data } = useFetch("http://localhost:9000/store/get-products")
    // const [info, setInfo] = useState(null)
    // useEffect(() => {
    //   axios.get(userInfo_URL, {
    //     email: localStorage.email})
    //   .then(response => {
    //     console.log(response)
    //     // setInfo(response.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // })
  
  const profileImgAdd = event => {
    const file = event.target.files[0];
    const reader = new FileReader ();

    reader.onload = function (e) {
      setImage (e.target.result);
    };

    reader.readAsDataURL (file);
    // setSelectedFile(file);
  };

  const handleOptionChange = () => {
    setShowInputField (true);
  };

  const toggleInputs = () => {
    if (!showSecondInput) {
      setShowSecondInput (true);
    } else if (!showThirdInput) {
      setShowThirdInput (true);
    }
  };

  const trashInput = () => {
    setShowInputField (false);
  };
  const trashSecondInput = () => {
    setShowSecondInput (false);
  };

  const trashThirdInput = () => {
    setShowThirdInput (false);
  };

  // Add social media account details
  const Save = () => {
    axios
      .post (URL, {
        instagram,
        twitter,
        tiktok,
        email,
      })
      .then (response => {
        console.log (response);
        const {instagram, twitter, tiktok} = response.data.data;
        localStorage.setItem ('instagram', instagram);
        localStorage.setItem ('twitter', twitter);
        localStorage.setItem ('tiktok', tiktok);
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
          title: 'Socials accounts added successfully',
        });
      })
      .catch (err => {
        console.log (err)
        Swal.fire ({
          position: 'top-end',
          toast: true,
          title: err.response.data.message,
          color: 'red',
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const imageUpload = () => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'b74r48f2');
      setIsButtonDisabled(true);
  
      axios
        .post(CLOUDINARY_API, formData)
        .then(imageResponse => {
          console.log(imageResponse);
          console.log(imageResponse.data.secure_url);
          const imageUrl = imageResponse.data.secure_url;

          axios
            .post(UPDATE_URL, {
              fname,
              lname,
              uname,
              image: imageUrl,
            })
            .then(response => {
              console.log(response);
              setIsButtonDisabled(false);
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: toast => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });
  
              Toast.fire({
                icon: 'success',
                title: 'Profile Updated successfully',
              });
            })
            .catch(err => {
              console.log(err);
              setIsButtonDisabled(false);
            });
        })
        .catch(error => {
          console.log(error);
          setIsButtonDisabled(false);
          Swal.fire({
            position: 'top-end',
            toast: true,
            title: error.response.data.message,
            color: 'red',
            showConfirmButton: false,
            timer: 2500,
          });
        })
    
  };
  // to update user profile(to add a profile image)
  const update = () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'b74r48f2');
      setIsButtonDisabled(true);
  
      axios
        .post(CLOUDINARY_API, formData)
        .then(imageResponse => {
          console.log(imageResponse);
          console.log(imageResponse.data.secure_url);
          const imageUrl = imageResponse.data.secure_url;
  
          // Continue with the profile update API call
          axios
            .post(UPDATE_URL, {
              fname,
              lname,
              uname,
              image: imageUrl,
            })
            .then(response => {
              console.log(response);
              setIsButtonDisabled(false);
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: toast => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });
  
              Toast.fire({
                icon: 'success',
                title: 'Profile Updated successfully',
              });
            })
            .catch(err => {
              console.log(err);
              setIsButtonDisabled(false);
            });
        })
        .catch(error => {
          console.log(error);
          setIsButtonDisabled(false);
          Swal.fire({
            position: 'top-end',
            toast: true,
            title: error.response.data.message,
            color: 'red',
            showConfirmButton: false,
            timer: 2500,
          });
        });
    } else {
      // Continue with the profile update API call without uploading an image
      axios
        .post(UPDATE_URL, {
          fname,
          lname,
          uname,
        })
        .then(response => {
          console.log(response);
          setIsButtonDisabled(false);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
  
          Toast.fire({
            icon: 'success',
            title: 'Profile Updated successfully',
          });
        })
        .catch(err => {
          console.log(err);
          setIsButtonDisabled(false);
        });
    }
  };
  
  
  

  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-50 text-slate-500">
      <AsideBar />
      <div className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen bg-gray-50 transition-all duration-200">

      <nav class="absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2 text-white transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start" navbar-profile navbar-scroll="true">
        <div class="flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit">
          <nav>
            {/* <!-- breadcrumb --> */}
            <ol class="flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li class="leading-normal text-sm">
                <a class="opacity-50" href>Pages</a>
              </li>
              <li class="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/']" aria-current="page">Profile</li>
            </ol>
            <h6 class="mb-2 ml-2 font-bold text-white capitalize">Profile</h6>
          </nav>

          <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
              <li class="flex items-center pl-4 xl:hidden">
                <a href="javascript:;" class="block p-0 text-white transition-all ease-soft-in-out text-sm" sidenav-trigger>
                  <div class="w-4.5 overflow-hidden">
                    <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                    <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                    <i class="ease-soft relative block h-0.5 rounded-sm bg-white transition-all"></i>
                  </div>
                </a>
              </li>
              <li class="flex items-center px-4">
                <a hrefclass="p-0 text-white transition-all text-sm ease-soft-in-out">
                  <i fixed-plugin-button-nav class="cursor-pointer fa fa-cog" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <div class="w-full px-6 mx-auto">
          <div
            class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl"
            style={{
              backgroundImage: "url('../assets/img/curved-images/curved8.jpg')",
              backgroundPositiony: '50%',
            }}
          >
            <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60" />
          </div>
          <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
            <div class="flex flex-wrap -mx-3">
              <div class="flex-none w-auto max-w-full px-3">
                <div class="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                  <label for="profile-image" class="relative">
                    <img
                      src={image}
                      accept="image/png, image/jpeg, image/jpg"
                      alt="profile"
                      class="w-full shadow-soft-sm rounded-xl cursor-pointer"
                      // onChange={}
                    />
                    <input
                      type="file"
                      id="profile-image"
                      class="hidden"
                      onChange={profileImgAdd}
                    />
                  </label>
                </div>
              </div>

              <div class="flex-none w-auto max-w-full px-3 my-auto">
                <div class="h-full">
                  <h5 class="mb-1">{firstname} {lastname}</h5>
                  <p class="mb-0 font-semibold leading-normal text-sm">
                    CEO / Co-Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full p-6 mx-auto">
          <div class="flex flex-wrap -mx-3">

            <div class="w-full max-w-full px-3 xl:w-4/12">
              <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl flex flex-row">
                  <h6 class="mb-0">User Profile</h6>
                  <button
                    type="button"
                    className="inline-block ml-5  px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                    style={{background: 'lightGreen', marginLeft: '120px'}}
                    onClick={imageUpload}
                    disabled={isButtonDisabled ? true : false}
                  >
                    {isButtonDisabled ? 'Saving....' : 'Save'}
                  </button>
                </div>
                <div class="flex-auto p-4">
                  <h6 class="font-bold leading-tight uppercase text-xs text-slate-500">
                    Info
                  </h6>
                  <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                    <li class="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                      <div class="min-h-6 mb-0.5 block pl-0">
                        <div
                          className="w-full md:w-2/12 px-3 mb-6 md:mb-0"
                          style={{marginBottom: '10%'}}
                        >
                          <label
                            className="block font-bold tracking-wide text-slate-700 text-xs mb-2"
                            htmlFor="name"
                          >
                            First name
                          </label>
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            id="firstname"
                            type="text"
                            value={fname}
                            onChange={e => setFname (e.target.value)}
                          />
                        </div>
                      </div>
                    </li>
                    <li class="relative block px-0 py-2 bg-white border-0 text-inherit">
                      <div class="min-h-6 mb-0.5 block pl-0">
                        <div
                          className="w-full md:w-2/12 px-3 mb-6 md:mb-0"
                          style={{marginBottom: '10%'}}
                        >
                          <label
                            className="block font-bold tracking-wide text-slate-700 text-xs mb-2"
                            htmlFor="name"
                          >
                            Last name
                          </label>
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            id="name"
                            type="text"
                            value={lname}
                            onChange={e => setLname (e.target.value)}
                          />
                        </div>
                      </div>
                    </li>
                    <li class="relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit">
                      <div class="min-h-6 mb-0.5 block pl-0">
                        <div
                          className="w-full md:w-2/12 px-3 mb-6 md:mb-0"
                          style={{marginBottom: '10%'}}
                        >
                          <label
                            className="block font-bold tracking-wide text-slate-700 text-xs mb-2"
                            htmlFor="name"
                          >
                            Username
                          </label>
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            id="name"
                            type="text"
                            value={uname}
                            onChange={e => setUserName (e.target.value)}
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12">
              <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                  <div class="flex flex-wrap -mx-3">
                    <div class="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                      <h6 class="mb-0">Contact Details</h6>
                    </div>
                  </div>
                </div>
                <div class="flex-auto p-4">
                  <div
                    className="w-full md:w-2/12 px-3 mb-6 md:mb-0"
                    style={{marginBottom: '10%'}}
                  >
                    <label
                      className="block font-bold tracking-wide text-slate-700 text-xs mb-2"
                      htmlFor="name"
                    >
                      Phone Number
                    </label>
                    <input
                      className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                      id="name"
                      type="text"
                      value={phone}
                    />
                  </div>

                  <div
                    className="w-full md:w-2/12 px-3 mb-6 md:mb-0"
                    style={{marginBottom: '10%'}}
                  >
                    <label
                      className="block font-bold tracking-wide text-slate-700 text-xs mb-2"
                      htmlFor="name"
                    >
                      Email
                    </label>
                    <input
                      className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                      id="name"
                      type="text"
                      value={email}
                    />
                  </div>
                  <hr className="h-px m-0 bg-transparent bg-black" />
                  {/* style={{marginTop: '8%'}} */}
                  <hr class="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent" />
                  <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                    <div className="-mt-8 gap-4 pt-4">
                      <p className=" ml-1 text-lg text-slate-700">
                        Socials
                      </p>
                      <p>
                        Add social accounts.
                      </p>
                      {!showInputField &&
                        <button
                          type="button"
                          className="inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                          style={{background: '#FF9B00'}}
                          onClick={handleOptionChange}
                        >
                          + Add
                        </button>}

                      {showInputField &&
                        <div
                          className="flex flex-wrap mt-4"
                          style={{marginTop: '10%'}}
                        >
                          <label
                            className="flex  font-bold tracking-wide text-slate-700 text-xs mb-2"
                            htmlFor="name"
                          >
                            Instagram
                          </label>
                          <div className=" flex items-center justify-between w-full md:w-2/12 px-3 pb">
                            {/* // style={{marginTop: '2%'}} */}

                            <input
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                              id="instagram"
                              type="text"
                              value="https://instagram.com/user/"
                              onChange={e => setInstagram (e.target.value)}
                            />

                            <div className="mt-4 cursor-pointer">
                              <BsTrashFill onClick={trashInput} />
                            </div>
                          </div>
                        </div>}

                      {showSecondInput &&
                        <div
                          className="flex flex-wrap mt-4"
                          style={{marginTop: '10%'}}
                        >
                          <label
                            className="flex  font-bold tracking-wide text-slate-700 text-xs mb-2"
                            htmlFor="twitter"
                          >
                            Twitter
                          </label>
                          <div className=" flex items-center justify-between w-full md:w-2/12 px-3 pb">
                            {/* // style={{marginTop: '2%'}} */}

                            <input
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                              id="twitter"
                              type="text"
                              placeholder="https://twitter.com/user/mike"
                              value={twitter}
                              onChange={e => setTwitter (e.target.value)}
                            />
                            <div className="mt-4 cursor-pointer">
                              <BsTrashFill onClick={trashSecondInput} />
                            </div>
                          </div>
                        </div>}

                      {showThirdInput &&
                        <div
                          className="flex flex-wrap mt-4"
                          style={{marginTop: '10%'}}
                        >
                          <label
                            className="flex  font-bold tracking-wide text-slate-700 text-xs mb-2"
                            htmlFor="Tit-Tok"
                          >
                            Tik-Tok
                          </label>
                          <div className=" flex items-center justify-between w-full md:w-2/12 px-3 pb">
                            {/* // style={{marginTop: '2%'}} */}

                            <input
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                              id="price"
                              type="number"
                              placeholder="https://Tik_Tok.com/user/mike"
                              value={tiktok}
                              onChange={e => setTikTok (e.target.value)}
                            />
                            <div className="mt-4 cursor-pointer">
                              <BsTrashFill onClick={trashThirdInput} />
                            </div>
                          </div>
                        </div>}

                      {showInputField &&
                        !showThirdInput &&
                        <button
                          type="button"
                          className="font-medium py-2 px-4 border-none  transition duration-150 ease-in-out"
                          style={{color: '#ff9b00', marginTop: '8%'}}
                          onClick={toggleInputs}
                        >
                          + Add more options
                        </button>}
                      {showInputField &&
                        <button
                          type="button"
                          className="inline-block ml-5  px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                          style={{background: 'lightGreen'}}
                          onClick={Save}
                        >
                          Save
                        </button>}
                    </div>
                  </ul>
                </div>
              </div>
            </div>  

            <div className="flex-none w-full max-w-full px-3 mt-6">
              <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl">
                  <h6 className="mb-1">3 Recent Projects</h6>
                </div>
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap -mx-3">

                     {data?.map((result) => (
                    <div
                    key={result.id}
                     className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                      <div class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                        <div class="relative">
                          <a href class="block shadow-xl rounded-2xl">
                            <img
                              src={result.image.split('\r\n')[0]}
                              alt="img-blur-shadow"
                              class="max-w-full shadow-soft-2xl rounded-2xl"
                            />
                          </a>
                        </div>
                        <div class="flex-auto px-1 pt-6">
                          <p class="relative z-10 mb-2 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text">
                            Project #{result.id}
                          </p>
                          <a href>
                            <h5>{result.name}</h5>
                          </a>
                          <p class="mb-6 leading-normal text-sm">
                            {result.description}
                          </p>
                          <div class="flex items-center justify-between">
                            <button
                              type="button"
                              class="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                              onClick={() => navigate(`/Store/Product/${result.id}`)}
                            >
                              View Project
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                      ))}   
                    {/* <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                      <div class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                        <div class="relative">
                          <a href class="block shadow-xl rounded-2xl">
                            <img
                              src="https://res.cloudinary.com/dlokxjygn/image/upload/v1679792952/ije2lvjfohj8zssnqjn5.jpg"
                              alt="img-blur-shadow"
                              class="max-w-full shadow-soft-2xl rounded-xl"
                            />
                          </a>
                        </div>
                        <div class="flex-auto px-1 pt-6">
                          <p class="relative z-10 mb-2 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text">
                            Project #1
                          </p>
                          <a href>
                            <h5>Scandinavian</h5>
                          </a>
                          <p class="mb-6 leading-normal text-sm">
                            Music is something that every person has his or her own specific opinion about.
                          </p>
                          <div class="flex items-center justify-between">
                            <button
                              type="button"
                              class="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                            >
                              View Project
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                      <div class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                        <div class="relative">
                          <a href class="block shadow-xl rounded-2xl">
                            <img
                              src="../assets/img/home-decor-3.jpg"
                              alt="img-blur-shadow"
                              class="max-w-full shadow-soft-2xl rounded-2xl"
                            />
                          </a>
                        </div>
                        <div class="flex-auto px-1 pt-6">
                          <p class="relative z-10 mb-2 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text">
                            Project #3
                          </p>
                          <a href>
                            <h5>Minimalist</h5>
                          </a>
                          <p class="mb-6 leading-normal text-sm">
                            Different people have different taste, and various types of music.
                          </p>
                          <div class="flex items-center justify-between">
                            <button
                              type="button"
                              class="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                            >
                              View Project
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                      <div class="relative flex flex-col h-full min-w-0 break-words bg-transparent border border-solid shadow-none rounded-2xl border-slate-100 bg-clip-border">
                        <div class="flex flex-col justify-center flex-auto p-6 text-center">
                          <Link to="/store/Products/new">
                            <i class="mb-4 fa fa-plus text-slate-400" />
                            <h5 class="text-slate-400">New project</h5>
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
