import React from 'react'
import "../src/App.css"
import Navbar from './common/Navbar/Navbar'
import Home from "./components/Pages/Home"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import FormCuenta from './components/Login/FormCuenta'
import EventAdd from './components/EventoHotel/EventAdd '
import { isUserAuthenticated } from './components/Login/helpers/LoginHelper'
import ListUser from './components/User/component/ListUser'
import Cuenta from '../src/components/CuentaBank/Cuenta'
import ListCuenta from './components/CuentaBank/listCuenta'
import Perfil from './components/User/component/Perfil'
import MyComponent from './components/User/component/createUser'
import Favorites from './components/User/component/Favorites'
import TransferForm from './components/User/component/Transferencia'


//Lugar de redireccionamientos para toda la pagina (o lugar de llamadera )

function App() {
  return ( 
    <>
      <Router>
        {isUserAuthenticated() && <Navbar/>}
        <Routes>
          <Route path="/" element={isUserAuthenticated() ? <Home/> : <Login/>}/>
          <Route path='/sign-in' element={!isUserAuthenticated() ?(<Login/>) : (<Navigate to='/' replace={true}/>)}/>
          <Route path="/home" element={isUserAuthenticated() ?(<Home/>) : (<Navigate to='/' replace={true}/>)}/>

          <Route path="/register" element={<FormCuenta />} />
          <Route path="/addEvent" element={<EventAdd />} />
          <Route path='/usuarios' element={<ListUser />} />
          <Route path='/USER' element={<MyComponent />} />
          <Route path='/account' element={<Cuenta />} />
          <Route path='/favorite' element={<Favorites />} />
          <Route path='/listAccount' element={<ListCuenta />} />
          <Route path='/transferencias' element={<TransferForm />} />
          <Route path='/Perfil' element={<Perfil /> } />
          
        </Routes>
      </Router>
    </>
  );
}



export default App
