import React from 'react';


export const Pagination = ({ onChangePage }) => {
    const pages = [...new Array(2)];

    const [selectedPage, setSelectedPage] = React.useState(0);

    const onClickPrevious = () => {
        if (selectedPage > 0) {
            setSelectedPage(selectedPage - 1);
            onChangePage(selectedPage - 1);
        }
    };

    const onClickNext = () => {
        if (selectedPage < pages.length - 1) {
            setSelectedPage(selectedPage + 1)
            onChangePage(selectedPage + 1);
        }
    };

    return (
        <div className="pagination">
            <ul>
                <li><a onClick={onClickPrevious}>←</a></li>
                {
                    pages.map((_, index) => (
                        <li key={index}><a onClick={() => { setSelectedPage(index); onChangePage(index) }} className={index === selectedPage ? "active" : ""}>{index + 1}</a></li>
                    ))
                }
                <li><a onClick={onClickNext}>→</a></li>
            </ul>
        </div>
    );
}