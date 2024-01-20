import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Pizza, Search, ShoppingCart, XSquare } from 'lucide-react';
import debounce from 'lodash.debounce';

import { selectHome } from '~/redux/home/selectors';
import { selectCart } from '~/redux/cart/selectors';
import { setSearchValue } from '~/redux/home/slice';

export const Header = () => {
  const [inputValue, setInputValue] = useState('');

  const isFirstRender = useRef<boolean>(true);
  const searchReference = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { searchValue } = useSelector(selectHome);
  const { pizzas, orderTotal, amountTotal } = useSelector(selectCart);

  const waitUntilIStop = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 350),
    []
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      const json = JSON.stringify(pizzas);
      localStorage.setItem('cart', json);
    }
    isFirstRender.current = false;
  }, [pizzas]);

  return (
    <div className='header'>
      <div className='container'>
        <div className='container__left'>
          <div className='logo'>
            <Pizza size={40} />
            <div>
              <h1>react pizza</h1>
              <p>The best pizza in the universe</p>
            </div>
          </div>
          {pathname === '/' && (
            <div className='search'>
              <Search size={20} color='#bfbfbf' />
              <input
                ref={searchReference}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(event.target.value);
                  waitUntilIStop(event.target.value);
                }}
                value={inputValue}
                placeholder='Search pizza...'
              />
              {searchValue && (
                <XSquare
                  size={20}
                  color='#bfbfbf'
                  onClick={() => {
                    setInputValue('');
                    dispatch(setSearchValue(''));
                    searchReference.current?.focus();
                  }}
                />
              )}
            </div>
          )}
        </div>
        {pathname === '/' && (
          <div className='container__right'>
            <Link to='/cart'>
              <button className='button'>
                <span>{orderTotal} $</span>
                <div></div>
                <ShoppingCart size={20} color='#ffffff' />
                <span>{amountTotal}</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
