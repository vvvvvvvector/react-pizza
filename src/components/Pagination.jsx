import React from 'react';

const pages = ["←", "1", "2", "3", "→"];

export const Pagination = () => {
    const [selectedPage, setSelectedPage] = React.useState(0);

    return (
        <div className="pagination">
            <ul>
                {
                    pages.map((_, index) => (
                        <li><a onClick={() => setSelectedPage(index)} className={index === selectedPage ? "active" : ""}>{pages[index]}</a></li>
                    ))
                }
            </ul>
        </div>
    );
}