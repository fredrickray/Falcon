import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GrClose } from 'react-icons/gr';
// import useFetchStore from '../../hooks/useFetchStore';
// import useFetch from '../../hooks/useFetch';
import Swal from 'sweetalert2';

const ManageStoreEdit = () => {

    // const { data } = useFetch("http://localhost:9000/store/store")
    // console.log(data)
    const { token, email } = localStorage
    const [name, setName] = useState("")
    const [link, setLink] = useState()
    const [description, setDescription] = useState("")
    // const UPDATE_URL = 
    let id = ""

    useEffect(() => {
        fetchStore()
    })


    const fetchStore = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_LOCAL_URL}/store`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                 id = response.data.response[0].id
                setName(response.data.response[0].name)
                setLink(response.data.response[0].name)

            }
            return         
        }
        catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                Swal.fire({
                    position: 'top-end',
                    // icon: 'success',
                    toast: true,
                    color: 'red',
                    title: 'Authorization token required',
                    showConfirmButton: false,
                    timer: 3000,
                });
                setTimeout(() => {
                    window.location.href = '/Login';
                }, 3000);
            }

        }
    }

    const saveChange = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_LOCAL_URL}/store/${id}`, { name, link: name, description }, {
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

    // React Quill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
        ],
    };

    return (
        <div className="bg-white">
            <nav
                navbar-main
                className="relative flex flex-wrap items-center justify-between w-full px-0 py-2 mx-6 mt-6 transition-all shadow-none bg-gray-950/80 duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
                navbar-scroll="true"
            >
                <div className=" start-0 flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit border-b border-solid border-black">
                    <nav
                        className="relative flex flex-wrap flex-col items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
                        navbar-main
                        navbar-scroll="true"
                    >
                        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                            <div className="flex items-center">
                                <Link to="/Store/setup">
                                    <GrClose className="mr-4" style={{ cursor: 'pointer' }} />
                                </Link>
                                <h6 className="mb-0 font-bold capitalize">Store setup for {''}</h6>
                            </div>
                            <nav className=" end-0 flex justify-end xl:margin: left-4">
                                <button
                                    type="button"
                                    className="ml-4 px-6 py-3 mt-6 mb-0 font-bold text-center text-black uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-green-600 to-green-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                                    style={{ background: '#FF9B00' }}
                                    onClick={saveChange}
                                >
                                    Save changes
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
                                                Store name
                                            </label>
                                            <input
                                                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </div>



                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="quantity"
                                        >
                                            Store URL
                                        </label>
                                        <div style={{ marginBottom: "10%", width: "100%", padding: "12px 16px 11px", lineHeight: "19px", color: "inherit", fontFamily: "inherit", backgroundColor: "#fff", backgroundClip: "padding-box", border: "1px solid #e0e0e0", borderRadius: "4px", borderShadow: "none", maxHeight: "41px", outline: "none", whiteSpace: "nowrap" }} className="mb-4 flex md:w-2/12 items-center transition-all .5">
                                            <span style={{ fontStretch: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} className="text-#828282 mr-0 max-w-20">
                                                http://localhost:9000/stores/get-stores/
                                            </span>
                                            <input
                                                name="link"
                                                type="text"
                                                className=" border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                                aria-label="Link"
                                                value={link}
                                                aria-describedby="email-addon"
                                                onChange={e => setLink(e.target.value)}
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
                                                Store description
                                            </label>
                                            <ReactQuill
                                                // className="form-input focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                // value={description}
                                                onChange={setDescription}
                                                modules={modules}
                                                placeholder="Type your text here..."
                                                style={{ height: "300px", marginBottom: "20%" }}
                                            />
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
}

export default ManageStoreEdit;