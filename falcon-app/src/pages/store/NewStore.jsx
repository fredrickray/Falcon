import React, { useState, useEffect } from 'react';
import AsideBar from '../../components/AsideBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import useFetchStore from '../../hooks/useFetchStore';
import { Link } from 'react-router-dom';
const NewStore = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [logo, setLogo] = useState('');
  const { email } = localStorage
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [showFormField, setShowFormField] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/dlokxjygn/image/upload';
  const { data, error } = useFetchStore("http://localhost:9000/store/get-store")

  const showForm = () => {
    setShowFormField(!showFormField)
    
  }

  // to use the function "handleImageUpload" and set Image to send to the backend
  const saveImage = event => {
    setLogo(event.target.files[0]);
  };

  // To restrict amount of images to select to 5
  const maxImage = e => {
    const file = e.target.files[0];
    // setSelectedImage(URL.createObjectURL(files))
    if (file) {
      const imageUrl = window.URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      saveImage(e)
    }
  };

  const CREATE_STORE_URL = 'htttp://localhost:9000/store/create-store';
  // const CHECK_STORE_URL = "http://localhost:9000/store/get-store"
  const create = () => {
    const formData = new FormData();
    formData.append('file', logo);
    formData.append('upload_preset', 'b74r48f2');

    axios
      .post(CLOUDINARY_API, formData)
      .then(imageResponse => {
        console.log(imageResponse.data.secure_url);
        const logoUrl = imageResponse.data.secure_url;

        axios
          .post(CREATE_STORE_URL, {
            name: name,
            link: link,
            logo: logoUrl,
            email: email,
          })
          .then(response => {
            console.log(response.data);
            setIsButtonDisabled(false);
            Swal.fire({
              position: 'center',
              toast: true,
              title: `${response.data}`,
              color: 'red',
              showConfirmButton: false,
              timer: 2500,
            });
          })
          .catch(error => {
            console.log("Log error for the post to the backend")
            console.log(error);
            setIsButtonDisabled(false);
            Swal.fire({
              position: 'center',
              toast: true,
              title: `${error.data}`,
              color: 'red',
              showConfirmButton: false,
              timer: 2500,
            });
          });
      })
      .catch(error => {
        console.log("Log error for the image upload")
        console.log(error);
        setIsButtonDisabled(false);
        Swal.fire({
          position: 'center',
          toast: true,
          title: `${error}`,
          color: 'red',
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };




  return (
    <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
      <AsideBar />
      <main className="ease-soft-in-out xl:ml-68.5 relative h-screen max-h-screen rounded-xl transition-all duration-200">

        <nav
          class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
          navbarmain="true"
          navbar-scroll="true"
        >
          <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
              {/* <!-- breadcrumb --> */}
              <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li class="leading-normal text-sm">
                  <a class="opacity-50 text-slate-700" href>Store</a>
                </li>
                <li
                  class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                  aria-current="page"
                >
                  New Store
                </li>
              </ol>
              <h6 class="mb-0 font-bold capitalize">New Store</h6>
            </nav>

            <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                {/* <!-- online builder btn  --> */}
                <li class="flex items-center pl-4 xl:hidden">
                  <a
                    href
                    class="block p-0 transition-all ease-nav-brand text-sm text-slate-500"
                    sidenav-trigger
                  >
                    <div class="w-4.5 overflow-hidden">
                      <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                      <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                      <i class="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* <main className="mt-0 transition-all duration-200 ease-soft-in-out"> */}
        <section className="min-h-screen mb-32">
          <div
            className="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl"
            style={{
              backgroundImage: "url('../assets/img/b2.jpg')",
            }}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60" />
            <div className="container z-10">
              <div className="flex flex-wrap justify-center -mx-3">
                <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                  <p className="text-white">
                    Take your business to the next level🚀🚀🚀
                  </p>
                </div>
              </div>
            </div>
          </div>

          {data && (
            <div class="container">
              <div class="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
                <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                  <div class="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="p-6 mb-0 text-center bg-white rounded-t-2xl">
                      <h5>Store has already been made</h5>
                    </div>
                  </div>
                  <div style={{marginTop: "40%"}} className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                      <div class="relative flex flex-col h-full min-w-0 break-words bg-black border border-solid shadow-none rounded-2xl border-slate-100 bg-clip-border">
                        <div class="flex flex-col justify-center flex-auto p-6 text-center">
                          <Link to="/store/Products/new">
                            <i class="mb-4 fa fa-plus text-white" />
                            <h5 class="text-white">Create product</h5>
                          </Link>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          )}

          {!data && (
            <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
              <div class="relative flex flex-col h-full min-w-0 break-words bg-transparent border border-solid shadow-none rounded-2xl border-slate-100 bg-clip-border">
                <div class="flex flex-col justify-center flex-auto p-6 text-center">
                  {/* <Link to="/store/Products/new"> */}
                  <button onClick={showForm}>
                    {showFormField ?
                    <div>
                       <i class="mb-4 fa fa-minus text-slate-400" />
                       <h5 class="text-slate-400">Cancel</h5>
                    </div> 
                   
                    :
                    <div>
                      <i class="mb-4 fa fa-plus text-slate-400" />
                      <h5 class="text-slate-400">New Store</h5>
                    </div>
                    
                    }
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          )}

          {showFormField && (
            <div class="container">
              <div class="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
                <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                  <div class="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                      <h5>Create Store</h5>
                    </div>
                    <div class="flex-auto p-6">
                      <form>
                        <div class="mb-4">
                          <input
                            name="name"
                            type="text"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="email-addon"
                            required
                            onChange={e => setName (e.target.value)}
                          />
                        </div>

                        <div class="mb-4 flex items-center relative">
                          <span className="absolute left-3 text-gray-400">
                            http://localhost:9000/store/get-stores/
                          </span>
                          <input
                            name="link"
                            type="text"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 pl-8 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow relative" placeholder="Link"
                            aria-label="Link"
                            aria-describedby="email-addon"
                            onChange={e => setLink(e.target.value)}
                          />

                        </div>

                        <div class="mb-4">
                          <input
                            accept='image/png, image/jpeg, image/jpg'
                            type="file"
                            name="logo"
                            className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="lgog"
                            aria-label="logo"
                            aria-describedby="email-addon"
                            onChange={maxImage}
                          // onChange={handleForm}
                          />
                        </div>

                        {selectedImage &&
                          <img
                            src={selectedImage}
                            alt="Selected Image"
                            style={{
                              width: "50px",
                              height: "50px"
                            }}
                          />}

                        <div className="text-center">
                          <button
                            className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                            disabled={isButtonDisabled ? true : false}
                            onClick={create}
                            type='button'
                          >
                            {isButtonDisabled ? "Creating...." : "Create"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* </main> */}
      </main>
    </div>
  );
};

export default NewStore;
