import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { api } from '../../config/api';

const Login = () => {
  const { signInWithMailAndPassword } = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(e);
    const email = e.target[0].value;
    const password = e.target[1].value;
    await signInWithMailAndPassword(email, password);
  };

  const handleForgotPassword = async () => {
    const apiCall = await api.post('/auth/logout');
    console.log(apiCall);
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-secondary">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-950 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-950 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-950 hover:text-blue-800"
              onClick={handleForgotPassword}
              href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
