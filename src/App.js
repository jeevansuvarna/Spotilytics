import { useEffect, useState } from 'react';
import Login from './pages/login/login';
import { Route, Routes } from 'react-router-dom';
import useHooks from './hooks/userHooks';
import Dashboard from './pages/dashboard/dashboard';
import api, {
  getAccessToken,
  loginUrl,
  logout,
  setAccessToken,
} from './services/authentication';

const Component = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      setAccessToken(token);
      api
        .get('/me')
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error('Error fetching user', err);
          logout(); // fallback in case of bad token
        });
    }
  }, []);
  if (!user) return <Login />;
  return <Dashboard />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Component />} />
      </Routes>
    </>
  );
}

export default App;
