import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Navbar from './common/navbar';
import Crypto from './pages/Crypto/Crypto';
import Profile from './pages/Profile/Profile';
import BuyCrypto from './pages/BuyCrypto/BuyAndSellCrypto';
import { AuthContext } from './contexts/authContext';


const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path="/login" />
        <Route Component={News} path="/news" />
        <Route Component={Crypto} path="/crypto" />
        <Route Component={Profile} path="/profile" />
        <Route Component={BuyCrypto} path="/buy-crypto" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
