import React from 'react';

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

export function Categories() {
    const [selectedCategory, setSelectedCategory] = React.useState(0);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li onClick={() => setSelectedCategory(index)} key={index} className={index === selectedCategory ? "active" : null}>{category}</li>
                    ))
                }
            </ul>
        </div >);
}