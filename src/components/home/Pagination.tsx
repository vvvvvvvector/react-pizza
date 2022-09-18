import React from 'react';

const pages = [...new Array(2)];

type PaginationPropsTypes = {
    pageIndex: number,
    onChangePage: (pageIndex: number) => void
};

export const Pagination: React.FC<PaginationPropsTypes> = ({ pageIndex, onChangePage }) => {
    const onClickPrevious = () => {
        if (pageIndex > 1) {
            onChangePage(pageIndex - 1);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    };

    const onClickNext = () => {
        if (pageIndex <= pages.length - 1) {
            onChangePage(pageIndex + 1);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="pagination">
            <ul>
                <li>
                    <button disabled={pageIndex === 1} onClick={onClickPrevious}>
                        <span>
                            ←
                        </span>
                    </button>
                </li>
                {
                    pages.map((_, index) => (
                        <li key={index}>
                            <button onClick={() => onChangePage(index + 1)} className={index === pageIndex - 1 ? "active" : ""}>
                                <span>
                                    {index + 1}
                                </span>
                            </button>
                        </li>
                    ))
                }
                <li>
                    <button disabled={pageIndex === pages.length} onClick={onClickNext}>
                        <span>
                            →
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    );
};