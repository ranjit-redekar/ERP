import { useState, useEffect } from 'react';
import axios from 'axios';

const useApiCallWithPagination = (url, page = 1, perPage = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          params: {
            _page: page,
            _limit: perPage,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page, perPage]);

  return { data, loading, error };
};

export default useApiCallWithPagination;
