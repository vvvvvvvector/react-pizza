import React from 'react';

import logoSVG from './assets/images/store-logo.svg';
import './scss/components/_header.scss';

import cartSVG from './assets/images/shopping-cart.svg';
import lensSVG from './assets/images/search-lens.svg';
import './scss/components/_button.scss';

import './scss/components/_categories.scss';

import './scss/components/_sort.scss';
import arrowSVG from './assets/images/categories-arrow.svg';

import './scss/components/_pizza.scss';

import './scss/components/_pagination.scss';

function App() {
  const [showPopup, setShowPopup] = React.useState(false);

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
                <span onClick={() => setShowPopup(!showPopup)}>popularity ↑</span>
              </div>
              {showPopup ? <div className="sort__popup">
                <ul>
                  <li className="active">popularity ↑</li>
                  <li>popularity ↓</li>
                  <li>cost ↑</li>
                  <li>cost ↓</li>
                  <li>alphabet ↑</li>
                  <li>alphabet ↓</li>
                </ul>
              </div> : null}
            </div>
          </div>
          <h2 className="content__title">
            All pizzas
          </h2>
          <div className="content__items">
            <div className="pizza-component">
              <img className="pizza-component__image" alt="pizza-img" src="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg" />
              <h4 className="pizza-component__name">Margherita</h4>
              <div className="pizza-component__selector">
                <ul>
                  <li className="active">thin</li>
                  <li>traditional</li>
                </ul>
                <ul>
                  <li className="active">25 cm.</li>
                  <li>30 cm.</li>
                  <li>35 cm.</li>
                </ul>
              </div>
              <div className="pizza-component__bottom">
                <h4 className="pizza-component__price">from 7 $</h4>
                <button className="button button--default">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E" />
                  </svg>
                  <span>Add</span>
                </button>
              </div>
            </div>
            <div className="pizza-component">
              <img className="pizza-component__image" alt="pizza-img" src="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg" />
              <h4 className="pizza-component__name">Four Seasons</h4>
              <div className="pizza-component__selector">
                <ul>
                  <li className="active">thin</li>
                  <li>traditional</li>
                </ul>
                <ul>
                  <li className="active">25 cm.</li>
                  <li>30 cm.</li>
                  <li>35 cm.</li>
                </ul>
              </div>
              <div className="pizza-component__bottom">
                <h4 className="pizza-component__price">from 9 $</h4>
                <button className="button button--default">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E" />
                  </svg>
                  <span>Add</span>
                </button>
              </div>
            </div>
            <div className="pizza-component">
              <img className="pizza-component__image" alt="pizza-img" src="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg" />
              <h4 className="pizza-component__name">Pepperoni</h4>
              <div className="pizza-component__selector">
                <ul>
                  <li className="active">thin</li>
                  <li>traditional</li>
                </ul>
                <ul>
                  <li className="active">25 cm.</li>
                  <li>30 cm.</li>
                  <li>35 cm.</li>
                </ul>
              </div>
              <div className="pizza-component__bottom">
                <h4 className="pizza-component__price">from 8 $</h4>
                <button className="button button--default">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E" />
                  </svg>
                  <span>Add</span>
                </button>
              </div>
            </div>
            <div className="pizza-component">
              <img className="pizza-component__image" alt="pizza-img" src="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg" />
              <h4 className="pizza-component__name">Cheeseburger-pizza</h4>
              <div className="pizza-component__selector">
                <ul>
                  <li className="active">thin</li>
                  <li>traditional</li>
                </ul>
                <ul>
                  <li className="active">25 cm.</li>
                  <li>30 cm.</li>
                  <li>35 cm.</li>
                </ul>
              </div>
              <div className="pizza-component__bottom">
                <h4 className="pizza-component__price">from 10 $</h4>
                <button className="button button--default">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E" />
                  </svg>
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pagination">
            <ul>
              <li><a>←</a></li>
              <li><a className="active">1</a></li>
              <li><a>2</a></li>
              <li><a>3</a></li>
              <li><a>→</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
