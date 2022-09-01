import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPizza } from '../redux/slices/cartSlice';

const pizzaImageSizes = [300, 370, 410];

export const Overlay = ({ pizza, onCloseOverlay }) => {
    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = React.useState(0);
    const [selectedSize, setSelectedSize] = React.useState(0);

    const currentPizza = useSelector((state) => state.cart.pizzas.find((obj) => obj.name === pizza.name && obj.type === pizza.types[selectedType] && obj.diameter === pizza.diameter[selectedSize]));
    const amount = currentPizza ? currentPizza.amount : 0;

    const wrapperRef = React.useRef(null);
    const isFirstRender = React.useRef(false); // because overlay immediately closed when i clicked on the pizza

    // clickOutsideWrapper is working only when overlay component is on page(mounted?)
    React.useEffect(() => {
        const clickOutsideWrapper = (event) => {
            if (isFirstRender.current) {
                if (!event.composedPath().includes(wrapperRef.current)) {
                    onCloseOverlay();
                }
            }
            isFirstRender.current = true;
        };

        document.body.addEventListener("click", clickOutsideWrapper); // add event listener on first render

        return () => document.body.removeEventListener("click", clickOutsideWrapper); // delete event listener(unmount)
    }, []);

    const onClickAdd = () => {
        dispatch(addPizza({
            id: pizza.id,
            type: pizza.types[selectedType],
            diameter: pizza.diameter[selectedSize],
            name: pizza.name,
            amount: 1,
            cost: pizza.cost,
            imageURL: pizza.imageURL
        }));
    };

    return (
        <div className="overlay">
            <div ref={wrapperRef} className="pizza-details-wrapper">
                <div className="pizza-details-wrapper__leftpart">
                    <img width={pizzaImageSizes[selectedSize]} height={pizzaImageSizes[selectedSize]} alt="pizza" src={pizza.imageURL} />
                </div>
                <div className="pizza-details-wrapper__rightpart">
                    <h2>{pizza.name}</h2>
                    <span className="characteristics">
                        {
                            `${pizza.diameter[selectedSize]} cm, ${pizza.types[selectedType].toLowerCase()} dough, ${pizza.weight[selectedSize]} g`
                        }
                    </span>
                    <div className="description">
                        <span>
                            {pizza.description}
                        </span>
                    </div>
                    <div className="selector">
                        <ul>
                            {
                                pizza.types.map((type, index) => (
                                    <li key={index} onClick={() => setSelectedType(index)} className={selectedType === index ? "active" : ""}>{type}</li>
                                ))
                            }
                        </ul>
                        <ul>
                            {
                                pizza.sizes.map((size, index) => (
                                    <li key={index} onClick={() => setSelectedSize(index)} className={selectedSize === index ? "active" : ""}>{size}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="bottom">
                        <div onClick={onClickAdd} className="button button-make-order">
                            <span>Add to cart for {pizza.cost} $ {amount ? `Already in cart: ${amount}` : ""}</span>
                        </div>
                    </div>
                </div>
                <svg onClick={onCloseOverlay} width="35" height="35" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.315 0C4.62737 0 0 4.62737 0 10.315C0 16.0026 4.62737 20.63 10.315 20.63C16.0026 20.63 20.63 16.0026 20.63 10.315C20.63 4.62737 16.0026 0 10.315 0ZM14.0497 12.928C14.1265 13.0009 14.1879 13.0885 14.2303 13.1855C14.2727 13.2826 14.2952 13.3872 14.2966 13.4931C14.298 13.599 14.2781 13.7041 14.2382 13.8022C14.1983 13.9003 14.1392 13.9894 14.0643 14.0643C13.9894 14.1392 13.9003 14.1983 13.8022 14.2382C13.7041 14.2781 13.599 14.298 13.4931 14.2966C13.3872 14.2952 13.2826 14.2727 13.1855 14.2303C13.0885 14.1879 13.0009 14.1265 12.928 14.0497L10.315 11.4373L7.70203 14.0497C7.55202 14.1922 7.35226 14.2705 7.14536 14.2679C6.93846 14.2652 6.74077 14.1819 6.59446 14.0355C6.44814 13.8892 6.36477 13.6915 6.36212 13.4846C6.35947 13.2777 6.43775 13.078 6.58028 12.928L9.19275 10.315L6.58028 7.70203C6.43775 7.55202 6.35947 7.35226 6.36212 7.14536C6.36477 6.93846 6.44814 6.74077 6.59446 6.59446C6.74077 6.44814 6.93846 6.36477 7.14536 6.36212C7.35226 6.35947 7.55202 6.43775 7.70203 6.58028L10.315 9.19275L12.928 6.58028C13.078 6.43775 13.2777 6.35947 13.4846 6.36212C13.6915 6.36477 13.8892 6.44814 14.0355 6.59446C14.1819 6.74077 14.2652 6.93846 14.2679 7.14536C14.2705 7.35226 14.1922 7.55202 14.0497 7.70203L11.4373 10.315L14.0497 12.928Z" fill="#888787" />
                </svg>
            </div>
        </div>
    );
}