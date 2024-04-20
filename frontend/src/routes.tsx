import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path="/login" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
