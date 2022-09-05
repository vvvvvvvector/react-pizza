import React from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../redux/store';
import { setCurrentPage } from '../redux/slices/homeSlice';
import { fetchHomePizzas } from '../redux/slices/fetchSlice';

import { Overlay, Categories, Sort, Pizza, Skeleton, Pagination } from '../components';

const sortParameters = ["popularity", "popularity", "cost", "cost", "name", "name"];

type RequestParametersTypes = {
    currentPage: number,
    categoryIndex: number,
    sortParameterName: string,
    sortParameterIndex: number
};

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
        categoryIndex,
        sortParameterIndex,
        categoryName,
        currentPage,
        searchValue
    } = useSelector((state: RootState) => state.home);

    React.useEffect(() => {
        const request: RequestParametersTypes = {
            currentPage: currentPage,
            categoryIndex: categoryIndex,
            sortParameterName: sortParameters[sortParameterIndex],
            sortParameterIndex: sortParameterIndex
        };

        dispatch(fetchHomePizzas(request));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryIndex, sortParameterIndex, currentPage]);

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

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <>
            {opened && <Overlay />}
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">
                {searchValue ? `Search for: ${searchValue}` : `${categoryName} pizzas`}
            </h2>
            <div className="content__items">
                {renderContentItems()}
            </div>
            <Pagination pageIndex={currentPage} onChangePage={onChangePage} />
        </>
    );
}