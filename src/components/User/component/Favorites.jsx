import React, { useEffect, useState } from "react";
import axios from "axios";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3012/api/add-favorite",
          {
            headers: {
              "x-token": token,
            },
          }
        );
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error("Error al obtener los favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container">
      <h1>Favoritos</h1>
      <div className="favorites-list">
        {favorites.map((favorite) => (
          <div key={favorite._id} className="favorite-item">
            <p>{favorite.apodo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
