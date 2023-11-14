import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const useFetchStore = url => {
    const [data, setData] = useState (null);
    const [isFetching, setIsFetching] = useState(false)
    const { token, email } = localStorage
    const [store, setStore] = useState("")
    const [link, setLink] = useState("")

    useEffect(() => {
      setIsFetching(true)
        axios.get(url, {
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          params: {
            email // Include email as a query parameter
          }
        })
        .then(response => {
            setData(response.data)
            setStore(response.data.response[0].name)
            setLink(response.data.response[0].link)
            setIsFetching(false)
        })
        .catch(err => {
          if (err.response.status === 401) {
            setIsFetching(false)
            Swal.fire({
              position: 'top-end',
              // icon: 'success',
              toast: true,
              color: 'red',
              title: 'Authorization token required',
              showConfirmButton: false,
              timer: 3000,
            });
            setTimeout(() => {
              window.location.href = '/Login';
            }, 3000);
          }
          else {
            // Handle other errors here, e.g., show an alert with the error message
            setIsFetching(false)
            console.log(err)
            // Swal.fire({
            //   position: 'top-end',
            //   toast: true,
            //   color: 'red',
            //   text: "Retrieved Store for user",
            //   showConfirmButton: false,
            //   timer: 3000,
            // });
          }
        })
      },
      [ url, token, link, email ])
      return { data, store, link, isFetching }
}

export default useFetchStore;