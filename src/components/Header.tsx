import React from 'react';
import {Link} from "react-router-dom";

const HeaderComponent: React.FC = () => {
    return (
        <div className="container">
            <div className="mt-5">
                <h1>Digital Library</h1>
                <div className="mb-3">
                    <Link to="/create" className="me-3 btn btn-outline-primary">
                        Create Book
                    </Link>
                    <Link  className="btn btn-outline-primary" to="/">
                        Book List
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderComponent;
