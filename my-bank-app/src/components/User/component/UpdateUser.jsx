import React from 'react'
import { Modal } from 'react-bootstrap';

const UpdateUser = ({ isOpen, onClose, UserEdit}) => {

    if (!isOpen) {
        return null;
    }
  return (
    <>
    <Modal show={isOpen}>
        <Modal.Header>
        <Modal.Title className="text-dark">ID:{UserEdit._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <UpdateUser
            userProp={UserEdit}
            titleButton="Editar"
            option={2}
            ></UpdateUser>
            <button className='btn btn-danger' onClick={onClose}>
                Cerrar
            </button>
        </Modal.Body>
    </Modal>
    </>
)
}

export default UpdateUser
