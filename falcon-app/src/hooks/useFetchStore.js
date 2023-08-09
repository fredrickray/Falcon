import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const useFetchStore = url => {
    const [data, setData] = useState (null);
    const { token, email } = localStorage
    const [store, setStore] = useState("")
    const [link, setLink] = useState("")

    useEffect(() => {
        axios.post(url, {
          email
        }, {
          headers: {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
            setData(response.data)
            setStore(response.data.response[0].name)
            setLink(response.data.response[0].link)
        })
        .catch(err => {
          if (err.response.status === 401) {
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
            Swal.fire({
              position: 'top-end',
              toast: true,
              color: 'red',
              text: "Retrieved Store for user",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
      },
      [ url, token, link, email ])
      return { data, store, link }
}

export default useFetchStore;