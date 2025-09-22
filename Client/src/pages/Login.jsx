import React, { useState, useEffect } from "react";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

   const navigate = useNavigate();
   const { login, user } = useAuthContext();

    useEffect(() => {
    if (user) {
        navigate("/");
    }
    }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await AuthService.login(
        logInData.email,
        logInData.password
      );
      if(currentUser.status === 200){
        swal
          .fire({
            icon: "success",
            title: "User Login",
            text: currentUser?.data?.message,
          })
          .then(() => {
            login(currentUser.data)
            navigate("/");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={logInData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={logInData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
