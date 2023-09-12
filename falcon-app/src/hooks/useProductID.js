import {useState, useEffect} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import NotFound from '../components/notFound';

const useProductId = (url) => {
    const [error, setError] = useState(null);
    const [data, setData]  = useState(null)
    const [store, setStore] = useState(null)
    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const { token } = localStorage
    // const navigate = useNavigate()

  
    useEffect (() => {
      setIsFetching(true)
        Axios.get (url, {
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
          .then (response => {
            let data = response.data.response;
            setStore(data[0].store)
            setId(data[0].id)
            setName(data[0].name)
            setData(data)
            setIsFetching(false)
          })
          .catch (error => {
            console.log(error.response)
            if(error.response.status === 401) {
              console.log(error.response.data)
              console.log("401")
              Swal.fire({
                position: 'top-end',
                // icon: 'success',
                toast: true,
                color: "red",
                title: 'Authorization token required',
                showConfirmButton: false,
                timer: 3000,
              })
              setIsFetching(false)
                window.location.href = "/Login"
            }
            if(error.response.status === 404) {
              console.log(error.response.data)
              setIsFetching(false)
              console.log("404") 
            }
            if(error.response.status === 500) {
              console.log(error.response.data)
              console.log("Internal server error")
            }
            setIsFetching(false)
            setError(error.response.status)

          });
      }, [url, token])
    return { error, data, store, id, name, isFetching }
}

export default useProductId;
