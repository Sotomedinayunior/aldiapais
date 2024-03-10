import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilo predeterminado del editor de texto

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("publish"); // Estado predeterminado: publicado
  const [featuredImage, setFeaturedImage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Obtener las categorías disponibles desde WordPress
    axios
      .get("https://aldiapais.com/wp-json/wp/v2/categories")
      .then((response) => {
        setCategories(response.data);
        setSelectedCategory(response.data[0]?.id); // Establecer la primera categoría como la seleccionada por defecto
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", featuredImage);

    try {
      // Subir la imagen destacada
      const imageResponse = await axios.post(
        `https://aldiapais.com/?rest_route=/wp/v2/media`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Agrega el token de autorización si es necesario
          },
        }
      );

      // Crear la entrada con la URL de la imagen destacada
      const postData = {
        title,
        editorContent,
        categories: [selectedCategory],
        status,
        featured_media: imageResponse.data.id, // ID de la imagen subida
      };

      const postResponse = await axios.post(
        `https://aldiapais.com/?rest_route=/wp/v2/posts&JWT=${token}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token de autorización si es necesario
          },
        }
      );

      console.log("Entrada creada:", postResponse.data);
    } catch (error) {
      console.error("Error al crear la entrada:", error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label className="block mb-2">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Contenido:</label>
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 h-1000"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Categoría:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Imagen destacada:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Estado:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="publish">Publicado</option>
            <option value="draft">No publicado</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear entrada
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
