import React from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BookList from "./containers/BookList";
import CreateBook from "./containers/CreateBook";
import BookDetails from "./containers/BookDetails";
import EditBook from "./containers/EditBook";
import HeaderComponent from "./components/Header";



function App() {
  return (
      <Router>
          <div className="app">
              <HeaderComponent/>
              <div className="content">
                  <Routes>
                      <Route path="/" Component={BookList} />
                      <Route  path="/create" Component={CreateBook} />
                      <Route  path="/details/:bookId" Component={BookDetails} />
                      <Route  path="/edit/:bookId" Component={EditBook} />
                  </Routes>
              </div>
          </div>

      </Router>
  );
}

export default App;
