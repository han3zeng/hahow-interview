import { useState } from 'react';
import { config } from '../config';
import localSession from '../utils/localSession';

const { getData, setData } = localSession();
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

let controller = null;

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
    sessionId,
  }) {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const { signal } = controller;
    setState({
      data: state.data,
      isLoading: true,
    });

    if (sessionId) {
      const cacheData = getData({
        key: sessionId,
      });
      if (cacheData) {
        setState({
          data: cacheData,
          isLoading: false,
        });
        return;
      }
    }

    try {
      const response = await fetch(`${resourceServerOrigin}/${path}`, {
        ...options,
        signal,
      });
      const data = await response.json();
      setState({
        data,
        isLoading: false,
      });
      if (sessionId) {
        setData({
          key: sessionId,
          payload: data,
        });
      }
    } catch (e) {
      console.log('e: ', e);
    }
  }

  return [fetchData, {
    isLoading: state.isLoading,
    data: state.data,
  }];
}

export default useLazyQuery;
