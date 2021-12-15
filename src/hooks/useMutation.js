import { useState } from 'react';
import { config } from '../config';

const { resourceServerOrigin } = config;

const optionBase = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  referrerPolicy: 'no-referrer',
};

function useMutation({
  method,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    ...optionBase,
    method,
  };

  async function updateData({
    path,
    payload,
  }) {
    setIsLoading(true);
    try {
      await fetch(`${resourceServerOrigin}/${path}`, {
        ...options,
        body: JSON.stringify(payload),
      });
      setIsLoading(false);
    } catch (e) {
      console.log('e: ', e);
    }
  }

  return [
    updateData,
    {
      isLoading,
    },
  ];
}

export default useMutation;
