import { Minus, Plus, X } from 'lucide-react';
import { useDispatch } from 'react-redux';

import {
  incrementAmount,
  decrementAmount,
  removePizza
} from '~/redux/cart/slice';
import type { CartItem as CI, UniquePizza } from '~/redux/cart/types';

const Image = ({ imageURL }: Pick<CI, 'imageURL'>) => (
  <img src={imageURL} alt='pizzaImg' />
);

const Info = ({
  type,
  diameter,
  name
}: Pick<CI, 'type' | 'diameter' | 'name'>) => (
  <div className='info hide-scrollbars'>
    <h3 className='hide-scrollbars'>{name}</h3>
    <p className='hide-scrollbars'>
      {type} dough, {diameter} cm
    </p>
  </div>
);

const Cost = ({ cost, amount }: Pick<CI, 'cost' | 'amount'>) => (
  <div className='cost'>
    <b>{cost * amount} $</b>
  </div>
);

const RemoveFromCartButton = ({ pizza }: { pizza: UniquePizza }) => {
  const dispatch = useDispatch();

  return (
    <div className='remove'>
      <button
        onClick={() => {
          if (
            window.confirm(
              'Do you really want to remove this pizza from the cart?'
            )
          ) {
            dispatch(removePizza(pizza));
          }
        }}
      >
        <X size={15} strokeWidth={3.0} />
      </button>
    </div>
  );
};

const ChangeAmount = ({
  amount,
  pizza
}: Pick<CI, 'amount'> & { pizza: UniquePizza }) => {
  const dispatch = useDispatch();

  return (
    <div className='amount'>
      <button
        disabled={amount === 1}
        onClick={() => dispatch(decrementAmount(pizza))}
      >
        <Minus size={15} strokeWidth={3.0} />
      </button>
      <b>{amount}</b>
      <button
        disabled={amount >= 99}
        onClick={() => dispatch(incrementAmount(pizza))}
      >
        <Plus size={15} strokeWidth={3.0} />
      </button>
    </div>
  );
};

export const CartItem = ({
  name,
  type,
  diameter,
  cost,
  amount,
  imageURL
}: CI) => {
  const thisPizza: UniquePizza = { name, type, diameter };

  return (
    <>
      <div className='cart-item mobile'>
        <div>
          <div>
            <Image imageURL={imageURL} />
            <Info type={type} diameter={diameter} name={name} />
          </div>
          <RemoveFromCartButton pizza={thisPizza} />
        </div>
        <div>
          <Cost cost={cost} amount={amount} />
          <ChangeAmount amount={amount} pizza={thisPizza} />
        </div>
      </div>
      <div className='cart-item desktop hide-scrollbars'>
        <Image imageURL={imageURL} />
        <Info type={type} diameter={diameter} name={name} />
        <ChangeAmount amount={amount} pizza={thisPizza} />
        <Cost cost={cost} amount={amount} />
        <RemoveFromCartButton pizza={thisPizza} />
      </div>
    </>
  );
};
