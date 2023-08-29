import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { axiosInstance } from '../services/axiosHandler';
const useFetch = url => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0)
  const [store, setStore] = useState("")
  // const [location, setLocation] = useState("")
  // const [fee, setFee] = useState("")
  const { email, token } = localStorage;




  useEffect(
    () => {
      axios.post(url, { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
        .then(response => {
          // console.log (response.data.data2.fee);
          // console.log(token)
          let data = response.data.data2;
          // console.log(data[0].store)
          setData(data);
          setCount(data.length)
          setStore(data[0].store)
          // setFee(data.data2.slice(0,3).fee)
          // setLocation(data.data2.location)
        })
        .catch(err => {
          //  console.log(err)
          // if(err.response.data.message) {
          //   console.log(err.response.data.message)
          // }
      
          if (err.response.data.error) {
            console.log(err.response.data.error)
            Swal.fire({
              position: 'top-end',
              // icon: 'success',
              toast: true,
              color: "red",
              title: 'Authorization token required',
              showConfirmButton: false,
              timer: 3000,
            })
            setTimeout(() => {
              window.location.href = "/Login"
            }, 3000)
            setError(error);

          }
        });
    },
    [url, error, email]
  );
  return { data, count, store };
};

export default useFetch;
