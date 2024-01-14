import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Loading } from '~/components/index';

import { Home } from '~/pages/home/home';

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ '~/pages/cart/cart')
);

const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ '~/pages/not-found/not-found')
);

export const App = () => {
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
};
