import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryIndex, setCategoryName } from '../redux/slices/homeSlice';

const categories = ["All", "Meat", "Vegetarian", "Spicy"];

export const Categories = () => {
    const dispatch = useDispatch();

    const {
        selectedCategoryIndex
    } = useSelector((state) => state.home);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((_, index) => (
                        <li onClick={() => { dispatch(setCategoryIndex(index)); dispatch(setCategoryName(categories[index])) }} key={index} className={index === selectedCategoryIndex ? "active" : null}>{categories[index]}</li>
                    ))
                }
            </ul>
        </div >
    );
}