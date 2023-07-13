import axios from 'axios';
import Swal from 'sweetalert2';

const URL = "http://localhost:3012/api/";


export const readRol = async () => {
try {

    const token = localStorage.getItem('token');

    const response = await axios.get(`${URL}read-rol`, {
    headers: {
        'x-token': token
    },
    });

    return response.data.rol;

} catch (error) {
    Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.response.data.message,
    showConfirmButton: true,
    confirmButtonText: "OK"
    }).then(r => {
    if (r.isConfirmed) {
        if (error.response.data.message === 'El token ha expirado') {
        localStorage.removeItem('token');
        window.location.href = '/';
        }
    } else {
        if (error.response.data.message === 'El token ha expirado') {
        localStorage.removeItem('token');
        window.location.href = '/';
        }
    }
    });
}
};