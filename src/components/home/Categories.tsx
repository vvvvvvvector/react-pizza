import { useSelector, useDispatch } from 'react-redux';

import { selectHome } from '../../redux/home/selectors';
import { setCategoryIndex, setCategoryName } from '../../redux/home/slice';

const categories = ['All', 'Meat', 'Vegetarian', 'Spicy'] as const;

export const Categories = () => {
  const dispatch = useDispatch();

  const { categoryIndex } = useSelector(selectHome);

  return (
    <div className='categories'>
      <ul>
        {categories.map((_, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(setCategoryIndex(index));
              dispatch(setCategoryName(categories[index]));
            }}
            className={index === categoryIndex ? 'active' : ''}
          >
            {categories[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};
