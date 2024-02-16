import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IBook } from '../libs/types';
import { getBook } from '../services/api';

const BookDetails: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();

    const {
        data: book,
        isLoading,
        isError,
        error,
    } = useQuery<IBook, Error>(['book', bookId], () => getBook(bookId));
    return (
        <div className="">
            {isLoading && <p className="h-5 text-primary">Loading...</p>}
            {isError && <p className="h-4 text-danger ">Error: {error?.message}</p>}

            {!isLoading && !isError && !book && (
                <div className="text-center justify-content-center">
                    <p className="h5 text-danger">Book details not found</p>
                </div>
            )}

            {!isLoading && !isError && !!book && (
                <div className="d-flex justify-content-center align-content-center">
                    <div className=" card card-w-50">
                        <h2 className="text-center">Book Details</h2>

                        <div className="card-body">
                            <h5 className="card-title">Title: {book.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Author: {book.author}</h6>
                            <p className="card-text">Summary: {book.summary || 'N/A'}</p>
                            <a href="#" className="card-link">
                                Publication: {book.publication}
                            </a>
                            <a href="#" className="card-link">
                                Year: {book.publicationYear}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;
