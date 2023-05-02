import { useState, useEffect } from "react";
import Axios from "axios"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        Axios.get(url, {

        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }, [url])
    return { data, error }
}
 
export default useFetch;