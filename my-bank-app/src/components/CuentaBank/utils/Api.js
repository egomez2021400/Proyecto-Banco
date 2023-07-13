import axios from 'axios';
import Swal from 'sweetalert2';

const URL = "http://localhost:3012/api/";

//Crear cuenta bancaria
export const createAccount = async (name, nickname, balance, typeAccount, typeBank, income, numberAccount) => {
    try {
        const Cuenta = {
            name,
            nickname,
            balance,
            typeAccount,
            typeBank,
            income,
            numberAccount
        };
        const token = localStorage.getItem("token")
        const response = await axios.post(`${URL}create-cuenta/:id`, Cuenta, {
            headers: {
            "x-token": token,
            },
        });
        return response.data;

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear cuenta bancaria',
            confirmButtonText: 'Ok'
        });
    };  
};