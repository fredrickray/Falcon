import React, { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import useFetchStore from '../../hooks/useFetchStore';
import AsideBar from '../../components/AsideBar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const NewProduct = () => {
  const [showInputField, setShowInputField] = useState(false);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [showThirdInput, setShowThirdInput] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.00');
  const [comparePrice, setComparePrice] = useState("0.00")
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState('');
  const [style, setStyle] = useState('');
  const [colour, setColour] = useState('');
  const [size, setSize] = useState('');
  const [editing, setEditing] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [value, setValue] = useState('4');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { email, token } = localStorage;
  const { store } = useFetchStore("https://falcon-server-jaek.onrender.com/store/store")
  // const { store } = useFetch("http://localhost:9000/store/get-products")
  // console.log(description)
  const handleOptionChange = () => {
    setShowInputField(true);
  };

  const toggleInputs = () => {
    if (!showSecondInput) {
      setShowSecondInput(true);
    } else if (!showThirdInput) {
      setShowThirdInput(true);
    }
  };

  const trashInput = () => {
    setShowInputField(false);
  };

  const trashSecondInput = () => {
    setShowSecondInput(false);
  };

  const trashThirdInput = () => {
    setShowThirdInput(false);
  };

  // Change a span tag to input tag
  const handleSpanClick = () => {
    setEditing(true);
  };

  // Quantity change
  const handleQuntityChange = event => {
    setQuantity(event.target.value);
    // setValue (event.target.value);
  };

  const handleInputChange = event => {
    setValue(event.target.value);
    setQuantity(event.target.value);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  // to handle image upload
  function handleImageUpload(event) {
    const images = event.target.files;
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      imageUrls.push(URL.createObjectURL(images[i]));
    }
    setSelectedImages(imageUrls);
  }

  // to use the function "handleImageUpload" and set Image to send to the backend
  const saveImage = event => {
    handleImageUpload(event);
    setImage(event.target.files[0]);
  };

  // To restrict amount of images to select to 5
  const maxImage = e => {
    const files = e.target.files;
    const maxFiles = 5; // set the maximum number of files here
    if (files.length > maxFiles) {
      Swal.fire({
        position: 'center',
        toast: true,
        title: `Please select not more than ${maxFiles} files.`,
        color: 'red',
        showConfirmButton: false,
        timer: 2500,
      });
      // alert(`Please select no more than ${maxFiles} files.`);
      e.target.value = null; // clear the selected files
    } else {
      saveImage(e); // call your saveImage function
    }
  };
  const CLOUDINARY_API =
    'https://api.cloudinary.com/v1_1/dlokxjygn/image/upload';
  const PRODUCT_URL = 'https://falcon-server-jaek.onrender.com/store/create-product';

  const response = (message) => {
    Swal.fire({
      position: 'top-end',
      color: "red",
      toast: true,
      title: message,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  const create = () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'b74r48f2');

    const sanitizedDescription = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });


    if (name.length === 0) {
      response("Name field must not be empty")
      return
    }

    if (description.length === 0) {
      response("Description field must not be empty")
      return
    }

    if (price.length === 0) {
      response("Price field must not be empty")
      return
    }

    if (quantity.length === 0) {
      response("Quantity field must not be empty")
      return
    }


    if (selectedImages.length === 0) {
      response("An Image must be selected")
      return
    }

    setIsButtonDisabled(true);
    axios
      .post(CLOUDINARY_API, formData)
      .then(imageResponse => {
        console.log(imageResponse.data.secure_url);
        const imageUrl = imageResponse.data.secure_url;

        axios
          .post(PRODUCT_URL, {
            name: name,
            description: sanitizedDescription,
            quantity: quantity,
            weight: weight,
            price: price,
            compare_price: comparePrice,
            image: imageUrl,
            style: style,
            size: size,
            colour: colour,
            email: email,
            store: store
          },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            }
          )
          .then(response => {
            console.log(response.data.message);
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
              title: "Product created succesfully",
            })
            // setTimeout(() => {
            window.location.href = "/Products"
            // }, 3000)
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
          title: `${error.data}`,
          color: 'red',
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const addAnother = () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'b74r48f2');
    setIsButtonDisabled(true);
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    //   'Access-Control-Allow-Origin': "https://api.cloudinary.com/v1_1/dlokxjygn/image/upload' ",
    // };

    axios
      .post(CLOUDINARY_API, formData)
      .then(imageResponse => {
        console.log(imageResponse.data.secure_url);
        const imageUrl = imageResponse.data.secure_url;

        axios
          .post(PRODUCT_URL, {
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
            store: store
          })
          .then(response => {
            console.log(response.data.message);
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
              title: "Product created succesfully",
            })
            setName("")
            setPrice("")
            setDescription("")
            setWeight("")
            setQuantity("")
            setImage("")
            setColour("")
            setSize("")
            setStyle("")
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
          title: `${error.data}`,
          color: 'red',
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  // Setting the value for various option in the dataOption field
  const multipleOptionChnage = event => {
    const { id, value } = event.target;

    if (id === 'Style') {
      setStyle(value);
      // setType("text")
    } else if (id === 'Size') {
      setSize(value);
      // setType("number")
    } else if (id === 'Colour') {
      setColour(value);
      // setType("text")
    }
  };


  // React Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
    ],
  };


  // const [store, setStore] = useState(null)

  // useEffect(() => {
  //   response()
  // }, [])

  // const response = async() => {
  //   try {
  //     const result = await axios.post("http://localhost:9000/store/store", { email }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     if(result.status === 200) {
  //       console.log(result.data.response)
  //       setStore(result.data.response[0].name)
  //     }
  //     return 
  //   } 
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  // console.log(description)

  const handleDescriptionChange = (content) => {
    setDescription(content);
  };

  if (store) {
    return (
      <div className="bg-white">
        <nav
          navbar-main
          className="relative flex flex-wrap items-center justify-between w-full px-0 py-2 mx-6 mt-6 transition-all shadow-none bg-gray-950/80 duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
          navbar-scroll="true"
        >
          <div className=" start-0 flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit border-b border-solid border-black">
            <nav
              className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
              navbar-main
              navbar-scroll="true"
            >
              <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                <div className="flex items-center">
                  <Link to="/Products">
                    <GrClose className="mr-4" style={{ cursor: 'pointer' }} />
                  </Link>
                  <h6 className="mb-0 font-bold capitalize">Add new product</h6>
                </div>
                <nav className=" start-0 flex justify-end xl:margin: left-4">
                  <button
                    type="button"
                    className="ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                    style={{ background: '#828282' }}
                    onClick={create}
                  >
                    Save & Preview{' '}
                  </button>
                  <button
                    type="button"
                    className="ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-green-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                    style={{ background: '#FF9B00' }}
                  >
                    Add Product +
                  </button>
                </nav>
              </div>
            </nav>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="flex flex-col lg:flex-row mx-auto container-fluid items-start p-[10px]">
            <div className="flex flex-row">
              <div className="w-full md:w-8/12 mx-2">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mt-4">
                    <div className="flex flex-wrap mt-4">
                      <div
                        className="w-full md:w-2/12 px-3 mb-6 md:mb-0"
                        style={{ marginBottom: '10%' }}
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
                          onChange={e => setName(e.target.value)}
                        />
                      </div>

                      <div
                        className="w-full px-3 rounded-md shadow-sm mb-4"
                        style={{ marginBottom: '10%' }}
                      >
                        <label
                          className="mb-2 ml-1 font-bold text-xs text-slate-700"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <ReactQuill
                          // className="form-input focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                          value={description}
                          onChange={handleDescriptionChange}
                          modules={modules}
                          placeholder="Type your text here..."
                          style={{ height: "300px", marginBottom: "20%" }}
                        />
                      </div>



                      <div
                        className="w-full md:w-6/12 px-3 pb"
                        style={{ marginBottom: '10%' }}
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
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                        />
                      </div>

                      <div
                        className="w-full md:w-6/12 px-3"
                        style={{ marginBottom: '10%' }}
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
                          value={comparePrice}
                          onChange={e => setComparePrice(e.target.value)}
                        />
                      </div>

                      <div
                        className="w-full md:w-2/12 px-3 mb-4"
                        style={{ marginBottom: '10%' }}
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
                          onChange={e => setWeight(e.target.value)}
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
                      style={{ marginTop: '8%' }}
                    />
                    <div className="-mt-8 gap-4 pt-4">
                      <p className=" ml-1 text-lg text-black-500">
                        Categories
                      </p>
                      <p className="text-slate-700">
                        Group your products into collections to make it easier for customers to find. Great examples are: Women's wear, Kid’s wear, Electronics.
                      </p>
                      <div className="mb-4">
                        <div className="mb-4">
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
                            style={{ color: '#ff9b00', marginTop: '8%' }}
                          >
                            + Create new category
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr
                      className="h-px m-0 bg-transparent bg-black"
                      style={{ marginTop: '8%' }}
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
                        style={{ background: '#FF9B00' }}
                        onClick={handleOptionChange}
                      >
                        + Add Option
                      </button>

                      <div className="flex flex-wrap mt-4 items-center">
                        {showInputField &&
                            <div
                              className="w-full md:w-4/12 px-3 pb"
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
                            </div>
                        }
                        {showInputField && (
                          <div
                            className="flex items-center justify-between w-full md:w-8/12 px-3 pb"
                            style={{ marginTop: '2%' }}
                          >
                            <div className='relative w-full'>
                              <input
                                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                                id="Style"
                                type="text"
                                style={{ marginTop: '8%' }}
                                // value={style}
                                onChange={multipleOptionChnage}
                              // value="0.00"
                              />
                              <div style={{ background: "#3a416f", color: "white", width: "80px", top: "48px", left: "20px" }} className='absolute top-1 left-2 rounded-lg w-[100px] px-3 py-2 text-[#F3F3F3] bg-[#3a416f] flex items-center justify-between text-xs'>
                                <div className='flex items-center'>
                                  <div className=''>
                                    MMaa
                                  </div>
                                  <div className='border-l border-gray-600 '>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 cursor-pointer">
                              <BsTrashFill onClick={trashInput} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap mt-4">
                        {showSecondInput &&
                          <div
                            className="w-full md:w-4/12 px-3 pb"
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
                            style={{ marginTop: '2%' }}
                          >
                            <input
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                              id="Size"
                              type={'number'}
                              style={{ marginTop: '8%' }}
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
                            style={{ marginTop: '5%' }}
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
                            style={{ marginTop: '2%' }}
                          >
                            <input
                              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow mr-4"
                              id="Colour"
                              type={'text'}
                              style={{ marginTop: '8%' }}
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
                          style={{ color: '#ff9b00', marginTop: '8%' }}
                          onClick={toggleInputs}
                        >
                          + Add more options
                        </button>}
                    </div>
                    <hr
                      className="h-px m-0 bg-transparent bg-black"
                      style={{ marginTop: '8%', marginBottom: '5%' }}
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
                          {value ? 'In stock' : 'Out of stock'}
                        </span>
                      </td>
                      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        {editing
                          ? <input
                            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            type="text"
                            value={value}
                            style={{ marginLeft: '30%' }}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                          />
                          : <span
                            className="font-semibold leading-tight text-xs text-slate-400"
                            onClick={handleSpanClick}
                            onChange={e => setQuantity(e.target.value)}
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

            <div
              className="flex flex-row flex-wrap shadow-md bg-gray-700 ml-4 mb-4"
              style={{
                backgroundColor: '#f9f9f9',
                color: '#828282',
                padding: "30px"
                // marginTop: '8%',
              }}
            >
              {selectedImages.map((imageUrl, index) => (
                <div className="multiple-image-upload__images__image-blk " key={index}>
                  <img
                    className="card w-full h-full mb-4 cursor-pointer object-cover object-center"
                    src={imageUrl}
                    alt={`Selected Img ${index}`}
                    style={{
                      width: '300px',
                      height: '300px',
                      // marginTop: "45px",
                      // marginLeft: '60px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                  {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-full">
                      Delete
                    </button>
                  </div> */}
                  <div className="multiple-image-upload__images__image-overlay">
                    <button className="btn--nostyle multiple-image-upload__images__delete-btn"><svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.33333 4.00065V2.66732C4.33333 1.93094 4.93029 1.33398 5.66667 1.33398H8.33333C9.06973 1.33398 9.66667 1.93094 9.66667 2.66732V4.00065M1 4.00065H13H1ZM2.33333 4.00065V13.334C2.33333 14.0704 2.93029 14.6673 3.66667 14.6673H10.3333C11.0697 14.6673 11.6667 14.0704 11.6667 13.334V4.00065H2.33333Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.3335 7.33398V11.334" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.6665 7.33398V11.334" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                  </div>
                </div>
              ))}

              <div
                className="input-wrapper"
                style={{
                  height: '300px',
                  width: '300px',
                  fontSize: '16px',
                  background: '#f9f9f9',
                  // marginLeft: '60px',
                  // marginTop: '45px',
                  border: '1px dashed ',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <input
                  accept="image/png, image/jpeg, image/jpg"
                  multiple
                  type="file"
                  max="5"
                  onChange={maxImage}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                  }}
                />
                <label
                  style={{
                    height: '100%',
                    width: '100%',
                    fontSize: '16px',
                    background: '#f9f9f9',
                    border: '1px dashed ',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex: 1,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ color: 'skyBlue' }}>
                    Drop images/videos here <br /> or click here to upload <br />
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'black',
                        textAlign: 'center',
                        display: 'block',
                      }}
                    >
                      Maximum of 5 media files
                    </span>
                  </span>
                </label>
              </div>

            </div>
          </div>

          <div
            className="flex ml-4 flex-row items-center mt-4"
            style={{ marginTop: '15%', marginLeft: '30%' }}
          >
            <button
              type="button"
              className="inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
              style={{ background: '#828282' }}
              onClick={create}
              disabled={isButtonDisabled ? true : false}
            >
              {isButtonDisabled ? 'Saving...' : 'Save & Preview'}
            </button>
            <button
              type="button"
              className="inline-block ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-green-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
              style={{ background: '#FF9B00' }}
              onClick={addAnother}
              disabled={isButtonDisabled ? true : false}
            >
              {isButtonDisabled ? "Saving..." : "Add Product +"}
            </button>
          </div>

        </div>

      </div>
    );
  }

  else {
    return (
      <div>
        <AsideBar />
        <main className='ease-soft-in-out xl:ml-68.5 relative h-screen max-h-screen rounded-xl transition-all duration-200'>
          <nav className='relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start'
            navbarmain='true' navbar-scroll='true'>
            <div className='flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit'>
              <nav>
                {/* <!-- breadcrumb --> */}
                <ol className='flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16'>
                  <li className='leading-normal text-sm'>
                    <a className='opacity-50 text-slate-700' href>Store</a>
                  </li>
                  <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current='page'>
                    Create product
                  </li>
                </ol>
                <h6 className='mb-0 font-bold capitalize'>Create product</h6>
              </nav>
              <div className='flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto'>
                <ul className='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
                  {/* <!-- online builder btn  --> */}
                  <li className='flex items-center pl-4 xl:hidden'>
                    <a href className='block p-0 transition-all ease-nav-brand text-sm text-slate-500' sidenav-trigger>
                      <div className='w-4.5 overflow-hidden'> <i className='ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all' /> <i className='ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all'
                      /> <i className='ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all' /> </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <section className='min-h-screen mb-32' style={{ marginLeft: '21%', marginTop: '10%' }}>
            {/* {handleShipping && ( */}
            <div style={{ marginTop: '3%' }}>
              <h1>You have not created a store yet</h1>
              <h5 className='leading-tight text-xs text-slate-400'>
                Begin right away!!
              </h5>
              <button
                className='inline-block ml-5 mr-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25  leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85'
                type=''
                style={{ background: '#FF9B00' }}
              >
                <Link to="/Store/new">Create Store</Link>
              </button>
            </div>
          </section>
        </main>
      </div>
    )
  }

};

export default NewProduct;


