import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@context/authContext';
import Navbar from 'common/navbar';
import BuyCrypto from '@pages/BuyCrypto/BuyAndSellCrypto';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import News from '@pages/News/News';
import Profile from '@pages/Profile/Profile';
import Crypto from '@pages/Crypto/Crypto';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;
  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route element={<Login />} path="/login" />
        {isAuthenticated && (
          <>
            <Route element={<Home />} path="/" />
            <Route element={<News />} path="/news" />
            <Route element={<Crypto />} path="/crypto" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<BuyCrypto />} path="/buy-crypto" />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
