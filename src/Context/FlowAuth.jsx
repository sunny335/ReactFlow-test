import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AxiosContext = createContext(undefined);

export const FlowAuthApi = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return context;
};

const AxiosProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FlowToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbG93X2lkIjoiNjQ2MThhMWIxMzkzNjQ0NTllYjhkNjA3IiwiZXhwIjoxNzAxNDMyODA4fQ.NVBS-bX-lN9thGvF9dBon1aLikCSkw3_IYKQQUnz01w";
    axios.get('https://api.innobetaforge.com/FlowAuth', {
      headers: {
        'FlowToken': FlowToken
      }
    })
    .then(response => {
      setData(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []);

  return (
    <AxiosContext.Provider value={{ data, loading, error }}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
