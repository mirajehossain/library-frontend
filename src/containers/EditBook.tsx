import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {IBook} from "../libs/types";
import { getBook, updateBook} from "../services/api";
import {useMutation, useQuery} from "react-query";
import {useParams,useNavigate} from "react-router-dom";

const EditBook: React.FC = () => {

    const [formState, setFormState] = useState<Partial<IBook>>();

    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();
    const {
        data: bookDetails,
        isError: isErrorFetchingBookDetails,
        error: bookDetailsError,
        refetch
    } = useQuery<IBook, Error>(['book', bookId], () => getBook(bookId));

    const {
        data: book,
        isLoading,
        isError,
        error,
    } = useQuery<IBook, Error>(['book', bookId], () => getBook(bookId));
    const {mutate: updateBookMutation} = useMutation((params: any) => updateBook(params.bookId, params.payload), {
        onSuccess: () => {
            refetch()
            alert('Book updated successfully');
            navigate(`/details/${bookId}`);
        },
        onError: (error: any) => {
            alert(`Error updating book: ${error.message}`);
        },
    });

    useEffect(() => {

        const initialState: Partial<IBook> = {
            title: bookDetails?.title ?? "",
            author: bookDetails?.author,
            category: bookDetails?.category,
            publication: bookDetails?.publication,
            publicationYear: bookDetails?.publicationYear,
            summary: bookDetails?.summary,
        }
        setFormState({ ...initialState });

    }, [bookDetails]);
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void  => {
        e.preventDefault();
        let isValid = formState?.title && formState?.author && formState?.publication && formState?.category;
        if (isValid) {
            console.log({formState})
            updateBookMutation({bookId: bookDetails?._id, payload: formState});
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
                    <h2>Edit Book</h2>
                    {isLoading && <p className="h-5 text-primary">Loading...</p>}
                    {(isError || isErrorFetchingBookDetails) && <p className="h-4 text-danger ">Error: {error?.message || bookDetailsError?.message}</p>}

                    {!isLoading && !isError && !book && (
                        <div className="text-center justify-content-center"><p className="h5 text-danger">Book details not found</p></div>
                    )}
                    <Form className="" onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3 " controlId="formTitle">
                                    <Form.Control
                                        type="text"
                                        placeholder="Book title"
                                        name="title"
                                        value={formState?.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAuthor">
                                    <Form.Control
                                        type="text"
                                        placeholder="Book author"
                                        name="author"
                                        value={formState?.author}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formCategory">
                                    <Form.Control
                                        type="text"
                                        placeholder="Book category"
                                        name="category"
                                        value={formState?.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formPublication">
                                    <Form.Control
                                        type="text"
                                        placeholder="Book publication"
                                        name="publication"
                                        value={formState?.publication}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPublicationYear">
                                    <Form.Control
                                        type="text"
                                        placeholder="Book publication year"
                                        name="publicationYear"
                                        value={formState?.publicationYear}
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
                                        placeholder="Book summary"
                                        name="summary"
                                        value={formState?.summary}
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

export default EditBook;
