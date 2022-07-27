import React from 'react';

import arrowSVG from '../assets/images/categories-arrow.svg';

export function Sort() {
    const [showPopup, setShowPopup] = React.useState(false);

    return (
        <div className="sort">
            <div className="sort__label">
                <img alt="arrow" src={arrowSVG} />
                <b>Sort by: </b>
                <span onMouseOver={() => setShowPopup(!showPopup)}>popularity ↑</span>
            </div>
            {showPopup ?
                <div onMouseLeave={() => setShowPopup(!showPopup)} className="sort__popup">
                    <ul>
                        <li className="active">popularity ↑</li>
                        <li>popularity ↓</li>
                        <li>cost ↑</li>
                        <li>cost ↓</li>
                        <li>alphabet ↑</li>
                        <li>alphabet ↓</li>
                    </ul>
                </div> : null}
        </div>
    );
}