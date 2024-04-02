import React, { useState } from "react";
import axios from "axios";
import Logo from "../img/Logo.webp";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"; // Importa los iconos de correo electrónico y candado

function Login() {
  const ApiUrl = process.env.REACT_APP_API_URL_Login;

  const navigate = useNavigate();
  // const tokenDefault = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    AUTH_KEY: "aldiakey",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Estado para mostrar la animación de carga

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Por favor ingresa un correo electrónico.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Por favor ingresa una contraseña.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true); // Mostrar la animación de carga

    try {
      const response = await axios.post(`${ApiUrl}`, formData);
      const token = response.data.data.jwt;

      localStorage.setItem("token", token);
      navigate("/aldiapais");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrors({
        email: "Las credenciales ingresadas son incorrectas.",
        password: "Las credenciales ingresadas son incorrectas.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800">
        <figure className="max-w-lg">
          <img
            className="h-auto max-w-lg mx-auto"
            src={Logo}
            alt="Logo del aldia pais"
          />
        </figure>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Iniciar sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="email-address-icon"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <HiOutlineMail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="email"
                id="email-address-icon"
                name="email"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="password-icon"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <HiOutlineLockClosed className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="password"
                id="password-icon"
                name="password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
            <div className="flex justify-center">
              {loading && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
