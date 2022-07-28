import React from 'react';

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

export function Categories({ selectedCategory, setSelectedCategory }) {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, id) => (
                        <li onClick={() => setSelectedCategory(id)} key={id} className={id === selectedCategory ? "active" : null}>{category}</li>
                    ))
                }
            </ul>
        </div >);
}