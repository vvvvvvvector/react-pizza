import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPizza, selectOpened } from '~/redux/overlay/selectors';
import { selectCartItem } from '~/redux/cart/selectors';
import { addPizza } from '~/redux/cart/slice';
import { setOpened } from '~/redux/overlay/slice';
import { type Pizza } from '~/redux/fetch/types';

import { Counter } from '~/components/counter';

const pizzaImageSizes = [250, 300, 350] as const;

export const Overlay = () => {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const dispatch = useDispatch();

  const opened = useSelector(selectOpened);

  const pizza = useSelector(selectPizza);

  function onClose() {
    dispatch(setOpened(false));

    document.body.style.overflow = 'visible';
  }

  const details = (
    <PizzaDetails
      pizza={pizza}
      selectedType={selectedType}
      setSelectedSize={setSelectedSize}
      selectedSize={selectedSize}
      setSelectedType={setSelectedType}
    />
  );

  return (
    <div className={`overlay ${opened ? 'opened' : 'closed'}`}>
      <div className='pizza-details-mobile-wrapper'>
        <div className='pizza-details-mobile-wrapper__top'>
          <img
            width={pizzaImageSizes[0]}
            height={pizzaImageSizes[0]}
            src={pizza.imageURL}
            alt='pizza'
          />
          <svg
            onClick={onClose}
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.74791 6.95572L6.49931 4.70712L8.74791 2.45852C9.16184 2.04459 9.16184 1.37338 8.74791 0.959454C8.33398 0.545525 7.66277 0.545525 7.24884 0.959454L5.00024 3.20805L2.75164 0.959454C2.33771 0.545525 1.66651 0.545525 1.25258 0.959454C0.838648 1.37338 0.838648 2.04459 1.25258 2.45852L3.50118 4.70712L1.25258 6.95572C0.838649 7.36965 0.838649 8.04086 1.25258 8.45479C1.66651 8.86872 2.33772 8.86872 2.75164 8.45479L5.00024 6.20619L7.24884 8.45479C7.66277 8.86872 8.33398 8.86872 8.74791 8.45479C9.16184 8.04086 9.16184 7.36965 8.74791 6.95572Z'
              fill='#D0D0D0'
            />
          </svg>
        </div>
        <div className='pizza-details-mobile-wrapper__bottom'>{details}</div>
      </div>
      <div className='pizza-details-desktop-wrapper'>
        <div className='pizza-details-desktop-wrapper__leftpart'>
          <img
            width={pizzaImageSizes[selectedSize]}
            height={pizzaImageSizes[selectedSize]}
            alt='pizza'
            src={pizza.imageURL}
          />
        </div>
        <div className='pizza-details-desktop-wrapper__rightpart'>
          {details}
        </div>
        <svg
          onClick={onClose}
          width='35'
          height='35'
          viewBox='0 0 21 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.315 0C4.62737 0 0 4.62737 0 10.315C0 16.0026 4.62737 20.63 10.315 20.63C16.0026 20.63 20.63 16.0026 20.63 10.315C20.63 4.62737 16.0026 0 10.315 0ZM14.0497 12.928C14.1265 13.0009 14.1879 13.0885 14.2303 13.1855C14.2727 13.2826 14.2952 13.3872 14.2966 13.4931C14.298 13.599 14.2781 13.7041 14.2382 13.8022C14.1983 13.9003 14.1392 13.9894 14.0643 14.0643C13.9894 14.1392 13.9003 14.1983 13.8022 14.2382C13.7041 14.2781 13.599 14.298 13.4931 14.2966C13.3872 14.2952 13.2826 14.2727 13.1855 14.2303C13.0885 14.1879 13.0009 14.1265 12.928 14.0497L10.315 11.4373L7.70203 14.0497C7.55202 14.1922 7.35226 14.2705 7.14536 14.2679C6.93846 14.2652 6.74077 14.1819 6.59446 14.0355C6.44814 13.8892 6.36477 13.6915 6.36212 13.4846C6.35947 13.2777 6.43775 13.078 6.58028 12.928L9.19275 10.315L6.58028 7.70203C6.43775 7.55202 6.35947 7.35226 6.36212 7.14536C6.36477 6.93846 6.44814 6.74077 6.59446 6.59446C6.74077 6.44814 6.93846 6.36477 7.14536 6.36212C7.35226 6.35947 7.55202 6.43775 7.70203 6.58028L10.315 9.19275L12.928 6.58028C13.078 6.43775 13.2777 6.35947 13.4846 6.36212C13.6915 6.36477 13.8892 6.44814 14.0355 6.59446C14.1819 6.74077 14.2652 6.93846 14.2679 7.14536C14.2705 7.35226 14.1922 7.55202 14.0497 7.70203L11.4373 10.315L14.0497 12.928Z'
            fill='#888787'
          />
        </svg>
      </div>
    </div>
  );
};

const PizzaDetails = ({
  pizza,
  selectedType,
  setSelectedType,
  selectedSize,
  setSelectedSize
}: {
  pizza: Pizza;
  selectedType: number;
  setSelectedType: React.Dispatch<React.SetStateAction<number>>;
  selectedSize: number;
  setSelectedSize: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();

  const currentPizza = useSelector(
    selectCartItem(pizza, selectedType, selectedSize)
  );

  const amount = currentPizza ? currentPizza.amount : 0;

  function calculateCost() {
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
  }

  return (
    <>
      <h2>{pizza.name}</h2>
      <span className='characteristics'>
        {`${pizza.diameters[selectedSize]} cm, ${pizza.types[
          selectedType
        ]?.toLowerCase()} dough, ${pizza.weights[selectedSize]} g`}
      </span>
      <div className='description'>
        <span>{pizza.description}</span>
      </div>
      <div className='selector'>
        <ul>
          {pizza.types.map((type, index) => (
            <li
              key={index}
              onClick={() => setSelectedType(index)}
              className={selectedType === index ? 'selected' : ''}
            >
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {pizza.sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setSelectedSize(index)}
              className={selectedSize === index ? 'selected' : ''}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <button
        disabled={amount >= 99}
        onClick={() => {
          dispatch(
            addPizza({
              name: pizza.name,
              type: pizza.types[selectedType],
              diameter: pizza.diameters[selectedSize],
              cost: calculateCost(),
              amount: 1,
              imageURL: pizza.imageURL
            })
          );
        }}
        className='button button-order-overlay push'
      >
        <span>Add to cart for {calculateCost()} $</span>
        {amount > 0 && (
          <Counter counterStyle={'counter__overlay'} amount={amount} />
        )}
      </button>
    </>
  );
};
