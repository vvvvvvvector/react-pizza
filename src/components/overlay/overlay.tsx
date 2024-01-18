import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XCircle, XSquare } from 'lucide-react';

import { selectPizza, selectOpened } from '~/redux/overlay/selectors';
import { selectCartItem } from '~/redux/cart/selectors';
import { addPizza } from '~/redux/cart/slice';
import { setOpened } from '~/redux/overlay/slice';

import { Counter } from '~/components/counter';

const pizzaImageSizes = [250, 300, 350] as const;

export const Overlay = () => {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const desktopWrapperRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const opened = useSelector(selectOpened);
  const pizza = useSelector(selectPizza);
  const currentPizza = useSelector(
    selectCartItem(pizza, selectedType, selectedSize)
  );

  const amount = currentPizza ? currentPizza.amount : 0;

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        desktopWrapperRef.current &&
        !e.composedPath().includes(desktopWrapperRef.current) &&
        mobileWrapperRef.current &&
        !e.composedPath().includes(mobileWrapperRef.current)
      ) {
        onClose();
      }
    };

    overlayRef.current?.addEventListener('click', onClickOutside);

    return () =>
      overlayRef.current?.removeEventListener('click', onClickOutside);
  }, []);

  function onClose() {
    dispatch(setOpened(false));

    document.body.style.overflow = 'visible';
  }

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

  const Details = () => (
    <>
      <h4>{pizza.name}</h4>
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
        className='button push'
      >
        <span>Add to cart for {calculateCost()} $</span>
        {amount > 0 && <Counter amount={amount} />}
      </button>
    </>
  );

  return (
    <div ref={overlayRef} className={`overlay ${opened ? 'opened' : ''}`}>
      <div
        ref={mobileWrapperRef}
        className={`pizza-details-mobile-wrapper ${opened ? 'slide-in' : ''}`}
      >
        <div className='pizza-details-mobile-wrapper__top'>
          <img
            width={pizzaImageSizes[0]}
            height={pizzaImageSizes[0]}
            src={pizza.imageURL}
            alt='pizza'
          />
          <XSquare size={27} color={'hsl(0, 0%, 60%)'} onClick={onClose} />
        </div>
        <div className='pizza-details-mobile-wrapper__bottom'>
          <Details />
        </div>
      </div>
      <div
        ref={desktopWrapperRef}
        className={`pizza-details-desktop-wrapper ${opened ? 'scale-in' : ''}`}
      >
        <div className='pizza-details-desktop-wrapper__leftpart'>
          <img
            width={pizzaImageSizes[selectedSize]}
            height={pizzaImageSizes[selectedSize]}
            alt='pizza'
            src={pizza.imageURL}
          />
        </div>
        <div className='pizza-details-desktop-wrapper__rightpart'>
          <Details />
        </div>
        <XCircle size={35} color={'#ffffff'} onClick={onClose} />
      </div>
    </div>
  );
};