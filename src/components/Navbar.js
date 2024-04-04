import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../img/Logo.webp";
import "../styles/header.css";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const HandleView = () => {
    if (location.pathname === "/dashboard") {
      navigate("/aldiapais");
    } else if (location.pathname === "/aldiapais") {
      navigate("/dashboard");
    }
  };

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    let greeting = "Hola";

    if (currentTime >= 5 && currentTime < 12) {
      greeting = "Buenos días";
    } else if (currentTime >= 12 && currentTime < 18) {
      greeting = "Buenas tardes";
    } else {
      greeting = "Buenas noches";
    }

    return greeting;
  };

  const getViewButtonText = () => {
    return location.pathname === "/dashboard" ? "Ver posts" : "Crear post";
  };

  return (
    <header className="Header">
      <nav className="Container-Nav">
        <div className="Column1">
          <a href="/aldiapais">
            <img src={Logo} alt="Logo" className="Img" />
          </a>
          <h1>
            <span className="Saludo">{getGreeting()} </span> Gladialisa
          </h1>
        </div>
        <div className="column2">
          <button onClick={HandleView} className="Btn">
            {getViewButtonText()}
          </button>
          <button onClick={handleLogout} className="Btn">
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
