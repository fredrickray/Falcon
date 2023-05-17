import {useState, useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
const useFetch = url => {
  const [data, setData] = useState (null);
  const [error, setError] = useState (null);
  const [count, setCount] = useState(0)
  const token = localStorage.token;
  const headers =  {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`,
    'Access-Control-Allow-Origin': "https://localhost:9000/store/get-products"
  }
  useEffect (
    () => {
      Axios.post (url, {
        email: localStorage.email,
      }, headers)
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
            }).then(
              window.location.href = "/Login"
            )
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
