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

function useLazyQuery({
  method,
}) {
  const [state, setState] = useState(initialState);

  const options = {
    ...optionBase,
    method,
  };

  async function fetchData({
    path,
  }) {
    setState({
      data: state.data,
      isLoading: true,
    });
    const response = await fetch(`${resourceServerOrigin}/${path}`, options);
    const data = await response.json();
    setState({
      data,
      isLoading: false,
    });
  }

  return [fetchData, {
    isLoading: state.isLoading,
    data: state.data,
  }];
}

export default useLazyQuery;
