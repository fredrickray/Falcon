import React, {useEffect} from 'react';
import axios from "axios"
const Blank = () => {
    useEffect(() => {
      const query = window.location.href.split('?')[1]
      const baseUrl = "http://localhost:9000/oauth/google/callback"
      if (query) {
        const oauthUrl = `${baseUrl}?${query}`
        console.log(oauthUrl)
        axios.get(oauthUrl)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
      }
    }, [])
    return ( <h1>Helllooooo</h1> );
}
 
export default Blank;