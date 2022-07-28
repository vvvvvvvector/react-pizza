import React from 'react';

import { Overlay, Header, Categories, Sort, Pizza, Pagination } from './components';

import './scss/components/_all.scss';

function App() {
  const [fetchedPizzas, setFetchedPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch("https://62e2f40c3891dd9ba8f276a3.mockapi.io/pizzas").then((res) => {
      return res.json();
    }).then((json) => {
      setFetchedPizzas(json);
    });
  }, []);

  // --------overlay--------
  const [overlayOpened, setOverlayOpened] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState(null);

  const onClickPizzaImage = (pizzaObj) => {
    setOverlayOpened(true);
    document.body.style.overflow = 'hidden';
    setSelectedPizza(pizzaObj);
  };

  const onClickCloseOverlay = () => {
    setOverlayOpened(false);
    document.body.style.overflow = 'visible';
  }
  // --------overlay--------

  return (
    <>
      {
        overlayOpened && (<Overlay
          onCloseOverlay={onClickCloseOverlay}
          pizza={selectedPizza} />)
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
                fetchedPizzas.map((pizza) => (
                  <Pizza
                    key={pizza.id}
                    onClickImage={onClickPizzaImage}
                    {...pizza} />
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
