import React from 'react';

const pages = [...new Array(2)];

export const Pagination = ({ selectedPageIndex, onChangePage }) => {
    const onClickPrevious = () => {
        if (selectedPageIndex > 0) {
            onChangePage(selectedPageIndex - 1);
        }
    };

    const onClickNext = () => {
        if (selectedPageIndex < pages.length - 1) {
            onChangePage(selectedPageIndex + 1);
        }
    };

    return (
        <div className="pagination">
            <ul>
                <li><a onClick={onClickPrevious}>←</a></li>
                {
                    pages.map((_, index) => (
                        <li key={index}><a onClick={() => { onChangePage(index) }} className={index === selectedPageIndex ? "active" : ""}>{index + 1}</a></li>
                    ))
                }
                <li><a onClick={onClickNext}>→</a></li>
            </ul>
        </div>
    );
}