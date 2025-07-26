import { useEffect, useState } from 'react';
import { setAccessToken } from '../services/authentication';

const useHooks = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    setIsUserLoggedIn(setAccessToken());
    console.log(setAccessToken(), 'spotify_token');
  }, []);

  return {
    isUserLoggedIn,
  };
};

export default useHooks;
