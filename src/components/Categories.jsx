import React from 'react';

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

export const Categories = ({ selectedCategoryIndex, onChangeCategory, onChangeCategoryName }) => {
    const onClickCategory = (index) => {
        onChangeCategory(index);
        onChangeCategoryName(categories[index]);
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((_, index) => (
                        <li onClick={() => onClickCategory(index)} key={index} className={index === selectedCategoryIndex ? "active" : null}>{categories[index]}</li>
                    ))
                }
            </ul>
        </div >
    );
}