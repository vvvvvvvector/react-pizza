import React from "react";

const pages = [...new Array(2)];

type PaginationPropsTypes = {
    selectedPageIndex: number,
    onChangePage: (pageIndex: number) => void
}

export const Pagination: React.FC<PaginationPropsTypes> = ({ selectedPageIndex, onChangePage }) => {
    const onClickPrevious = () => {
        if (selectedPageIndex > 1) {
            onChangePage(selectedPageIndex - 1);
        }
    };

    const onClickNext = () => {
        if (selectedPageIndex <= pages.length - 1) {
            onChangePage(selectedPageIndex + 1);
        }
    };

    return (
        <div className="pagination">
            <ul>
                <li>
                    <button className={""} disabled={false} onClick={onClickPrevious}>
                        <span>
                            ←
                        </span>
                    </button>
                </li>
                {
                    pages.map((_, index) => (
                        <li key={index}>
                            <button onClick={() => onChangePage(index + 1)} className={index === selectedPageIndex - 1 ? "active" : ""}>
                                <span>
                                    {index + 1}
                                </span>
                            </button>
                        </li>
                    ))
                }
                <li>
                    <button className={""} disabled={false} onClick={onClickNext}>
                        <span>
                            →
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    );
}