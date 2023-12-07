import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AxiosContext = createContext();

export const DataExplorerApi = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an DataExplorerApiProvider');
  }
  return context;
};

const DataExplorerApiProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ViewToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWV3X2lkIjoiNjQ2MThhMWIxMzkzNjQ0NTllYjhkNjA3IiwiZXhwIjoxNjk5NjYyNTA3fQ.LCVU1wU8JDJa0ZSk687_juGKujjR9a318Wws_P9zWKQ';

    axios
      .get('https://api.innobetaforge.com/ViewInfo', {
        headers: {
          ViewToken: ViewToken,
        },
      })
      .then((response) => {
        setData(response.data);
  
        setLoading(false);
      })
      .catch((err) => {
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

export default DataExplorerApiProvider;
