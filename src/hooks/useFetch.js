import { useEffect, useState } from 'react';

const useFetch = url => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const info = await res.json();
        info.results ? setData(info.results) : setData(info)
      } 
      catch(error) {
        setLoading(false);
      }
    
    }
    fetchData();
  }, [url])
  
  return data;
}

export default useFetch;