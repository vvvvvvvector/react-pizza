import React from 'react';

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

export const Categories = ({ setCategoryName }) => {
    const [selectedCategory, setSelectedCategory] = React.useState(0);

    const onClickCategory = (index) => {
        setSelectedCategory(index);
        setCategoryName(categories[index]);
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li onClick={() => onClickCategory(index)} key={index} className={index === selectedCategory ? "active" : null}>{category}</li>
                    ))
                }
            </ul>
        </div >
    );
}