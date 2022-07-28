import React from 'react';

import { Overlay, Header, Categories, Sort, Pizza, Pagination } from './components';

import './scss/components/_all.scss';

import pizzas from './assets/pizzas.json';

function App() {
  // --------overlay--------
  const [isOverlayOpened, setIsOverlayOpened] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState(null);

  const onClickPizzaImage = (pizzaObj) => {
    setIsOverlayOpened(true);
    document.body.style.overflow = 'hidden';
    setSelectedPizza(pizzaObj);
  };

  const onClickCloseOverlay = () => {
    setIsOverlayOpened(false);
    document.body.style.overflow = 'visible';
  }
  // --------overlay--------

  return (
    <>
      {
        isOverlayOpened ?
          <Overlay
            onCloseOverlay={onClickCloseOverlay}
            pizza={selectedPizza} /> : null
      }
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
              {
                pizzas.map((pizza, index) => (
                  <Pizza
                    key={index}
                    onClickImage={onClickPizzaImage}
                    types={pizza.types}
                    sizes={pizza.sizes}
                    name={pizza.name}
                    cost={pizza.cost}
                    imageURL={pizza.imageURL} />
                ))
              }
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
