import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useMutation, useQuery} from "react-query";
import {IBook} from "../libs/types";
import {createBook, deleteBook, getBook} from "../services/api";

interface DeleteBookDialogProps {
    show: boolean;
    handleClose: () => void;
    handleDelete: () => void;
}

const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({ show, handleClose, handleDelete, }) => {

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBookDialog;
