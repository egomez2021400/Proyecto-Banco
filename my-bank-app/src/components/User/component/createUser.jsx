import React, { useState } from "react";
import Swal from "sweetalert2";
import { createAccountUser } from "../api/UserApi";
import { useNavigate } from "react-router-dom";

// Ejemplo de uso en un componente
const MyComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [DPI, setDPI] = useState();

  const imprimir = async (e) => {
    e.preventDefault();

    try {
            const response = await createAccountUser(name, email, password, phone, gender, address, DPI);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario creado 🤑🫰',
                    showConfirmButton: false,
                    timer: 1500
                }).then((r) => {
                    if (r.isConfirmed) {
                        navigate('/home')
                    } else {
                        navigate('/home')
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el usuario 💀',
                showConfirmButton: false,
                timer: 1500
            })}
  }

  // Resto del componente
  return(
    <>
      <div className="container">
        <div className="form-container">
          <h1>Usuario</h1>
          <form action="">

            <div className="form-group">
              <label>Nombre</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Genero</label>
              <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>DPI</label>
              <input type="text" className="form-control" value={DPI} onChange={(e) => setDPI(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary" onClick={imprimir}>Crear cuenta</button>
          

          </form>
        </div>
      </div>
    </>
  )
};

export default MyComponent;