import { useEffect } from 'react';
import Login from './pages/login/login';
import { Route, Routes } from 'react-router-dom';
import useHooks from './hooks/userHooks';
import Dashboard from './pages/dashboard/dashboard';

const Component = () => {
  const { isUserLoggedIn } = useHooks();

  if (!isUserLoggedIn) return <Login />;
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
