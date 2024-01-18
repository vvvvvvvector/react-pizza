import { Minus, Plus, X } from 'lucide-react';
import { useDispatch } from 'react-redux';

import {
  incrementAmount,
  decrementAmount,
  removePizza
} from '~/redux/cart/slice';
import type { CartItem as CI, UniquePizza } from '~/redux/cart/types';

export const CartItem = ({
  name,
  type,
  diameter,
  cost,
  amount,
  imageURL
}: CI) => {
  const dispatch = useDispatch();

  const thisPizza: UniquePizza = { name, type, diameter };

  const Image = () => <img src={imageURL} alt='pizza' />;

  const Info = () => (
    <div className='info hide-scrollbars'>
      <h3 className='hide-scrollbars'>{name}</h3>
      <p className='hide-scrollbars'>
        {type} dough, {diameter} cm
      </p>
    </div>
  );

  const Cost = () => (
    <div className='cost'>
      <b>{cost * amount} $</b>
    </div>
  );

  const RemoveFromCartButton = () => (
    <div className='remove'>
      <button
        onClick={() => {
          if (
            window.confirm(
              'Do you really want to remove this pizza from the cart?'
            )
          ) {
            dispatch(removePizza(thisPizza));
          }
        }}
      >
        <X size={15} strokeWidth={3.0} />
      </button>
    </div>
  );

  const ChangeAmount = () => (
    <div className='amount'>
      <button
        disabled={amount === 1}
        onClick={() => dispatch(decrementAmount(thisPizza))}
      >
        <Minus size={15} strokeWidth={3.0} />
      </button>
      <b>{amount}</b>
      <button
        disabled={amount >= 99}
        onClick={() => dispatch(incrementAmount(thisPizza))}
      >
        <Plus size={15} strokeWidth={3.0} />
      </button>
    </div>
  );

  return (
    <>
      <div className='cart-item mobile'>
        <div>
          <div>
            <Image />
            <Info />
          </div>
          <RemoveFromCartButton />
        </div>
        <div>
          <Cost />
          <ChangeAmount />
        </div>
      </div>
      <div className='cart-item desktop hide-scrollbars'>
        <Image />
        <Info />
        <ChangeAmount />
        <Cost />
        <RemoveFromCartButton />
      </div>
    </>
  );
};
