import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {IBook} from "../libs/types";
import {createBook} from "../services/api";
import {useMutation} from "react-query";

const initialState: Partial<IBook> = {
    author: "",
    category: "",
    publication: "",
    publicationYear: "",
    summary: "",
    title: "",
}

const CreateBook: React.FC = () => {
    const [formState, setFormState] = useState<Partial<IBook>>({...initialState});

    const {mutate: createBookMutation} = useMutation(createBook, {
        onSuccess: () => {
            setFormState({ ...initialState });
            alert('Book created successfully');
        },
        onError: (error: any) => {
            alert(`Error creating book: ${error.message}`);
        },
    });
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void  => {
        e.preventDefault();
        let isValid = formState.title && formState.author && formState.publication && formState.category;
        if (isValid) {
            console.log({formState})
            createBookMutation(formState);
            setFormState({...initialState});
        } else {
            alert('Please fill in all required fields');
        }

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        console.log({name, value})
        setFormState({ ...formState, [name]: value });
    };

    useEffect(() => {
    }, []);


    return (
        <div className="container">
            <div className="mt-5">
                <div>
                    <h2>Create Book</h2>
                    <Form className="" onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3 " controlId="formTitle">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        name="title"
                                        value={formState.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAuthor">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter author"
                                        name="author"
                                        value={formState.author}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formCategory">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category"
                                        name="category"
                                        value={formState.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formPublication">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter publication"
                                        name="publication"
                                        value={formState.publication}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPublicationYear">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter publication year"
                                        name="publicationYear"
                                        value={formState.publicationYear}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formSummary">
                                    <Form.Control
                                        as="textarea"
                                        rows={8}
                                        placeholder="Enter summary"
                                        name="summary"
                                        value={formState.summary}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            Save Book
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;
