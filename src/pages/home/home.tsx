import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '~/redux/store';

import { selectFetch } from '~/redux/fetch/selectors';
import { selectHome } from '~/redux/home/selectors';
import { setCurrentPage } from '~/redux/home/slice';
import { fetchHomePizzas } from '~/redux/fetch/slice';

import { Overlay } from '~/components/overlay/overlay';
import { Categories } from '~/components/categories/categories';
import { Sort } from '~/components/sort/sort';
import { Pizza } from '~/components/pizza/pizza';
import { Skeleton } from '~/components/skeleton';
import { Pagination } from '~/components/pagination/pagination';

const sortParameters = [
  'popularity',
  'popularity',
  'cost',
  'cost',
  'name',
  'name'
] as const;

export const Home = () => {
  const dispatch = useAppDispatch();

  const { status, homePizzas } = useSelector(selectFetch);

  const {
    categoryIndex,
    sortParameterIndex,
    categoryName,
    currentPage,
    searchValue
  } = useSelector(selectHome);

  useEffect(() => {
    dispatch(
      fetchHomePizzas({
        currentPage: currentPage,
        categoryIndex: categoryIndex,
        sortParameterName: sortParameters[sortParameterIndex],
        sortParameterIndex: sortParameterIndex
      })
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
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

  return (
    <>
      <div className='above-title'>
        <Categories />
        <Sort />
      </div>
      <h2>
        {searchValue
          ? `All search results for "${searchValue}"`
          : `${categoryName} pizzas`}
      </h2>
      <div className='pizzas'>{renderContentItems()}</div>
      <Pagination
        pageIndex={currentPage}
        onChangePage={(page: number) => {
          dispatch(setCurrentPage(page));
        }}
      />
      <Overlay />
    </>
  );
};
