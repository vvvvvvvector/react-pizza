import React from 'react';
import axios from 'axios';

import { Overlay, Header, Categories, Sort, Pizza, Skeleton, Pagination } from './components';

import './scss/components/_all.scss';

function App() {
  const [fetchedPizzas, setFetchedPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryName, setCategoryName] = React.useState("All");
  const [searchValue, setSearchValue] = React.useState("");

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

  const renderContentItems = () => {
    const skeletons = [...new Array(4)].map((_, index) => (
      <Skeleton key={index} />
    ));

    const filteredPizzas = fetchedPizzas.filter((item) => (
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )).map((pizza) => (
      <Pizza key={pizza.id} onClickImage={onClickPizzaImage} {...pizza} />
    ));

    return loading ? skeletons : filteredPizzas;
  };

  return (
    <>
      {
        overlayOpened && (<Overlay
          onCloseOverlay={onClickCloseOverlay}
          pizza={selectedPizza} />)
      }
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="content__container">
            <div className="content__top">
              <Categories setCategoryName={setCategoryName} />
              <Sort />
            </div>
            <h2 className="content__title">
              {searchValue ? `Search for: ${searchValue}` : `${categoryName} pizzas`}
            </h2>
            <div className="content__items">{renderContentItems()}</div>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
