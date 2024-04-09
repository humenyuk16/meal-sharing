import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const parsedData = await response.json();
        setData(parsedData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error("There was an error fetching the data:", error);
      }
    }
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
