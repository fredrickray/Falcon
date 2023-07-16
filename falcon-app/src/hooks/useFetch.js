import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { axiosInstance } from '../services/axiosHandler';
const useFetch = url => {
  const [data, setData] = useState (null);
  const [error, setError] = useState (null);
  const [count, setCount] = useState(0)
  const token = localStorage.token;
  
  // axiosInstance.interceptors.request.use( async(config) => {
  //   config.headers.Authorization = `Bearer ${token}`
  //   return config
  // })
  useEffect (
    () => {
      axios.post (url, {
        email: localStorage.email,
      })
        .then (response => {
          console.log (response);
          console.log(token)
          let data = response.data.data2;
          // console.log(data)
          setData (data);
          setCount(data.length)
        })
        .catch (err => {
          console.log (err);
          console.log(err.response.data.error)
          if(err.response.data.error) {
            Swal.fire ({
              position: 'top-end',
              // icon: 'success',
              toast: true,
              color: "red",
              title: 'Apple authentication is disabled',
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
    [url, error, token]
  );
  return {data, error, count};
};

export default useFetch;
