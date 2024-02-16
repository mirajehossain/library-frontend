import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BookList from '../containers/BookList';
import CreateBook from '../containers/CreateBook';

const BookComponent: React.FC = () => {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    const handleCreateBook = (): void => {
        setShowCreateForm(true);
    };
    const handleShowBookList = (): void => {
        setShowCreateForm(false);
    };

    return (
        <div className="container">
            <div className="mt-5">
                <h1>Digital Library</h1>
                <div className="mb-3">
                    <Button variant="primary" onClick={handleCreateBook} className="me-3">
                        Create Book
                    </Button>
                    <Button variant="secondary" onClick={handleShowBookList}>
                        Book List
                    </Button>
                </div>

                {showCreateForm ? <CreateBook /> : <BookList />}
            </div>
        </div>
    );
};

export default BookComponent;
