import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSearchValue } from '../redux/slices/homeSlice';

import logoSVG from '../assets/images/store-logo.svg';
import cartSVG from '../assets/images/shopping-cart.svg';
import lensSVG from '../assets/images/search-lens.svg';

export const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const searchValue = useSelector((state) => state.home.searchValue);
    const { orderTotal, amountTotal } = useSelector((state) => state.cart);

    const searchReference = React.useRef(null);

    const onClickSearchClear = () => {
        dispatch(setSearchValue(""));
        searchReference.current.focus();
    }

    return (
        <div className="header">
            <div className="container">
                <div className="header__logo">
                    <img width={39} alt="store-logo" src={logoSVG} />
                    <div>
                        <h1>react pizza</h1>
                        <p>The best pizza in the universe</p>
                    </div>
                </div>
                {
                    location.pathname !== '/cart' &&
                    <div className="header__search">
                        <img alt="search-lens" src={lensSVG} />
                        <input ref={searchReference} onChange={(event) => dispatch(setSearchValue(event.target.value))} value={searchValue} placeholder="Search pizza..." />
                        {
                            searchValue &&
                            <svg onClick={() => dispatch(onClickSearchClear)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.7" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB" />
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5" />
                            </svg>
                        }
                    </div>
                }
                {
                    location.pathname !== '/cart' &&
                    <Link to="/cart">
                        <div className="header__cart">
                            <div className="button button--cart">
                                <span>{orderTotal} $</span>
                                <div></div>
                                <img alt="shopping-cart" src={cartSVG} />
                                <span>{amountTotal}</span>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        </div>
    );
}