import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Logo from "../../assets/logobot.png";
import React, { useState, useEffect, useContext } from "react";

const Login = () => {

  const [forgotPassword, setForgotPassword] = useState(false);


  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const username = (event.target as any).username.value;
    console.log("Username", username)
    const password = (event.target as any).password.value;
    console.log("Login", event.target);
  }

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    const username = (event.target as any).username.value;
    console.log("Username", username)
    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;
    
    console.log("Register", event.target);
  }


  return (
    // <div className="h-full w-full flex justify-center items- bg-secondary">
    <div className="w-full h-full  bg-white flex flex-col lg:flex-row rounded-lg shadow-lg">

      {/* Lado esquerdo com conteúdo de boas-vindas */}
      <div className="w-full lg:w-7/12 h-full bg-primary flex justify-center items-center text-white text-3xl">
        <div className="w-full lg:w-3/4 h-full flex flex-col justify-center items-center text-center">
          {/* Logo */}
          <div className="flex flex-col justify-center items-center mt-4">
            <img src={Logo} alt="logo" className="w-1/3 lg:w-2/4 rounded-full mb-4" />
          </div>
          {/* Texto de boas-vindas */}
          <div className="mb-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Welcome to</h1>
            <h2 className="text-2xl lg:text-3xl">CryptoBot UnB</h2>
          </div>
          {/* Texto de descrição */}
          <div className="mb-4 text-sm lg:text-base">
            <p>
              To keep connected with us please login with your personal info
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

      {/* Lado direito com formulário */}
      <div className="w-full lg:w-5/12 h-full flex justify-center items-center mt-4 lg:mt-0 lg:p-4 lg:pt-52">
        
        {/* Abas de login e registro */}
        
        {!forgotPassword && <Tabs
          className="w-full h-full"
          selectedTabClassName="border-b-2 border-primary"
        >
          {/* Lista de abas */}
          <TabList className="w-full flex justify-center items-center">
            <Tab className="m-2 nav-item">
              <span className="nav-link text-xl lg:text-3xl cursor-pointer">Entrar</span>
            </Tab>
            <Tab className="m-2 nav-item text-xl lg:text-3xl cursor-pointer">
              <span className="nav-link">Registrar</span>
            </Tab>
          </TabList>

          {/* Painel de login */}
          <TabPanel>
            <form className="flex flex-col items-center justify-center" onSubmit={handleLogin}>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <span onClick={() => setForgotPassword(true)} className="text-primary text-sm lg:text-base cursor-pointer hover:text-secondary">
                Esqueceu a senha?
              </span>
              <button
                type="submit"
                className=" w-4/6 min-w-5/6 p-2 m-2 bg-primary text-white rounded hover:bg-secondary transition-all duration-300">
                Entrar
              </button>
            </form>
          </TabPanel>

          {/* Painel de registro */}
          <TabPanel>
            <form className="flex flex-col items-center justify-center" onSubmit={handleRegister}>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <input
                id="email"
                type="password"
                placeholder="Password"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                className=" w-4/6 min-w-5/6 p-2 m-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className=" w-4/6 min-w-5/6 p-2 m-2 bg-primary text-white rounded hover:bg-secondary transition-all duration-300">
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
    //  </div>
  );
};

export default Login;
