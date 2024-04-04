import React, { useState } from "react";
import axios from "axios";
import Logo from "../img/Logo.webp";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
// import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function Login() {
  const ApiUrl = process.env.REACT_APP_API_URL_Login;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    AUTH_KEY: "aldiakey",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

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
    <div className="container">
      <div className="inner-container">
        <figure>
          <img className="logo" src={Logo} alt="Logo del aldia pais" />
        </figure>
        <div>
          <h2 className="Title">Iniciar sesión</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="email-address" className="label">
              Your Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email-address"
                name="email"
                required
                className="input"
                placeholder="name@flowbite.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <p className="error-message">{errors.email}</p>
          </div>
          <div className="input">
            <label htmlFor="password" className="label">
              Your Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="input"
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <p className="error-message">{errors.password}</p>
          </div>
          <div>
            <button type="submit" className="submit-button">
              Iniciar sesión
            </button>
            <div className="flex justify-center">
              {loading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
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
