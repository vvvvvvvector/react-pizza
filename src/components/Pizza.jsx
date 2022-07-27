import React from 'react';

export function Pizza({ onImage, pizzaCost, pizzaName, pizzaImageURL }) {
    return (
        <div className="pizza-component">
            <img onClick={() => onImage(pizzaImageURL)} className="pizza-component__image" alt="pizza-img" src={pizzaImageURL} />
            <h4 className="pizza-component__name">{pizzaName}</h4>
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
                <h4 className="pizza-component__price">from {pizzaCost} $</h4>
                <button className="button button--default">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E" />
                    </svg>
                    <span>Add</span>
                </button>
            </div>
        </div>
    );
}