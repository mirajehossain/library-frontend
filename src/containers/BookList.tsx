import React, {useEffect, useState} from 'react';
import { useQuery } from 'react-query';

import {IBook} from "../libs/types";
import {getBooks} from "../services/api";
import {Link} from "react-router-dom";
import {BiDetail} from "@react-icons/all-files/bi/BiDetail";
import {TiEdit} from "@react-icons/all-files/ti/TiEdit";
import {BsFillTrash2Fill} from "@react-icons/all-files/bs/BsFillTrash2Fill";

const BookList: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const defaultLimit: number = 10;

    const {
        data: books,
        isLoading,
        refetch,
        isError,
        error
    } = useQuery<IBook[], Error>(['books', page], () => getBooks(page, defaultLimit));

    useEffect(() => {
        console.log({page});
    }, [page]);

    return (
        <div className="container">
            <div className="mt-5">
                <div>
                    <h2>Book List</h2>
                    {isLoading && <p className="h-5 text-primary">Loading...</p>}
                    {isError && <p className="h-4 text-danger ">Error: {error?.message}</p>}

                    {!isLoading && !isError && !books?.length && (
                        <div className="text-center justify-content-center"><p className="h5 text-danger">No books available</p></div>
                    )}

                    {!isLoading && !isError &&  !!books?.length && (<>
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
                                            <Link to={`/details/${book._id}`}><BiDetail className="text-primary h3 me-2" />
                                            </Link>
                                            <Link to={`/details/${book._id}`}><TiEdit className="text-warning h3 me-2" />
                                            </Link>
                                            <Link to={`/details/${book._id}`}><BsFillTrash2Fill className="text-danger h3 me-2" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>)}
                    <nav aria-label="Page navigation example">
                        <ul className="mt-2 pagination justify-content-center">
                            <li className="page-item"><button disabled={ page < 2} className="page-link" onClick={()=>{
                                setPage(page - 1);
                                refetch();
                            }}>Previous</button></li>
                            <li className="page-item"><button disabled={ !books?.length} className="page-link" onClick={()=>{
                                setPage(page + 1);
                                refetch();
                            }}>Next</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default BookList;
