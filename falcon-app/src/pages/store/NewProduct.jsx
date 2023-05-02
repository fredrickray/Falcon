import React, {useState} from 'react';
import {BsTrashFill} from 'react-icons/bs';
import axios from 'axios';

const NewProduct = () => {
  const [showInputField, setShowInputField] = useState (false);
  const [showSecondInput, setShowSecondInput] = useState (false);
  const [showThirdInput, setShowThirdInput] = useState (false);
  const [name, setName] = useState ('');
  const [price, setPrice] = useState ('');
  const [type, setType] = useState ('');
  const [quantity, setQuantity] = useState ('');
  const [description, setDescription] = useState ('');
  const [weight, setWeight] = useState ('');
  const [image, setImage] = useState ('');
  const [style, setStyle] = useState ('');
  const [colour, setColour] = useState ('');
  const [size, setSize] = useState ('');
  const [value, setValue] = useState ('4');
  const [editing, setEditing] = useState (false);
  const [selectedImages, setSelectedImages] = useState ([]);
  const email = localStorage.email;

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

  // Change a span tag to input tag
  const handleSpanClick = () => {
    setEditing (true);
  };

  // Quantity change
  const handleQuntityChange = event => {
    setQuantity (event.target.value);
    // setValue (event.target.value);
  };

  const handleInputChange = event => {
    setValue (event.target.value);
    setQuantity (event.target.value);
  };

  const handleInputBlur = () => {
    setEditing (false);
  };

  function handleImageUpload (event) {
    const images = event.target.files;
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      imageUrls.push (URL.createObjectURL (images[i]));
    }
    setSelectedImages (imageUrls);
  }

  const saveImage = event => {
    handleImageUpload (event);
    setImage (event);
  };

  const CLOUDINARY_API =
    'https://api.cloudinary.com/v1_1/dlokxjygn/image/upload';
  const PRODUCT_URL = 'http://localhost:9000/';

  const create = () => {
    const formData = new FormData ();
    formData.append ('file', image);
    formData.append ('upload_preset', 'b74r48f2');

    axios
      .post (CLOUDINARY_API, formData)
      .then (imageResponse => {
        console.log (imageResponse.data.secure_url);
        const imageUrl = imageResponse.data.secure_url;

        axios
          .post (PRODUCT_URL, {
            name: name,
            description: description,
            quantity: quantity,
            weight: weight,
            price: price,
            image: imageUrl,
            style: style,
            size: size,
            colour: colour,
            email: email,
          })
          .then (response => {
            console.log (response.data);
          })
          .catch (error => {
            console.log (error);
          });
      })
      .catch (error => {
        console.log (error);
      });
  };

  const multipleOptionChnage = event => {
    const {id, value} = event.target;

    if (id === 'Style') {
      setStyle (value);
      // setType("text")
    } else if (id === 'Size') {
      setSize (value);
      // setType("number")
    } else if (id === 'Colour') {
      setColour (value);
      // setType("text")
    }
  };
  console.log (size);
  console.log (style);
  console.log (colour);

  // const create = () => {
  //     axios.all ([
  //       axios.post (CLOUDINARY_API, formData),
  //       axios.post (
  //         PRODUCT_URL,
  //         // JSON.stringify(price, store, description, formData, quantity, email, name),
  //         // console.log(JSON.stringify)
  //         {
  //           name: name,
  //           description: description,
  //           quantity: quantity,
  //           weight: weight,
  //           price: price,
  //           image: formData.u,
  //           style: style,
  //           size: size,
  //           colour: colour,
  //           email: email,
  //         }
  //       ),
  //     ])
  //       .then (
  //         axios.spread ((imageResponse, TotalResponse) => {
  //           console.log (imageResponse.data);
  //           console.log (TotalResponse.data);
  //         })
  //       )
  //       .catch (err => {
  //         console.log (err);
  //       });
  //   };

  return (
    <div className="bg-white">
      <nav
        navbar-main
        class="relative flex flex-wrap items-center justify-between w-full px-0 py-2 mx-6 mt-6 transition-all shadow-none bg-gray-950/80 duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-scroll="true"
      >
        <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav
            class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
            navbar-main
            navbar-scroll="true"
          >
            <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
              <nav>
                {/* <!-- breadcrumb --> */}
                <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                  <li class="leading-normal text-sm">
                    <a class="opacity-50 text-slate-700" href>
                      Home
                    </a>
                  </li>
                  <li
                    class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                    aria-current="page"
                  >
                    Orders
                  </li>
                </ol>
                <h6 class="mb-0 font-bold capitalize">Orders</h6>
              </nav>

              <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                <div class="flex items-center md:ml-auto md:pr-4">
                  <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                    <span class="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                      <i class="fas fa-search" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      class="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                      placeholder="Type here..."
                    />
                  </div>
                </div>
                <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                  {/* <!-- online builder btn  --> */}

                  <li class="flex items-center pl-4 xl:hidden">
                    <a
                      // href="javascript"
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
                  <li class="flex items-center px-4">
                    <a
                      href
                      class="p-0 transition-all text-sm ease-nav-brand text-slate-500"
                    >
                      <i
                        fixed-plugin-button-nav
                        class="cursor-pointer fa fa-cog"
                        aria-hidden="true"
                      />
                      {/* <!-- fixed-plugin-button-nav  --> */}
                    </a>
                  </li>

                  {/* <!-- notifications --> */}

                  <li class="relative flex items-center pr-2">
                    <p class="hidden transform-dropdown-show" />
                    <a
                      href
                      class="block p-0 transition-all text-sm ease-nav-brand text-slate-500"
                      dropdown-trigger
                      aria-expanded="false"
                    >
                      <i class="cursor-pointer fa fa-bell" aria-hidden="true" />
                    </a>

                    <ul
                      dropdown-menu
                      class="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer"
                    >
                      {/* <!-- add show class on dropdown open js --> */}
                      <li class="relative mb-2">
                        <a
                          class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors"
                          href
                        >
                          <div class="flex py-1">
                            <div class="my-auto">
                              <img
                                src="../assets/img/team-2.jpg"
                                class="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl"
                              />
                            </div>
                            <div class="flex flex-col justify-center">
                              <h6 class="mb-1 font-normal leading-normal text-sm">
                                <span class="font-semibold">New message</span>
                                {' '}
                                from Laur
                              </h6>
                              <p class="mb-0 leading-tight text-xs text-slate-400">
                                <i
                                  class="mr-1 fa fa-clock"
                                  aria-hidden="true"
                                />
                                13 minutes ago
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>

                      <li class="relative mb-2">
                        <a
                          class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                          href
                        >
                          <div class="flex py-1">
                            <div class="my-auto">
                              <img
                                src="../assets/img/small-logos/logo-spotify.svg"
                                class="inline-flex items-center justify-center mr-4 text-white text-sm bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl"
                              />
                            </div>
                            <div class="flex flex-col justify-center">
                              <h6 class="mb-1 font-normal leading-normal text-sm">
                                <span class="font-semibold">New album</span>
                                {' '}
                                by Travis Scott
                              </h6>
                              <p class="mb-0 leading-tight text-xs text-slate-400">
                                <i
                                  class="mr-1 fa fa-clock"
                                  aria-hidden="true"
                                />
                                1 day
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>

                      <li class="relative">
                        <a
                          class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                          href
                        >
                          <div class="flex py-1">
                            <div class="inline-flex items-center justify-center my-auto mr-4 text-white transition-all duration-200 ease-nav-brand text-sm bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl">
                              <svg width="12px" height="12px">
                                <title>credit-card</title>
                                <g
                                  stroke="none"
                                  stroke-width="1"
                                  fill="none"
                                  fill-rule="evenodd"
                                >
                                  <g
                                    transform="translate(-2169.000000, -745.000000)"
                                    fill="#FFFFFF"
                                    fill-rule="nonzero"
                                  >
                                    <g transform="translate(1716.000000, 291.000000)">
                                      <g transform="translate(453.000000, 454.000000)">
                                        <path
                                          class="color-background"
                                          d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                          opacity="0.593633743"
                                        />
                                        <path
                                          class="color-background"
                                          d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <div class="flex flex-col justify-center">
                              <h6 class="mb-1 font-normal leading-normal text-sm">
                                Payment successfully completed
                              </h6>
                              <p class="mb-0 leading-tight text-xs text-slate-400">
                                <i
                                  class="mr-1 fa fa-clock"
                                  aria-hidden="true"
                                />
                                2 days
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div class="flex items-center">
            <a
              mini-sidenav-burger
              href="/"
              class="hidden p-0 transition-all ease-nav-brand text-sm text-slate-500 xl:block"
              aria-expanded="false"
            >
              <div class="w-4.5 overflow-hidden">
                <i class="ease-soft mb-0.75 relative block h-0.5 translate-x-[5px] rounded-sm transition-all bg-white" />
                <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm transition-all bg-white" />
                <i class="ease-soft relative block h-0.5 translate-x-[5px] rounded-sm transition-all bg-white" />
              </div>
            </a>
          </div>

          <div
            class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto"
            id="navbar"
          >
            <div class="flex items-center md:ml-auto md:pr-4">
              <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <span class="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-white transition-all">
                  <i class="fas fa-search" aria-hidden="true" />
                </span>
                <input
                  type="text"
                  class="pl-9 text-sm focus:shadow-soft-primary-outline bg-gray-950 placeholder:text-white/80 text-white/80 ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-white bg-clip-padding py-2 pr-3 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                  placeholder="Type here..."
                />
              </div>
            </div>
            <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
              <li class="flex items-center">
                <a
                  href="./pages/authentication/signin/illustration.html"
                  class="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm"
                >
                  <i class="fa fa-user sm:mr-1" aria-hidden="true" />
                  <span class="hidden sm:inline">Sign In</span>
                </a>
              </li>
              <li class="flex items-center pl-4 xl:hidden">
                <a
                  sidenav-trigger=""
                  class="block p-0 text-white transition-all ease-nav-brand text-sm"
                  href="/"
                  aria-expanded="false"
                >
                  <div class="w-4.5 overflow-hidden">
                    <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm transition-all bg-white" />
                    <i class="ease-soft mb-0.75 relative block h-0.5 rounded-sm transition-all bg-white" />
                    <i class="ease-soft relative block h-0.5 rounded-sm transition-all bg-white" />
                  </div>
                </a>
              </li>
              <li class="flex items-center px-4">
                <a
                  href="/"
                  class="p-0 text-white transition-all text-sm ease-nav-brand"
                >
                  <i
                    fixed-plugin-button-nav=""
                    class="cursor-pointer fa fa-cog"
                    aria-hidden="true"
                  />
                  {/* <!-- fixed-plugin-button-nav  --> */}
                </a>
              </li>

              {/* <!-- notifications dropdown --> */}

              <li class="relative flex items-center pr-2">
                <p class="hidden transform-dropdown-show" />
                <a
                  dropdown-trigger
                  href="/"
                  class="block p-0 text-white transition-all text-sm ease-nav-brand"
                  aria-expanded="false"
                >
                  <i class="cursor-pointer fa fa-bell" aria-hidden="true" />
                </a>

                <ul
                  dropdown-menu
                  class="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7 before:text-5.5 bg-gray-950 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-clip-padding px-2 py-4 text-left text-white opacity-0 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer"
                >
                  {/* <!-- add show class on dropdown open js --> */}
                  <li class="relative mb-2">
                    <a
                      class="group ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 dark:hover:bg-gray-200/80 lg:transition-colors"
                      href="/"
                    >
                      <div class="flex py-1">
                        <div class="my-auto">
                          <img
                            alt="text"
                            src="./assets/img/team-2.jpg"
                            class="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <h6 class="mb-1 font-normal leading-normal text-white text-sm group-hover:text-slate-700">
                            <span class="font-semibold">New message</span>
                            {' '}
                            from Laur
                          </h6>
                          <p class="mb-0 leading-tight text-white text-xs group-hover:text-slate-700 dark:opacity-80">
                            <i class="mr-1 fa fa-clock" aria-hidden="true" />
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li class="relative mb-2">
                    <a
                      class="group ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:text-slate-700 hover:bg-gray-200/80"
                      href="javascript"
                    >
                      <div class="flex py-1">
                        <div class="my-auto">
                          <img
                            src="./assets/img/small-logos/logo-spotify.svg"
                            class="inline-flex items-center justify-center mr-4 text-white text-sm bg-gradient-to-tl from-slate-850 to-gray-850 h-9 w-9 max-w-none rounded-xl"
                          />
                        </div>
                        <div class="flex flex-col justify-center">
                          <h6 class="mb-1 font-normal leading-normal text-white text-sm group-hover:text-slate-700">
                            <span class="font-semibold">New album</span>
                            {' '}
                            by Travis Scott
                          </h6>
                          <p class="mb-0 leading-tight text-white text-xs group-hover:text-slate-700 dark:opacity-80">
                            <i class="mr-1 fa fa-clock" aria-hidden="true" />
                            1 day
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li class="relative">
                    <a
                      class="group ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700 dark:hover:bg-gray-200/80"
                      href="javascript"
                    >
                      <div class="flex py-1">
                        <div class="inline-flex items-center justify-center my-auto mr-4 text-white transition-all duration-200 ease-nav-brand text-sm bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl">
                          <svg width="12px" height="12px" viewBox="0 0 43 36">
                            <title>credit-card</title>
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                transform="translate(-2169.000000, -745.000000)"
                                fill="#FFFFFF"
                                fillRule="nonzero"
                              >
                                <g transform="translate(1716.000000, 291.000000)">
                                  <g transform="translate(453.000000, 454.000000)">
                                    <path
                                      class="color-background"
                                      d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                      opacity="0.593633743"
                                    />
                                    <path
                                      class="color-background"
                                      d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div class="flex flex-col justify-center">
                          <h6 class="mb-1 font-normal leading-normal text-white text-sm group-hover:text-slate-700">
                            Payment successfully completed
                          </h6>
                          <p class="mb-0 leading-tight text-white text-xs group-hover:text-slate-700 dark:opacity-80">
                            <i class="mr-1 fa fa-clock" aria-hidden="true" />
                            2 days
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className=" mx-auto py-4 container-fluid">
          <div className="flex flex-row">
            <div className="w-full md:w-8/12 mx-2">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mt-4">
                  <div className="flex flex-wrap mt-4">
                    <div
                      className="w-full md:w-2/12 px-3 mb-6 md:mb-0"
                      style={{marginBottom: '10%'}}
                    >
                      <label
                        className="block font-bold tracking-wide text-slate-700 text-xs mb-2"
                        htmlFor="name"
                      >
                        Product name
                      </label>
                      <input
                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                        id="name"
                        type="text"
                        onChange={e => setName (e.target.value)}
                      />
                    </div>

                    <div
                      className="w-full px-3 rounded-md shadow-sm mb-4"
                      style={{marginBottom: '10%'}}
                    >
                      <label
                        className="mb-2 ml-1 font-bold text-xs text-slate-700"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-input focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                        id="description"
                        rows="3"
                        style={{height: '200px'}}
                        onChange={e => setDescription (e.target.value)}
                      />
                    </div>

                    <div
                      className="w-full md:w-6/12 px-3 pb"
                      style={{marginBottom: '10%'}}
                    >
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                        id="price"
                        type="number"
                        value="0.00"
                        onChange={e => setPrice (e.target.value)}
                      />
                    </div>

                    <div
                      className="w-full md:w-6/12 px-3"
                      style={{marginBottom: '10%'}}
                    >
                      <label
                        className="block mr-4 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Compare at Price
                      </label>
                      <input
                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                        id="price"
                        type="number"
                        value="0.00"
                      />
                    </div>

                    <div
                      className="w-full md:w-2/12 px-3 mb-4"
                      style={{marginBottom: '10%'}}
                    >
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="quantity"
                      >
                        Weight of this item in Kilograms
                      </label>
                      <input
                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                        id="quantity"
                        type="number"
                        onChange={e => setWeight (e.target.value)}
                      />
                    </div>

                    <div className="w-full md:w-2/12 px-3 mb-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="quantity"
                      >
                        Number of items in stock
                      </label>
                      <input
                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuntityChange}
                        // {e => setQuantity (e.target.value)}
                      />
                    </div>
                  </div>

                  <hr
                    className="h-px m-0 bg-transparent bg-black"
                    style={{marginTop: '8%'}}
                  />
                  <div className="-mt-8 gap-4 pt-4">
                    <p className=" ml-1 text-lg text-black-500">
                      Categories
                    </p>
                    <p className="text-slate-700">
                      Group your products into collections to make it easier for customers to find. Great examples are: Women's wear, Kid’s wear, Electronics.
                    </p>
                    <div className="mb-4">
                      <div class="mb-4">
                        <select
                          className="focus:shadow-soft-primary-outline block w-full pl-3  py-2 text-base border-gray-300 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                          id="validationState"
                        >
                          Select Categories
                          <option className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Select Categories
                          </option>
                        </select>
                        <div />
                        <button
                          type="button"
                          className="font-medium py-2 px-4 border-none  transition duration-150 ease-in-out"
                          style={{color: '#ff9b00', marginTop: '8%'}}
                        >
                          + Create new category
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr
                    className="h-px m-0 bg-transparent bg-black"
                    style={{marginTop: '8%'}}
                  />

                  <div className="-mt-8 gap-4 pt-4">
                    <p className=" ml-1 text-lg text-slate-700">
                      Product options
                    </p>
                    <p>
                      Use this when your product has various options like sizes or colors.
                    </p>
                    <button
                      type="button"
                      className="inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                      style={{background: '#FF9B00'}}
                      onClick={handleOptionChange}
                    >
                      + Add Option
                    </button>

                    <div className="flex flex-wrap mt-4">
                      {showInputField &&
                        <div
                          className="w-full md:w-4/12 px-3 pb"
                          style={{marginTop: '5%'}}
                        >
                          <label
                            className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="price"
                          >
                            Option 1
                          </label>

                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            list="options"
                            // id="Style"
                            type="text"
                            // value="Size"
                          />
                          <datalist id="options">
                            <option value="Style" />
                            <option value="Size">Size</option>
                            <option value="Colour">Colour</option>
                          </datalist>
                        </div>}
                      {showInputField &&
                        <div
                          className="flex items-center justify-between w-full md:w-8/12 px-3 pb"
                          style={{marginTop: '2%'}}
                        >
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                            id="Style"
                            type="text"
                            style={{marginTop: '8%'}}
                            // value={style}
                            onChange={multipleOptionChnage}
                            // value="0.00"
                          />
                          <div className="mt-4 cursor-pointer">
                            <BsTrashFill onClick={trashInput} />
                          </div>
                        </div>}
                    </div>

                    <div className="flex flex-wrap mt-4">
                      {showSecondInput &&
                        <div
                          className="w-full md:w-4/12 px-3 pb"
                          style={{marginTop: '5%'}}
                        >
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="price"
                          >
                            Option 2
                          </label>
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            list="options"
                            // id="Size"
                            type="text"
                            // value="Size"
                          />
                          <datalist id="options">
                            <option value="Style" />
                            <option value="Size">Size</option>
                            <option value="Colour">Colour</option>
                          </datalist>
                        </div>}
                      {showSecondInput &&
                        <div
                          className="flex items-center justify-between w-full md:w-8/12 px-3 pb"
                          style={{marginTop: '2%'}}
                        >
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                            id="Size"
                            type={'number'}
                            style={{marginTop: '8%'}}
                            onChange={multipleOptionChnage}
                            // value={size}
                          />
                          <div className="mt-4 cursor-pointer">
                            <BsTrashFill onClick={trashSecondInput} />
                          </div>
                        </div>}
                    </div>

                    <div className="flex flex-wrap mt-4">
                      {showThirdInput &&
                        <div
                          className="w-full md:w-4/12 px-3 pb"
                          style={{marginTop: '5%'}}
                        >
                          <label
                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="price"
                          >
                            Option 3
                          </label>
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            list="options"
                            // id="Colour"
                            type="text"
                            // value="Size"
                          />
                          <datalist id="options">
                            <option value="Style" />
                            <option value="Size">Size</option>
                            <option value="Colour">Colour</option>
                          </datalist>
                        </div>}
                      {showThirdInput &&
                        <div
                          className="flex items-center justify-between w-full md:w-8/12 px-3 pb"
                          style={{marginTop: '2%'}}
                        >
                          <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                            id="Colour"
                            type={'text'}
                            style={{marginTop: '8%'}}
                            onChange={multipleOptionChnage}
                            // value={colour}
                          />
                          <div className="mt-4 cursor-pointer">
                            <BsTrashFill onClick={trashThirdInput} />
                          </div>
                        </div>}
                    </div>

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
                  </div>
                  <hr
                    className="h-px m-0 bg-transparent bg-black"
                    style={{marginTop: '8%', marginBottom: '5%'}}
                  />
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="ml-1 text-lg text-slate-700 flex-grow">
                      Manage product variants
                    </p>
                    <button
                      type="button"
                      className="ml-5 mr-4 px-6 py-3 font-bold text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                      style={{
                        flexShrink: 0,
                        flexBasis: 'auto',
                        background: '#FF9B00',
                      }}
                      // onClick={handleOptionChange}
                    >
                      Edit
                    </button>
                  </div>

                  <p className="text-sm">
                    Variants are combinations of Product Options, e.g. small black shirt. Here,
                    <br />
                    {' '}
                    you can set pricing and inventory for for each option.
                  </p>
                </div>
              </div>
              <table className="items-center w-full mb-0 align-top border-gray-200 text-black-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900 ">
                      Options
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                      Price
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                      Status
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-black-900">
                      Stock
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <div className="flex px-2 py-1">

                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 leading-normal text-sm">
                            39
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <p className="mb-0 font-semibold leading-tight text-xs">
                        ₦30,000.00
                      </p>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <span className="font-semibold leading-tight text-xs text-black-400">
                        In stock
                      </span>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <span className="font-semibold leading-tight text-xs text-slate-400">
                        4
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <div className="flex px-2 py-1">

                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 leading-normal text-sm">
                            39
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <p className="mb-0 font-semibold leading-tight text-xs">
                        ₦30,000.00
                      </p>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <span className="font-semibold leading-tight text-xs text-black-400">
                        In stock
                      </span>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <span className="font-semibold leading-tight text-xs text-slate-400">
                        4
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <div className="flex px-2 py-1">

                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 leading-normal text-sm">
                            39
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <p className="mb-0 font-semibold leading-tight text-xs">
                        ₦30,000.00
                      </p>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <span className="font-semibold leading-tight text-xs text-black-400">
                        {value ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      {editing
                        ? <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            type="text"
                            value={value}
                            style={{marginLeft: '30%'}}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                          />
                        : <span
                            className="font-semibold leading-tight text-xs text-slate-400"
                            onClick={handleSpanClick}
                            onChange={e => setQuantity (e.target.value)}
                          >
                            {/* 4 */}
                            {value}
                          </span>}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div className='flex flex-row flex-wrap shadow-md bg-gray-700 ml-4 mb-4'
            style={{
              backgroundColor: "#f9f9f9",
              color: "#828282",
              marginTop: "8%"
            }}>
          {selectedImages.map ((imageUrl, index) => (
                <img
                  key={index}
                  className="card w-full h-full  mb-4"
                  src={imageUrl}
                  alt={`Selected Image ${index}`}
                  style={{
                    width: '300px',
                    height: "300px",
                    marginTop: '50px',
                    marginLeft: '60px',
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                />
              ))}
          <div className="input-wrapper"
              style={{
                height: "300px",
                width: "300px",
                fontSize: "16px",
                background: '#f9f9f9',
                marginLeft: "60px",
                marginTop: "45px",
                border: "1px dashed ",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}>
              <input 
                accept="image/png, image/jpeg" 
                multiple type="file"
                max="5"
                onChange={saveImage}
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                }} />
              <label style={{
                  height: "100%",
                  width: "100%",
                  fontSize: "16px",
                  background: '#f9f9f9',
                  border: "1px dashed ",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 1,
                  cursor: "pointer",
                }}>
                <span style={{color: "skyBlue"}}>
                  Drop images/videos here <br /> or click here to upload
                </span>
              </label>
          </div>

          </div>
          
          
         
          

          

          <div
            className="flex ml-4 flex-row items-center mt-4"
            style={{marginTop: '15%', marginLeft: '30%'}}
          >
            <button
              type="button"
              className="inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
              style={{background: 'lightGreen'}}
            >
              Save & Preview{' '}
            </button>
            <button
              type="button"
              className="inline-block ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-green-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
              style={{background: '#FF9B00'}}
            >
              Add Product +
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default NewProduct;
