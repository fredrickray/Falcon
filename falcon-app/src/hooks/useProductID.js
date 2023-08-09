import {useState, useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
const useProductId = (url) => {
    const [error, setError] = useState(null);
    const [data, setData]  = useState(null)
    const { token } = localStorage

  
    useEffect (() => {
        Axios.get (url, {
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
          .then (response => {
            // console.log (response.data.response);
            let data = response.data.response;
            console.log(data)
            // localStorage.setItem ('productID', JSON.stringify (data));
            setData(data)
          })
          .catch (error => {
            console.log(error)
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
            setError(error.response.data.message)

          });
      }, [url, token])
    return { error, data }
}

export default useProductId;
