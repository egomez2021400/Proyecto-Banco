import axios from "axios";
import Swal from "sweetalert2";
const URL = "http://localhost:3012/api/";
const token = localStorage.getItem("token");

//Crea el usuario con método post
export const CreateUser = async (name, email, password, rol) => {
  try {
    await axios.post(
      `${URL}create-user`,
      {
        name: name,
        email: email,
        password: password,
        rol: rol,
      },
      {
        headers: { "x-token": token },
      }
    );
    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "El token ha expirado") {
      Swal.fire({
        icon: "error",
        tittle: "Oops...",
        text: message,
        showConfirmButtom: true,
        confirmButtomText: "ok",
      }).then((result) => {
        if (result.isComfirmed) {
          localStorage.removeItem("token");
          window.location.href = "/registrar";
        } else {
          localStorage.removeItem("token");
          window.location.href = "/registrar";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        tittle: "Oops...",
        text: message,
        confirmButtomText: "ok",
      });
    }
  }
};

//Crear un usuario por medio del ADMIN
export const createAccountUser = async (name, DPI, gender, address, phone, email, password, rol) => {
  try {
    await axios.post(
      `${URL}create-user`,
      {
        name: name,
        email: email,
        password: password,
        rol: rol,
        DPI: parseInt(DPI),
        gender: gender,
        address: address,
        phone: parseInt(phone),
      },
      {
        headers: { "x-token": token },
      }
    );
    return true;
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al crear el usuario 💀",
      confirmButtonText: "Ok",
    });
  }
};


export const UpdateUser = async (id, username, email, password, rol) => {
  try {
    const { data } = await axios.put(
      `${URL}update-user/${id}`,
      {
        username,
        email,
        password,
        rol,
      },
      { headers: { "x-token": token } }
    );
    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "el token ha expirado") {
      localStorage.removeItem("token");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        showConfirmButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        } else if (result.isDenied) {
          window.location.href = "/login";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message.password.msg ? message.password.msg : message,
        showConfirmButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
        } else {
        }
      });
    }
  }
};

export const DeleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}delete-user/${id}`, {
      headers: { "x-token": token },
    });
    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "el token ha expirado") {
      window.location.href = "/login";
    }
    if (message) {
      return message;
    }
  }
};