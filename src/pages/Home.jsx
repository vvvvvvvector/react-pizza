import React from 'react';
import axios from 'axios';

import { Overlay, Categories, Sort, Pizza, Skeleton, Pagination } from '../components/';

export const Home = ({ searchValue }) => {
    const [loading, setLoading] = React.useState(true);
    const [fetchedPizzas, setFetchedPizzas] = React.useState([]);

    // category component
    const [categoryName, setCategoryName] = React.useState("All");
    const [selectedCategory, setSelectedCategory] = React.useState(0);

    // sort component
    const [selectedSortParameter, setSelectedSortParameter] = React.useState(0);

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
                overlayOpened && (
                    <Overlay
                        onCloseOverlay={onClickCloseOverlay} pizza={selectedPizza} />
                )
            }
            <div className="content__top">
                <Categories
                    selectedCategoryIndex={selectedCategory}
                    setCategory={(index) => setSelectedCategory(index)}
                    setCategoryName={(name) => setCategoryName(name)} />
                <Sort
                    selectedSortParameterIndex={selectedSortParameter}
                    setSortParameter={(index) => setSelectedSortParameter(index)} />
            </div>
            <h2 className="content__title">
                {searchValue ? `Search for: ${searchValue}` : `${categoryName} pizzas`}
            </h2>
            <div className="content__items">{renderContentItems()}</div>
            <Pagination />
        </>
    );
}