import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage } from '../redux/slices/homeSlice';
import { fetchHomePizzas } from '../redux/slices/fetchSlice';

import { Overlay, Categories, Sort, Pizza, Skeleton, Pagination } from '../components/';

const sortParameters = ["popularity", "popularity", "cost", "cost", "name", "name"];

export const Home = () => {
    const dispatch = useDispatch();

    const {
        opened
    } = useSelector((state) => state.overlay);

    const {
        status,
        homePizzas
    } = useSelector((state) => state.fetch);

    const {
        selectedCategoryIndex,
        selectedCategoryName,
        selectedSortParameterIndex,
        currentPage,
        searchValue
    } = useSelector((state) => state.home);

    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    React.useEffect(() => {
        dispatch(fetchHomePizzas({
            currentPage: currentPage,
            categoryIndex: selectedCategoryIndex,
            sortParameterName: sortParameters[selectedSortParameterIndex],
            sortParameterIndex: selectedSortParameterIndex
        }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIndex, selectedSortParameterIndex, currentPage]);

    const renderContentItems = () => {
        const skeletons = [...new Array(4)].map((_, index) => (
            <Skeleton key={index} />
        ));

        const filteredPizzas = homePizzas.filter((item) => (
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )).map((pizza) => (
            <Pizza key={pizza.id} {...pizza} />
        ));

        return status === "pending" ? skeletons : filteredPizzas;
    };

    return (
        <>
            {
                opened && <Overlay />
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