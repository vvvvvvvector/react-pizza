import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ShoppingCart, Trash } from 'lucide-react';

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
          <ShoppingCart size={30} strokeWidth={2.0} />
          <span>Cart</span>
        </div>
        <div className='clear'>
          <Trash size={20} strokeWidth={2.0} />
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
        <div className='summary desktop'>
          <span>
            Pizzas amount:
            <b>{amountTotal}</b>
          </span>
          <span>
            Order total:
            <b>{orderTotal} $</b>
          </span>
        </div>
        <div className='summary mobile'>
          <span>
            Amount:
            <b>{amountTotal}</b>
          </span>
          <span>
            Total:
            <b>{orderTotal} $</b>
          </span>
        </div>
        <div className='buttons'>
          <Link to='/'>
            <button className='button'>
              <ChevronLeft />
              <span>Go home</span>
            </button>
          </Link>
          <button className='button'>
            <span>Make an order!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
