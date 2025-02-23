// import Home from './pages/login/dashboard/dashboard';
import Login from './pages/login/login';
// import Router from "./routes/router";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
