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
  const a = 10;

  var b = 1000;

  a = 'hello world';

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

  const items = renderContentItems();

  const itemsLength = items.length;

  const noItems = itemsLength === 0;

  return (
    <>
      {!noItems && (
        <div className='above-title'>
          <Categories />
          <Sort />
        </div>
      )}
      <h2>
        {searchValue
          ? !noItems
            ? `Search results for "${searchValue}":`
            : 'No results'
          : `${categoryName} pizzas`}
      </h2>
      {!noItems ? (
        <div className='pizzas'>{items}</div>
      ) : (
        <div className='no-pizzas'>
          <span>🤷‍♂️</span>
        </div>
      )}
      {!noItems && itemsLength >= 4 && (
        <Pagination
          pageIndex={currentPage}
          onChangePage={(page: number) => {
            dispatch(setCurrentPage(page));
          }}
        />
      )}
      <Overlay />
    </>
  );
};
