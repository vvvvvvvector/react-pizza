import React from 'react';

import { Overlay, Header, Categories, Sort, Pizza, Pagination } from './components';

import './scss/components/_all.scss';

const pizzas = [{
  pizzaCost: 7,
  pizzaName: "Margherita",
  pizzaURL: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg"
}, {
  pizzaCost: 9,
  pizzaName: "Four Seasons",
  pizzaURL: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg"
}, {
  pizzaCost: 8,
  pizzaName: "Pepperoni",
  pizzaURL: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg"
}, {
  pizzaCost: 10,
  pizzaName: "Cheeseburger-pizza",
  pizzaURL: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
}];

function App() {
  const [isOverlayOpened, setIsOverlayOpened] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  const onPizzaImage = (pizzaObj) => {
    setIsOverlayOpened(true);
    document.body.style.overflow = 'hidden';
    setSelectedPizza(pizzaObj);
  };

  return (
    <React.Fragment>
      {
        isOverlayOpened ?
          <Overlay onCloseOverlay={() => {
            setIsOverlayOpened(false);
            document.body.style.overflow = 'visible';
          }} pizza={selectedPizza} /> : null
      }
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="content__container">
            <div className="content__top">
              <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <Sort />
            </div>
            <h2 className="content__title">
              All pizzas
            </h2>
            <div className="content__items">
              {
                pizzas.map((pizza, id) => (
                  <Pizza key={id} onImageClick={onPizzaImage} name={pizza.pizzaName} cost={pizza.pizzaCost} imageURL={pizza.pizzaURL} />
                ))
              }
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
