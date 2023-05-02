import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = (url) =>{
    const [data, setData] = useState([])
    const [searchItem, setSearchItem] = useState("")

    useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(URL)
          setData(res.data)
        }
        fetchData()
      }, [searchItem])

    return { data, searchItem }
}

export default useSearch;