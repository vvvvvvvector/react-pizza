import React from 'react';

export function Pizza({ onClickImage, types, sizes, name, cost, imageURL }) {
    const [selectedType, setSelectedType] = React.useState(0);
    const [selectedSize, setSelectedSize] = React.useState(0);

    const pizzaObj = { cost, name, imageURL };

    return (
        <div className="pizza-component">
            <img onClick={() => onClickImage(pizzaObj)} className="pizza-component__image" alt="pizza-img" src={imageURL} />
            <h4 className="pizza-component__name">{name}</h4>
            <div className="pizza-component__selector">
                <ul>
                    {
                        types.map((type, index) => (
                            <li key={index} onClick={() => setSelectedType(index)} className={index === selectedType ? "active" : null}>{type}</li>
                        ))
                    }
                </ul>
                <ul>
                    {
                        sizes.map((size, index) => (
                            <li key={index} onClick={() => setSelectedSize(index)} className={index === selectedSize ? "active" : null}>{size}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="pizza-component__bottom">
                <h4 className="pizza-component__price">from {cost} $</h4>
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