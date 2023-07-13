import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Swal from "sweetalert2";
import { createAccount } from './utils/Api';
import { useNavigate } from "react-router-dom"
import "./Cuenta.css"

export const Cuenta = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState("");
    const [balance, setBalance] = useState(0);
    const [typeAccount, setTypeAccount] = useState('');
    const [typeBank, setTypeBank] = useState('')
    const [income, setIncome] = useState(100)

    const imprimir = async (e) => {
        e.preventDefault();
        confetti();
        //window.location.href = "/home";

        try {
            const response = await createAccount(name, nickname, balance, typeAccount, typeBank, income);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta creada',
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
                title: 'Error al crear cuenta',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <>
            <div className='cuerpo'>
                <div className="form-container">
                    <h1>Crear Cuenta </h1>
                    <form>
                        <label className="text-black form-label">Nombre</label>
                        <input
                            type='text'
                            placeholder='Nombre de la cuenta'
                            className='form-control mb-3'
                            value={name}
                            onChange={(e) =>setName(e.target.value)}
                        />

                        <label className="text-black form-label">Nickname</label>
                        <input
                            type='text'
                            placeholder='Sobrenombre'
                            className='form-control mb-3'
                            value={nickname}
                            onChange={(e) =>setNickname(e.target.value)}
                        />

                        <label className="text-black form-label">Saldo</label>
                        <input
                            type='number'
                            placeholder='Saldo de la persona'
                            className='form-control mb-3'
                            value={balance}
                            onChange={(e) =>setBalance(e.target.value)}
                        />

                        <label className="text-black form-label">Tipo de Cuenta</label>
                        <input
                            type='text'
                            placeholder='Ahorro/Corriente/Nómina/Monetaria'
                            className='form-control mb-3'
                            value={typeAccount}
                            onChange={(e) =>setTypeAccount(e.target.value)}
                        />

                        <label className="text-black form-label">Tipo de Banco</label>
                        <input
                            type='text'
                            placeholder='Público/Privado/Mixto'
                            className='form-control mb-3'
                            value={typeBank}
                            onChange={(e) =>setTypeBank(e.target.value)}
                        />

                        <label className="text-black form-label">Cantidad a depositar</label>
                        <input
                            type='number'
                            placeholder='La cantidad debe ser mayor a Q.100.00'
                            className='form-control mb-3'
                            value={income}
                            onChange={(e) =>setIncome(e.target.value)}
                        />

                        <button className='btn btn-danger
                        p-3 botonForm' onClick={imprimir}>
                            Crear Cuenta
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Cuenta;