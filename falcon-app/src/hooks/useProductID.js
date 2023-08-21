import {useState, useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
const useProductId = (url) => {
    const [error, setError] = useState(null);
    const [data, setData]  = useState(null)
    const [store, setStore] = useState(null)
    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
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
            setStore(data[0].store)
            setId(data[0].id)
            setName(data[0].name)
            setData(data)
          })
          .catch (error => {
            console.log(error)
            if(error.response.status === 401) {
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
            }
            else{
              Swal.fire({
                position: 'top-end',
                toast: true,
                color: 'red',
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
            }
            setError(error.response.data.message)

          });
      }, [url, token])
    return { error, data, store, id, name }
}

export default useProductId;
