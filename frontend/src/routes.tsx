import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './common/navbar';
import Consultor from './pages/Consultor/Consultor';
import Crypto from './pages/Crypto/Crypto';
import CryptoBot from './pages/CryptoBot/CryptoBot';
import Exchange from './pages/Exchange/Exchange';
import Extract from './pages/Extract/Extract';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import News from './pages/News/News';
import Profile from './pages/Profile/Profile';
import Transfer from './pages/Transfer/Transfer';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path="/login" />
        <Route Component={News} path="/news" />
        <Route Component={Crypto} path="/crypto" />
        <Route Component={Profile} path="/profile" />
        {/* <Route Component={BuyCrypto} path="/buy-crypto" /> */}
        <Route Component={Transfer} path="/transfer" />
        <Route Component={CryptoBot} path="/crypto-bot" />
        <Route Component={Exchange} path="/exchange" />
        <Route Component={Extract} path="/extract" />
        <Route Component={Consultor} path="/consultor" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
