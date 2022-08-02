import React from 'react';

import arrowSVG from '../assets/images/categories-arrow.svg';

const sortParameters = ["popularity ↑", "popularity ↓", "cost ↑", "cost ↓", "alphabet ↑", "alphabet ↓"];

export const Sort = () => {
    const [showPopup, setShowPopup] = React.useState(false);
    const [selectedSortParameter, setSelectedSortParameter] = React.useState(0);

    return (
        <div className="sort">
            <div className="sort__label">
                <img alt="arrow" src={arrowSVG} />
                <b>Sort by: </b>
                <span onClick={() => setShowPopup(!showPopup)}>{sortParameters[selectedSortParameter]}</span>
            </div>
            {
                showPopup && (<div className="sort__popup">
                    <ul>
                        {
                            sortParameters.map((parameter, id) => (
                                <li onClick={() => { setSelectedSortParameter(id); setShowPopup(false); }} key={id} className={id === selectedSortParameter ? "active" : null}>{parameter}</li>
                            ))
                        }
                    </ul>
                </div>)
            }
        </div>
    );
}