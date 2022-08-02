import React from 'react';

import { Header } from './components';

import { Home } from './pages/Home';

import './scss/components/_all.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="content__container">
            <Home searchValue={searchValue} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
