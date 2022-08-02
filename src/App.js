import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';

import { Home } from './pages/Home';
import { Cart } from './pages/Cart';

import './scss/components/_all.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="content__container">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<h1>Page not found :(</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
