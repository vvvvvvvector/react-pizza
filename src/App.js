import logoSVG from './assets/images/store-logo.svg';
import './scss/components/_header.scss';

import cartSVG from './assets/images/shopping-cart.svg';
import lensSVG from './assets/images/search-lens.svg';
import './scss/components/_button.scss';

import './scss/components/_categories.scss';

import './scss/components/_sort.scss';
import arrowSVG from './assets/images/categories-arrow.svg';

function Content() {
  return (<h1>hello world!</h1>);
}

function App() {
  return (
    <div className="wrapper">
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
              <span>20 $</span>
              <div></div>
              <img alt="shopping-cart" src={cartSVG} />
              <span>2</span>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content__container">
          <div className="content__top">
            <div className="categories">
              <ul>
                <li className="active">All</li>
                <li>Meat</li>
                <li>Vegetarian</li>
                <li>Grill</li>
                <li>Spicy</li>
                <li>Closed</li>
              </ul>
            </div>
            <div className="sort">
              <div className="sort__label">
                <img alt="arrow" src={arrowSVG} />
                <b>Sort by: </b>
                <span>popularity (DESC)</span>
              </div>
              <div className="sort__popup">

              </div>
            </div>
          </div>
          <h2 className="content__title">
            All pizzas
          </h2>
          <div className="content__items">

          </div>
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
