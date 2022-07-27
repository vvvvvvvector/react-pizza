import React from 'react';

import Header from './components/Header.jsx';
import Categories from './components/Categories.jsx';
import Sort from './components/Sort.jsx';
import Pizza from './components/Pizza.jsx';
import Pagination from './components/Pagination.jsx';

import './scss/components/_all.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="content__container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">
            All pizzas
          </h2>
          <div className="content__items">
            <Pizza pizzaCost={7} pizzaName={"Margherita"} pizzaImageURL={"https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg"} />
            <Pizza pizzaCost={9} pizzaName={"Four Seasons"} pizzaImageURL={"https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg"} />
            <Pizza pizzaCost={8} pizzaName={"Pepperoni"} pizzaImageURL={"https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg"} />
            <Pizza pizzaCost={10} pizzaName={"Cheeseburger-pizza"} pizzaImageURL={"https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"} />
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default App;
