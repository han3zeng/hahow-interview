import { useState, useEffect } from 'react';
import { config } from '../config';

const { resourceServerOrigin } = config;

const initialState = {
  data: null,
  isLoading: true,
};

function useAPI({
  method,
  path,
}) {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    async function fetchData() {
      const options = {
        method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
      };
      const response = await fetch(`${resourceServerOrigin}/${path}`, options);
      const data = await response.json();
      setState({
        data,
        isLoading: false,
      });
    }
    fetchData();
  }, []);

  return {
    isLoadig: state.isLoading,
    data: state.data,
  };
}

export default useAPI;
