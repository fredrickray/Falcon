import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const useFetchStore = url => {
    const [data, setData] = useState (null);
    const [error, setError] = useState (null);
    const { token, email } = localStorage
    const [store, setStore] = useState("")

    useEffect(() => {
        axios.post(url, {
          email
        })
        .then(response => {
            // console.log(response.data.response[0].name)
            setData(response.data)
            setStore(response.data.response[0].name)
        })
        .catch(err => {
          console.log(err.response.data.status)
          console.log(err.response.data.message)
          setError(err.response.data.status)
        })
      },
      [ url, error, token ])
      return { data, error, store }
}

export default useFetchStore;