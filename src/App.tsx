import React from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BookList from "./containers/BookList";
import CreateBook from "./containers/CreateBook";
import HeaderComponent from "./components/header";
import BookDetails from "./containers/BookDetails";



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
                  </Routes>
              </div>
          </div>

      </Router>
  );
}

export default App;
