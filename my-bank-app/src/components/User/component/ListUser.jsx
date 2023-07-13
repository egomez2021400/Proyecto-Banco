import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../component/ListUser.css";

export const ListUser = () => {
  const [lista, setLista] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:3012/api/read-user", {
          headers: {
            "x-token": token,
          },
        });

        if (Array.isArray(res.data.user)) {
          setLista(res.data.user);
        }
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };

    getUsuarios();
  }, []);

  const addToFavorites = (user) => {
    setFavorites((prevFavorites) => [...prevFavorites, user]);
  };

  return (
    <div className="row">
      {lista.map((user) => (
        <div className="col-md-4 p-2" key={user._id}>
          <div className="card">
            <div className="card-header">
              <h5>Nombre: {user.name}</h5>
            </div>
            <div className="card-body">
              <p>Correo: {user.email}</p>
              <Link
                to="/favorites"
                className="btn btn-primary"
                onClick={() => addToFavorites(user)}
              >
                Agregar a favoritos
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListUser;
