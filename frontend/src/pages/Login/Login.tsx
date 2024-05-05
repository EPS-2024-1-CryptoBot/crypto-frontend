
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Logo from "../../assets/logobot.png";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../contexts/authContext';
import { api } from '../../config/api';
import { redirect, useNavigate } from 'react-router-dom';

const Login = () => {
  const { signInWithMailAndPassword, signUpWithMailAndPassword, user, loading } = useContext(AuthContext);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      console.log('User logged in', user);
      redirectToHome();
    }

  }, [user]);

  const redirectToHome = () => {
    navigate('/');
  };

  const handleForgotPassword = async () => {
    const apiCall = await api.post('/auth/logout');
    console.log(apiCall);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;
    await signInWithMailAndPassword(email, password);
  }

  const handleRegister = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const firstName = (event.target as any).first_name.value;
      const lastName = (event.target as any).last_name.value;
      const email = (event.target as any).email.value;
      const password = (event.target as any).password.value;
      const confirmPassword = (event.target as any).confirm_password.value;

      if (password !== confirmPassword) {
        // alert('As senhas não coincidem');
        throw new Error('As senhas não coincidem');
        // return;
      }

      await signUpWithMailAndPassword(email, password, firstName, lastName);

    } catch (error) {
      console.error("ALERTA DE ERRO: ", error);
      alert(error);

    }
  }

  return (
    <div className="w-full h-full  bg-white flex flex-col lg:flex-row rounded-lg shadow-lg">
      <div className="w-full lg:w-7/12 h-full bg-primary flex justify-center items-center text-white text-3xl">
        <div className="w-full lg:w-3/4 h-full flex flex-col justify-center items-center text-center">
          <div className="flex flex-col justify-center items-center mt-4">
            <img src={Logo} alt="logo" className="w-1/3 lg:w-2/4 rounded-full mb-4" />
          </div>
          <div className="mb-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Bem-vindo ao</h1>
            <h2 className="text-2xl lg:text-3xl">CryptoBot UnB</h2>
          </div>
          <div className="mb-4 text-sm lg:text-base">
            <p>
              O CryptoBot UnB é uma plataforma de negociação de criptomoedas
              que permite a compra e venda de ativos digitais de forma
              descomplicada e segura.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tristique, nunc nec ultricies tincidunt, nulla metus tincidunt
              libero, nec tincidunt nunc metus sit amet mi. Integer et
              condimentum mi.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-5/12 h-full flex justify-center items-center mt-4 lg:mt-0 lg:p-4 lg:pt-52">


        {!forgotPassword && <Tabs
          className="w-full h-full"
          selectedTabClassName="border-b-2 border-primary"
        >
          <TabList className="w-full flex justify-center items-center">
            <Tab className="m-2 nav-item">
              <span className="nav-link text-xl lg:text-3xl cursor-pointer">Entrar</span>
            </Tab>
            <Tab className="m-2 nav-item text-xl lg:text-3xl cursor-pointer">
              <span className="nav-link">Registrar</span>
            </Tab>
          </TabList>

          <TabPanel>

            <form className="flex flex-col items-center justify-center" onSubmit={handleLogin}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
                required
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
                required
              />
              <span 
              onClick={() => !loading && setForgotPassword(true)} className="text-primary text-sm lg:text-base cursor-pointer hover:text-secondary">
                Esqueceu a senha?
              </span>

              <button
                type="submit"
                className=" w-4/6 min-w-5/6 p-2 m-2 bg-primary text-white rounded hover:bg-secondary transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
            </form>

          </TabPanel>

          <TabPanel>
            <form className="flex flex-col items-center justify-center" onSubmit={handleRegister}>
              <input
                id="first_name"
                type="text"
                placeholder="Nome"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <input
                id="last_name"
                type="text"
                placeholder="Sobrenome"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <input
                id="password"
                type="password"
                placeholder="Senha"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <input
                id="confirm_password"
                type="password"
                placeholder="Confirmar senha"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className=" w-4/6 min-w-5/6 p-2 m-2 bg-primary text-white rounded hover:bg-secondary transition-all duration-300"
                disabled={loading}
              >
                Registrar
              </button>
            </form>
          </TabPanel>
        </Tabs>}

        {forgotPassword && (
          <div className="h-full flex flex-col items-center w-4/6 min-w-5/6">
            <h1 className="text-2xl lg:text-3xl">Redefinir senha</h1>
            <p className="text-sm lg:text-base text-center">
              Insira seu email para redefinir sua senha
            </p>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 m-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleForgotPassword}
              className="w-full p-2 m-2 bg-primary text-white rounded hover:bg-secondary transition-all duration-300">
              Enviar
            </button>
            <span onClick={() => setForgotPassword(false)} className="text-primary text-sm lg:text-base cursor-pointer hover:text-secondary">
              Voltar
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
