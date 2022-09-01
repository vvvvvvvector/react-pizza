import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slices/homeSlice';
import { fetchHomePizzas } from '../redux/slices/fetchSlice';

import { Overlay, Categories, Sort, Pizza, Skeleton, Pagination } from '../components/';

const sortParameters = ["popularity", "popularity", "cost", "cost", "name", "name"];

export const Home = () => {
    const dispatch = useDispatch();

    const searchValue = useSelector((state) => state.home.searchValue);
    const { homePizzas, status } = useSelector((state) => state.fetch);

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
        dispatch(fetchHomePizzas({
            currentPage: currentPage,
            categoryIndex: selectedCategoryIndex,
            sortParameterName: sortParameters[selectedSortParameter],
            sortParameterIndex: selectedSortParameter
        }));
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

        const filteredPizzas = homePizzas.filter((item) => (
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )).map((pizza) => (
            <Pizza key={pizza.id} onClickImage={onClickPizzaImage} {...pizza} />
        ));

        return status === "loading" ? skeletons : filteredPizzas;
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