const Login = () => {
  return (
    <div className="h-full w-full flex justify-center items-center bg-secondary">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-blue-950 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
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
              type="button">
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-950 hover:text-blue-800"
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
