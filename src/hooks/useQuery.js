import { useState, useEffect } from 'react';
import { config } from '../config';

const { resourceServerOrigin } = config;

const initialState = {
  data: null,
  isLoading: true,
};

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
  const [state, setState] = useState(initialState);
  const options = {
    ...optionBase,
    method,
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${resourceServerOrigin}/${path}`, options);
      const data = await response.json();
      setState({
        data,
        isLoading: false,
      });
    }
    if (state.isLoading) {
      fetchData();
    }
  }, []);

  return {
    isLoading: state.isLoading,
    data: state.data,
  };
}

export default useQuery;
