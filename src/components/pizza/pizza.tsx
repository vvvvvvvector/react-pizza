import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItem } from '~/redux/cart/selectors';
import { addPizza } from '~/redux/cart/slice';
import { setOpened, setPizza } from '~/redux/overlay/slice';
import { Pizza as P } from '~/redux/fetch/types';

import { Counter } from '~/components/counter';

export const Pizza = (pizza: P) => {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const dispatch = useDispatch();

  const currentPizza = useSelector(
    selectCartItem(pizza, selectedType, selectedSize)
  );

  const amount = currentPizza ? currentPizza.amount : 0;

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
    <div data-container={'parent'}>
      <div className='pizza'>
        <img
          onClick={() => {
            dispatch(setPizza(pizza));
            dispatch(setOpened(true));

            document.body.style.overflow = 'hidden';
          }}
          alt='pizzaimg'
          src={pizza.imageURL}
        />
        <h4>{pizza.name}</h4>
        <div className='pizza__selector'>
          <ul>
            {pizza.types.map((type, index) => (
              <li
                key={index}
                onClick={() => setSelectedType(index)}
                className={index === selectedType ? 'active' : ''}
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
                className={index === selectedSize ? 'active' : ''}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza__bottom'>
          <h4>for {calculateCost()} $</h4>
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
            className='button'
          >
            <Plus size={19} strokeWidth={3.0} />
            <span>Add</span>
            {amount > 0 && <Counter amount={amount} />}
          </button>
        </div>
      </div>
    </div>
  );
};
