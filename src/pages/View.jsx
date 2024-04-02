import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/view.css";

function View() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://aldiapais.com/?rest_route=/wp/v2/posts&JWT=${token}&per_page=16&orderby=date&order=desc`
        );

        if (!response.ok) {
          throw new Error("No tienes autorización");
        }

        const postData = await response.json();
        setData(postData);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    history("/login", { replace: true });
  };

  if (loading) {
    return <h1>Cargando los posts...</h1>;
  }

  return (
    <div>
      <NavBar />
      <section className="wrap">
        {data.length > 0 ? (
          data.map((item) => <Card key={item.id} post={item} />)
        ) : (
          <h1>No hay posts disponibles</h1>
        )}
      </section>
    </div>
  );
}

export default View;
