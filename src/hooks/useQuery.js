import { useState, useEffect } from 'react';
import { config } from '../config';

const { resourceServerOrigin } = config;

const optionBase = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  referrerPolicy: 'no-referrer',
};

function useQuery({
  method,
  path,
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    ...optionBase,
    method,
  };
  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      const response = await fetch(`${resourceServerOrigin}/${path}`, options);
      const data = await response.json();
      setData(data)
      setIsLoading(false);
    }
    if (isLoading) {
      fetchData();
    }
  }, []);

  return {
    isLoading,
    data,
  };
}

export default useQuery;
