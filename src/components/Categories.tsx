import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../redux/store';
import { setCategoryIndex, setCategoryName } from '../redux/slices/homeSlice';

const categories: string[] = ["All", "Meat", "Vegetarian", "Spicy"];

export const Categories: React.FC = () => {
    const dispatch = useDispatch();

    const {
        selectedCategoryIndex
    } = useSelector((state: RootState) => state.home);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((_, index) => (
                        <li key={index} onClick={() => { dispatch(setCategoryIndex(index)); dispatch(setCategoryName(categories[index])) }} className={index === selectedCategoryIndex ? "active" : ""}>
                            {categories[index]}
                        </li>
                    ))
                }
            </ul>
        </div >
    );
}