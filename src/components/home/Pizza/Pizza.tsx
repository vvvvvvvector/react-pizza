import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItem } from '../../../redux/cart/selectors';
import { addPizza } from '../../../redux/cart/slice';
import { setOpened, setPizza } from '../../../redux/overlay/slice';
import { PizzaType } from '../../../redux/fetch/types';
import { CartItemType } from '../../../redux/cart/types';

export const Pizza: React.FC<PizzaType> = (pizza) => {
    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = React.useState<number>(0);
    const [selectedSize, setSelectedSize] = React.useState<number>(0);

    const currentPizza = useSelector(selectCartItem(pizza, selectedType, selectedSize));
    const amount = currentPizza ? currentPizza.amount : 0;

    const onClickAdd = () => {
        const cartItem: CartItemType = {
            name: pizza.name,
            type: pizza.types[selectedType],
            diameter: pizza.diameters[selectedSize],
            cost: calculateCost(),
            amount: 1,
            imageURL: pizza.imageURL
        }

        dispatch(addPizza(cartItem));
    };

    const onClickImage = () => {
        dispatch(setPizza(pizza));
        dispatch(setOpened(true));
        document.body.style.overflow = 'hidden';
    };

    const calculateCost = () => {
        if (pizza.sizes.length === 2) {
            if (selectedSize === 0) {
                return pizza.cost;
            } else if (selectedSize === 1) {
                return pizza.cost * 1.5;
            }
        }

        if (selectedSize === 0) {
            return pizza.cost;
        } else if (selectedSize === 1) {
            return pizza.cost * 1.5;
        }

        return pizza.cost * 2;
    };

    return (
        <div className="pizza-component-parent">
            <div className="pizza-component">
                <img onClick={onClickImage} className="pizza-component__image" alt="pizza-img" src={pizza.imageURL} />
                <h4 className="pizza-component__name">{pizza.name}</h4>
                <div className="pizza-component__selector">
                    <ul>
                        {
                            pizza.types.map((type, index) => (
                                <li key={index} onClick={() => setSelectedType(index)} className={index === selectedType ? "active" : ""}>{type}</li>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                            pizza.sizes.map((size, index) => (
                                <li key={index} onClick={() => setSelectedSize(index)} className={index === selectedSize ? "active" : ""}>{size}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="pizza-component__bottom">
                    <h4 className="pizza-component__price">from {calculateCost()} $</h4>
                    <button onClick={onClickAdd} className="button button--default">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E" />
                        </svg>
                        <span>Add {amount > 0 ? amount : ""}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};