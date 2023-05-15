import React from "react";

const Register = ({
  handleSubmit,
  message,
  bgCol,
  textCol,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/5 bg-white rounded-lg shadow-xl"
    >
      {message && (
        <div
          className={`bg-${bgCol} border-t-4 border-${textCol} rounded-b text-${textCol} py-3 shadow-md`}
          role="alert"
        >
          <div className="flex justify-center items-center">
            <div className="py-1">
              <svg
                className={`fill-current h-6 w-6 text-${textCol} mr-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{message}</p>
            </div>
          </div>
        </div>
      )}
      <div className="p-6">
        <h2 className="text-3xl font-medium mb-6 text-center underline">
          Register
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
