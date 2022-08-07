import React from 'react';

import arrowSVG from '../assets/images/categories-arrow.svg';

const sortParameters = ["popularity ↑", "popularity ↓", "cost ↑", "cost ↓", "alphabet ↑", "alphabet ↓"];

export const Sort = ({ selectedSortParameterIndex, onChangeSortParameter }) => {
    const [showPopup, setShowPopup] = React.useState(false);

    return (
        <div className="sort">
            <div className="sort__label">
                <img alt="arrow" src={arrowSVG} />
                <b>Sort by: </b>
                <span onClick={() => setShowPopup(!showPopup)}>{sortParameters[selectedSortParameterIndex]}</span>
            </div>
            {
                showPopup && (
                    <div className="sort__popup">
                        <ul>
                            {
                                sortParameters.map((parameter, index) => (
                                    <li onClick={() => { onChangeSortParameter(index); setShowPopup(false); }} key={index} className={index === selectedSortParameterIndex ? "active" : null}>{parameter}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}