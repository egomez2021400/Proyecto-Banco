import React, { useState } from 'react';
import axios from 'axios';
import './Transf.css'

    const TransferForm = () => {
    const [cuentaOrigen, setCuentaOrigen] = useState('');
    const [cuentaDestino, setCuentaDestino] = useState('');
    const [monto, setMonto] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post('http://localhost:3012/api/transfers', {
        cuentaOrigen,
        cuentaDestino,
        monto,
        descripcion,
    });

    setMensaje(response.data.msg);
      // Aquí puedes actualizar el estado o realizar otras acciones después de la transferencia exitosa
    } catch (error) {
    setMensaje(error.response.data.msg);
      // Aquí puedes manejar el error de la transferencia
    }
    };

    return (
    <div className="container">
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="cuentaOrigen" className="form-label">
            <p>Cuenta de Origen:</p>
        </label>
        <input
            type="text"
            className="form-control"
            id="cuentaOrigen"
            value={cuentaOrigen}
            onChange={(e) => setCuentaOrigen(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="cuentaDestino" className="form-label">
            <p>Cuenta de Destino:</p>
        </label>
        <input
            type="text"
            className="form-control"
            id="cuentaDestino"
            value={cuentaDestino}
            onChange={(e) => setCuentaDestino(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="monto" className="form-label">
            <p>Monto:</p>
        </label>
        <input
            type="number"
            className="form-control"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
        />
        </div>
        <div className="mb-3">
        <label style={{color: 'white'}} htmlFor="descripcion" className="form-label">
            <p>Descripción:</p>
        </label>
        <input
            type="text"
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
        />
        </div>
        <button type="submit" className="btn btn-primary">Realizar Transferencia</button>
    </form>
    {mensaje && <p>{mensaje}</p>}
    </div>
);
}

export default TransferForm;