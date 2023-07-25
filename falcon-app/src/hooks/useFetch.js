import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { axiosInstance } from '../services/axiosHandler';
const useFetch = url => {
  const [data, setData] = useState (null);
  const [error, setError] = useState (null);
  const [count, setCount] = useState(0)
  const { email } = localStorage;
  
  // axiosInstance.interceptors.request.use( async(config) => {
  //   config.headers.Authorization = `Bearer ${token}`
  //   return config
  // })

  // const config = {
  //   headers: {
  //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg5OTYxODQzLCJleHAiOjE2OTAxMzQ2NDN9.ZpjgZGUOUVkJlHnMNVBwesysUm9rBCzMnOHbwa1pCFA",
  //   },
  // };
   
  // const axiosInstance = axios.create();

  //  // Add an interceptor to set the "Authorization" header with the token
  //  axiosInstance.interceptors.request.use((config) => {
  //   const {token} = localStorage;
  //   if (token) {
  //     config.headers["Authorization"] = `Bearer ${token}`;
  //   }
  //   return config;
  // });


  // let config = axios.create({
  //   headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  // })

  // console.log(token)


  useEffect (
    () => {
      axios.post (url, {email} )
        .then (response => {
          console.log (response);
          // console.log(token)
          let data = response.data.data2;
          // console.log(data)
          setData (data);
          setCount(data.length)
        })
        .catch (err => {
          // console.log (err.d);
          console.log(err.response.data.error)
          if(err.response.data.error) {
            Swal.fire ({
              position: 'top-end',
              // icon: 'success',
              toast: true,
              color: "red",
              title: 'Authorization token required',
              showConfirmButton: false,
              timer: 2500,
            })
            // .then(
            //   window.location.href = "/Login"
            // )
            setError (error);
            
          }
        //   console.log(token)
        });
    },
    [url, error]
  );
  return { data, count };
};

export default useFetch;
