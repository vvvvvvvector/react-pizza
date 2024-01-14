import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Trash } from 'lucide-react';

import { selectCart } from '~/redux/cart/selectors';
import { clearCart } from '~/redux/cart/slice';

import { EmptyCart } from '~/components/empty-cart/empty-cart';
import { CartItem } from '~/components/cart-item/cart-item';

const Cart = () => {
  const dispatch = useDispatch();

  const { pizzas, orderTotal, amountTotal } = useSelector(selectCart);

  if (!pizzas.length) return <EmptyCart />;

  return (
    <div className='cart'>
      <div className='cart__top'>
        <div className='title'>
          <ShoppingCart size={30} color='#000000' strokeWidth={2.0} />
          <h2>Cart</h2>
        </div>
        <div className='clear'>
          <Trash size={20} color='#b6b6b6' strokeWidth={1.5} />
          <span
            onClick={() => {
              if (window.confirm('Do you really want to clear the cart?')) {
                dispatch(clearCart());
              }
            }}
          >
            Clear cart
          </span>
        </div>
      </div>
      <div className='cart__items hide-scrollbars'>
        {pizzas.map((pizza, index) => (
          <CartItem key={index} {...pizza} />
        ))}
      </div>
      <div className='cart__bottom'>
        <div className='summary'>
          <span>
            Pizzas amount:
            <b>{amountTotal}</b>
          </span>
          <span>
            Order total:
            <b>{orderTotal} $</b>
          </span>
        </div>
        <div className='buttons'>
          <Link to='/'>
            <div className='button button-go-back'>
              <svg
                width='8'
                height='14'
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7 13L1 6.93015L6.86175 1'
                  stroke='#D3D3D3'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>Go back</span>
            </div>
          </Link>
          <div className='button button-make-order'>
            <span>Make an order!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
