import { useEffect, useState } from "react"
import { makeRequest } from "../MakeRequest"

const useFetch = (url) =>{ 
    
    const[data, setData] = useState([])

    useEffect(() => {
        const fetchData = async() =>{
            try {
                const res = await makeRequest.get(url) 
                setData(res.data.data)
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[url])
    return { data }
}

export default useFetch