import { useState, useEffect } from "react";

export default function useFetch(url, callback) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Http error: ${res.status}`);
        }
        const fetchedData = await res.json();
        if (fetchedData && callback && typeof callback === "function") {
          setData(callback(fetchedData));
        } else {
          setData(fetchedData);
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
