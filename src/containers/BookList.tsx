import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import debounce from 'lodash.debounce';

import { IBook } from '../libs/types';
import { deleteBook, getBooks } from '../services/api';
import { Link } from 'react-router-dom';
import { BiDetail } from '@react-icons/all-files/bi/BiDetail';
import { TiEdit } from '@react-icons/all-files/ti/TiEdit';
import { BsFillTrash2Fill } from '@react-icons/all-files/bs/BsFillTrash2Fill';
import DeleteBookDialog from '../components/DeleteDialog';

const BookList: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [bookId, setBookId] = useState<string>('');

    const defaultLimit: number = 10;

    const handleDeleteBook = (bookId: string) => {
        console.log({ bookId });
        deleteBookMutation(bookId);
        setShowDeleteDialog(false);
    };
    const debouncedSearch = debounce(() => {
        refetch();
    }, 3000);

    const { mutate: deleteBookMutation } = useMutation(deleteBook, {
        onSuccess: () => {
            refetch();
        },
        onError: (error: any) => {
            alert(`Error creating book: ${error.message}`);
        },
    });
    const {
        data: books,
        isLoading,
        refetch,
        isError,
        error,
    } = useQuery<IBook[], Error>(['books', page], () => getBooks(page, defaultLimit, searchQuery));

    useEffect(() => {
        console.log({ page });
    }, [page]);

    return (
        <div className="container">
            <div className="mt-5">
                <div>
                    <h2>Book List</h2>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                debouncedSearch();
                            }}
                            placeholder="Search by title..."
                            aria-label="Search by title"
                            aria-describedby="search-button"
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="search-button"
                        >
                            Search
                        </button>
                    </div>

                    {isLoading && <p className="h-5 text-primary">Loading...</p>}
                    {isError && <p className="h-4 text-danger ">Error: {error?.message}</p>}

                    {!isLoading && !isError && !books?.length && (
                        <div className="text-center justify-content-center">
                            <p className="h5 text-danger">No books available</p>
                        </div>
                    )}

                    {!isLoading && !isError && !!books?.length && (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Author</th>
                                        <th scope="col">Publication</th>
                                        <th scope="col">Pub Year</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books?.map((book: IBook) => (
                                        <tr key={book._id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.publication}</td>
                                            <td>{book.publicationYear}</td>
                                            <td>
                                                <div>
                                                    <Link to={`/details/${book._id}`}>
                                                        <BiDetail className="text-primary h3 me-2" />
                                                    </Link>
                                                    <Link to={`/edit/${book._id}`}>
                                                        <TiEdit className="text-warning h3 me-2" />
                                                    </Link>
                                                    <a
                                                        onClick={() => {
                                                            setBookId(book._id);
                                                            setShowDeleteDialog(true);
                                                        }}
                                                    >
                                                        <BsFillTrash2Fill className="text-danger h3 me-2" />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    <nav aria-label="Page navigation example">
                        <ul className="mt-2 pagination justify-content-center">
                            <li className="page-item">
                                <button
                                    disabled={page < 2}
                                    className="page-link"
                                    onClick={() => {
                                        setPage(page - 1);
                                        refetch();
                                    }}
                                >
                                    Previous
                                </button>
                            </li>
                            <li className="page-item">
                                <button
                                    disabled={!books?.length}
                                    className="page-link"
                                    onClick={() => {
                                        setPage(page + 1);
                                        refetch();
                                    }}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <DeleteBookDialog
                        show={showDeleteDialog}
                        handleClose={() => setShowDeleteDialog(false)}
                        handleDelete={() => {
                            handleDeleteBook(bookId);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookList;
