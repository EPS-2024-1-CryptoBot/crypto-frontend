import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Navbar from './common/navbar';
import Crypto from './pages/Crypto/Crypto';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route Component={Home} path="/" />
        
        <Route Component={Login} path="/login" />
        <Route Component={News} path="/news" />
        <Route Component={Crypto} path="/crypto" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
