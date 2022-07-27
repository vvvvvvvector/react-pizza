import React from 'react';

import logoSVG from '../assets/images/store-logo.svg';
import cartSVG from '../assets/images/shopping-cart.svg';
import lensSVG from '../assets/images/search-lens.svg';

function Header() {
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
                <div className="header__search">
                    <img alt="search-lens" src={lensSVG} />
                    <input placeholder="Search pizza..." />
                </div>
                <div className="header__cart">
                    <div className="button button--cart">
                        <span>0 $</span>
                        <div></div>
                        <img alt="shopping-cart" src={cartSVG} />
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;