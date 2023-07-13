import React, { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import logoImagen from "../Navbar/Logotipo.png";
import { useEffect } from "react";
import { readRol } from "./ApiRol";

const Navbar = () => {
  

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign-in";
    //navigate("/");
  };


  const [click, setClick] = useState(false)

  const [rol, setRol] = useState(false);
  useEffect(() => {

    const rolAdmin = async() => {
      try {

        const rol = await readRol();
        console.log(rol);
        if(rol === 'ADMINB'){
          setRol(true)
        }

      } catch (error) {
        console.error(error)
      }
    }

    rolAdmin();

  }, [])

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  
  
  const CrearCuenta = ()=>{
    return(
      <li>
        <Link to="/account" onClick={closeMobileMenu}>
          <p>Crear Cuenta Bancaria</p> 
        </Link>
      </li>
    )
  }
  const crearUsuario =()=> {
    return(
      <li>
        <Link to='/USER' onClick={closeMobileMenu}>
          <p>Crear Usuario</p>
        </Link>
      </li>
    )
  }

  const listarCuentas =()=>{
    return (
      <li>
        <Link to='/listAccount' onClick={closeMobileMenu}>
          <p>Cuentas</p>
        </Link>
      </li>
    )
  }
  return (
    <>
      <nav className="navbar">
        <div className="container flex_space">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : " fas fa-bars"}></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to="/home" onClick={closeMobileMenu}>
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to="/usuarios" onClick={closeMobileMenu}>
                <p>Usuarios</p>
              </Link>
            </li>
            <li>
              <Link to="/transferencias" onClick={closeMobileMenu}>
                <p>Transferencias</p>
              </Link>
            </li>
            <li>
              <Link to="/favorites" onClick={closeMobileMenu}>
                <p>Favoritos</p>
              </Link>
            </li>
            <li>
              <Link to='/perfil' onClick={closeMobileMenu}>
                <p>Perfil</p>
              </Link>
            </li>
            {rol && crearUsuario()}
            {rol && CrearCuenta()}
            {rol && listarCuentas()}
            
          </ul>
          
          <div className="login-area flex">
            <li>
              {/*Se quito CONTACT*/}
              <Link>
                <button onClick={cerrarSesion} className="primary-btn">
                  <p>Cerrar Sesion</p>
                </button>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <header>
        <div className="container flex_space">
          <div>
            <img className="imgLogo" src={logoImagen} alt="" />
          </div>
          <div className="logo">
            <img src="images/logo.png" alt="" />
          </div>

          <div className="contact flex_space ">
            <div className="box flex_space"></div>
            <div className="box flex_space">
              <div className="icons">
                <i className="fas fa-phone-volume"></i>
              </div>
              <div className="text">
                <h4>Llamanos:</h4>
                <Link to="/contact">+502 37946559</Link>
              </div>
            </div>
            <div className="box flex_space">
              <div className="icons">
                <i className="far fa-envelope"></i>
              </div>
              <div className="text">
                <h4>Contactanos</h4>
                <Link to="/contact">adminb@kinal.edu.gt</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar