import { Routes, Route } from 'react-router-dom';

import { Header } from './components';

import { Cart, Home, NotFound } from './pages';

import './scss/components/_all_components.scss';
import './scss/pages/_all_pages.scss';

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="content__container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
