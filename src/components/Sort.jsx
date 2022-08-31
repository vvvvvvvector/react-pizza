import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setSortParameter } from '../redux/slices/homeSlice';

import arrowSVG from '../assets/images/categories-arrow.svg';

const sortParameters = ["popularity ↑", "popularity ↓", "cost ↑", "cost ↓", "alphabet ↑", "alphabet ↓"];

export const Sort = () => {
    const dispatch = useDispatch();

    const selectedSortParameter = useSelector((state) => state.home.selectedSortParameterIndex);

    const [showPopup, setShowPopup] = React.useState(false);

    return (
        <div className="sort">
            <div className="sort__label">
                <img alt="arrow" src={arrowSVG} />
                <b>Sort by: </b>
                <span onClick={() => setShowPopup(!showPopup)}>{sortParameters[selectedSortParameter]}</span>
            </div>
            {
                showPopup && (
                    <div className="sort__popup">
                        <ul>
                            {
                                sortParameters.map((parameter, index) => (
                                    <li onClick={() => { dispatch(setSortParameter(index)); setShowPopup(false); }} key={index} className={index === selectedSortParameter ? "active" : null}>{parameter}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}