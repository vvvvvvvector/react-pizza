import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Loading } from './components';

import { Home } from './pages/Home';

import './scss/components/_all_components.scss';
import './scss/pages/_all_pages.scss';

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
);

const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
);

function App() {
  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='content__container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/cart'
                element={
                  <Suspense fallback={<Loading info='Cart is loading...' />}>
                    <Cart />
                  </Suspense>
                }
              />
              <Route
                path='*'
                element={
                  <Suspense fallback={<Loading info='Loading...' />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
