import { useNavigate } from "react-router-dom";
import Logo from "../img/Logo.webp";
import "../styles/header.css";
function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Aquí puedes borrar el token o realizar cualquier otra acción necesaria
    // Por ejemplo, borrar el token almacenado en localStorage:
    localStorage.removeItem("token");

    // Redirigir a otra ruta (por ejemplo, la página de inicio de sesión)
    navigate("/login");
  };
  const HandleView = () => {
    navigate("/vista");
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
  return (
    <header className="Header">
      <nav className="Container-Nav">
        <div className="Column1">
          {" "}
          <a href="/aldiapais">
            {" "}
            <img src={Logo} alt="Logo" className="Img" />{" "}
          </a>
          <h1>
            <span className="Saludo">{getGreeting()} </span> Gladialisa
          </h1>
        </div>
        <div className="column2">
          <button onClick={HandleView} className="Btn">
            Ver posts
          </button>
          <button onClick={handleLogout} className="Btn">
            Cerrar session
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
