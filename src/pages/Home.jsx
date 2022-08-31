import React from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage } from '../redux/slices/homeSlice';

import { Overlay, Categories, Sort, Pizza, Skeleton, Pagination } from '../components/';

const sortParameters = ["popularity", "popularity", "cost", "cost", "name", "name"];

export const Home = () => {
    const dispatch = useDispatch();

    const searchValue = useSelector((state) => state.home.searchValue);

    const [loading, setLoading] = React.useState(true);
    const [fetchedPizzas, setFetchedPizzas] = React.useState([]);

    // pagination component
    const currentPage = useSelector((state) => state.home.currentPage);
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    // category component
    const { selectedCategoryIndex, selectedCategoryName } = useSelector((state) => state.home);

    // sort component
    const selectedSortParameter = useSelector((state) => state.home.selectedSortParameterIndex);

    React.useEffect(() => {
        setLoading(true);

        axios.get(`https://62e2f40c3891dd9ba8f276a3.mockapi.io/pizzas?page=${currentPage}&limit=4&categories=${selectedCategoryIndex}&sortBy=${sortParameters[selectedSortParameter]}&order=${selectedSortParameter % 2 === 0 ? "asc" : "desc"}`)
            .then((response) => {
                setFetchedPizzas(response.data);
                setLoading(false);
            });
    }, [selectedCategoryIndex, selectedSortParameter, currentPage]);

    // --------overlay--------
    const [overlayOpened, setOverlayOpened] = React.useState(false);
    const [selectedPizza, setSelectedPizza] = React.useState(null);

    const onClickPizzaImage = (pizzaObj) => {
        setOverlayOpened(true);
        document.body.style.overflow = 'hidden';
        setSelectedPizza(pizzaObj);
    };
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
                        pizza={selectedPizza}
                        onCloseOverlay={() => { setOverlayOpened(false); document.body.style.overflow = 'visible'; }} />
                )
            }
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">
                {searchValue ? `Search for: ${searchValue}` : `${selectedCategoryName} pizzas`}
            </h2>
            <div className="content__items">
                {
                    renderContentItems()
                }
            </div>
            <Pagination
                selectedPageIndex={currentPage}
                onChangePage={onChangePage} />
        </>
    );
}