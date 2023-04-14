import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';

import { selectFetch } from '../redux/fetch/selectors';
import { selectHome } from '../redux/home/selectors';
import { selectOpened } from '../redux/overlay/selectors';
import { setCurrentPage } from '../redux/home/slice';
import { fetchHomePizzas } from '../redux/fetch/slice';
import { RequestParametersTypes } from '../redux/fetch/types';

import {
  Overlay,
  Categories,
  Sort,
  Pizza,
  Skeleton,
  Pagination,
} from '../components';

const sortParameters: string[] = [
  'popularity',
  'popularity',
  'cost',
  'cost',
  'name',
  'name',
];

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const opened = useSelector(selectOpened);

  const { status, homePizzas } = useSelector(selectFetch);

  const {
    categoryIndex,
    sortParameterIndex,
    categoryName,
    currentPage,
    searchValue,
  } = useSelector(selectHome);

  React.useEffect(() => {
    const request: RequestParametersTypes = {
      currentPage: currentPage,
      categoryIndex: categoryIndex,
      sortParameterName: sortParameters[sortParameterIndex],
      sortParameterIndex: sortParameterIndex,
    };

    dispatch(fetchHomePizzas(request));

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIndex, sortParameterIndex, currentPage]);

  const renderContentItems = () => {
    const skeletons = [...new Array(4)].map((_, index) => (
      <Skeleton key={index} />
    ));

    const filteredPizzas = homePizzas
      .filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((pizza) => <Pizza key={pizza.id} {...pizza} />);

    return status === 'pending' ? skeletons : filteredPizzas;
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      {opened && <Overlay />}
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>
        {searchValue
          ? `All search results for "${searchValue}"`
          : `${categoryName} pizzas`}
      </h2>
      <div className='content__items'>{renderContentItems()}</div>
      <Pagination pageIndex={currentPage} onChangePage={onChangePage} />
    </>
  );
};
