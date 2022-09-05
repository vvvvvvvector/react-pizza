import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPage } from '../redux/slices/homeSlice';
import { fetchHomePizzas } from '../redux/slices/fetchSlice';

import { Overlay, Categories, Sort, Pizza, Skeleton, Pagination } from '../components';
import { RootState } from '../redux/store';

import { useAppDispatch } from '../redux/store';

const sortParameters = ["popularity", "popularity", "cost", "cost", "name", "name"];

type PizzaType = {
    id: string,
    types: string[],
    diameter: number[],
    description: string,
    name: string,
    weight: number[],
    cost: number,
    imageURL: string,
    sizes: string[]
};

type FetchType = {
    currentPage: number,
    categoryIndex: number,
    sortParameterName: string,
    sortParameterIndex: number
}

export const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        opened
    } = useSelector((state: RootState) => state.overlay);

    const {
        status,
        homePizzas
    } = useSelector((state: RootState) => state.fetch);

    const {
        selectedCategoryIndex,
        selectedCategoryName,
        selectedSortParameterIndex,
        currentPage,
        searchValue
    } = useSelector((state: RootState) => state.home);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    React.useEffect(() => {
        const request: FetchType = {
            currentPage: currentPage,
            categoryIndex: selectedCategoryIndex,
            sortParameterName: sortParameters[selectedSortParameterIndex],
            sortParameterIndex: selectedSortParameterIndex
        };

        dispatch(fetchHomePizzas(request));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIndex, selectedSortParameterIndex, currentPage]);

    const renderContentItems = () => {
        const skeletons = [...new Array(4)].map((_, index) => (
            <Skeleton key={index} />
        ));

        const filteredPizzas = homePizzas.filter((item: PizzaType) => (
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )).map((pizza: PizzaType) => (
            <Pizza key={pizza.id} {...pizza} />
        ));

        return status === "pending" ? skeletons : filteredPizzas;
    };

    return (
        <>
            {opened && <Overlay />}
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">
                {searchValue ? `Search for: ${searchValue}` : `${selectedCategoryName} pizzas`}
            </h2>
            <div className="content__items">
                {renderContentItems()}
            </div>
            <Pagination selectedPageIndex={currentPage} onChangePage={onChangePage} />
        </>
    );
}