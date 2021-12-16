import { useState, useEffect } from 'react';
import { config } from '../config';
import { getData, setData } from '../utils/localSession';

const { resourceServerOrigin } = config;


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
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    if (sessionId) {
      const cacheData = getData({
        key: sessionId,
      });
      if (cacheData) {
        setState(cacheData);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`${resourceServerOrigin}/${path}`, {
        ...options,
        signal,
      });
      const data = await response.json();
      setState(data);
      setIsLoading(false);
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
    isLoading,
    data: state,
  }];
}

export default useLazyQuery;
