import {useState, useEffect} from 'react';
import Axios from 'axios';

const useProductId = (url) => {
    const [error, setError] = useState(null);
    const [data, setData]  = useState(null)

    // useEffect(() => {
    //   Axios.get(url)
    //     .then(response => {
    //       console.log(response)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // })
    // return {data, error}
    useEffect (() => {
        Axios.get (url)
          .then (response => {
            // console.log (response.data.response);
            let data = response.data.response;
            console.log(data)
            // localStorage.setItem ('productID', JSON.stringify (data));
            setData(data)
          })
          .catch (error => {
            console.log(error)
            setError(error.response.data.message)
            // console.log (error.response.data.status);
            // console.log (error.response.data.message);
          });
      }, [url])
    return { error, data }
}

export default useProductId;
