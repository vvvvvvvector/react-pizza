import React from 'react';
import axios from 'axios';

import { Overlay, Header, Categories, Sort, Pizza, Skeleton, Pagination } from './components';

import './scss/components/_all.scss';

function App() {
  const [loading, setLoading] = React.useState(true);
  const [fetchedPizzas, setFetchedPizzas] = React.useState([]);

  const [categoryName, setCategoryName] = React.useState("All");

  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  React.useEffect(() => {
    async function fetchData() {
      const pizzasResponse = await axios.get("https://62e2f40c3891dd9ba8f276a3.mockapi.io/pizzas");

      setLoading(false);

      setFetchedPizzas(pizzasResponse.data);
    }

    fetchData();
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

  const pizzas = fetchedPizzas.map((pizza) => (
    <Pizza key={pizza.id} onClickImage={onClickPizzaImage} {...pizza} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      {
        overlayOpened && (<Overlay
          onCloseOverlay={onClickCloseOverlay}
          pizza={selectedPizza} />)
      }
      <div className="wrapper">
        <Header onChangeSearchInput={onChangeSearchInput} />
        <div className="content">
          <div className="content__container">
            <div className="content__top">
              <Categories setCategoryName={setCategoryName} />
              <Sort />
            </div>
            <h2 className="content__title">
              {searchValue ? `Search for: ${searchValue}` : `${categoryName} pizzas`}
            </h2>
            <div className="content__items">
              {
                loading ? skeletons : pizzas
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
