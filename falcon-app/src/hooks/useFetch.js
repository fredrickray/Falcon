import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import axios from 'axios';
// import { swal } from '../components/Swal';
const useFetch = url => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [count, setCount] = useState(0);
  const [store, setStore] = useState("");
  const { email, token } = localStorage;
  const navigate = useNavigate()

  useEffect(() => {
    setIsFetching(true);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        params: {
          email // Include email as a query parameter
        }
      })
      .then(response => {
        let data = response.data.data2;
        setData(data);
        setCount(data.length);
        setStore(data[0].store);
        setIsFetching(false);
      })
      .catch(err => {
        setIsFetching(false);
        if (err.response.data.error) {
          console.log(err.response.data.error);
          // swal('top-end', true, 'error', err.response.data.error, 3000 )
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'error',
            title: err.response.data.error,
            showConfirmButton: false,
            timer: 3000,
          });
          setError(err.response.data.error); // Set the error state
          navigate("/Login")
        }
      });
  }, [url, email, token, navigate]);

  return { data, count, store, isFetching, error };
};

export default useFetch;
