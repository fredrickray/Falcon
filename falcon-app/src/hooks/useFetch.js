import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
// import { axiosInstance } from '../services/axiosHandler';
const useFetch = url => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0)
  // const [location, setLocation] = useState("")
  // const [fee, setFee] = useState("")
  const { email } = localStorage;




  useEffect(
    () => {
      axios.post(url, { email }, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
        },
      })
        .then(response => {
          // console.log (response.data.data2.fee);
          // console.log(token)
          let data = response.data.data2;
          // console.log(data)
          setData(data);
          setCount(data.length)
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
  return { data, count };
};

export default useFetch;
