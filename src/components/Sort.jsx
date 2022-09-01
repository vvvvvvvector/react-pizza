import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSortParameter } from '../redux/slices/homeSlice';

import arrowSVG from '../assets/images/categories-arrow.svg';

const sortParameters = ["popularity ↑", "popularity ↓", "cost ↑", "cost ↓", "alphabet ↑", "alphabet ↓"];

export const Sort = () => {
    const dispatch = useDispatch();

    const {
        selectedSortParameterIndex
    } = useSelector((state) => state.home);

    const [showPopup, setShowPopup] = React.useState(false);

    const popupRef = React.useRef(null);

    // clickOutsideSort is working only when sort component is on page(mounted?)
    React.useEffect(() => {
        const clickOutsideSort = (event) => {
            if (!event.composedPath().includes(popupRef.current)) {
                setShowPopup(false);
            }
        };

        document.body.addEventListener("click", clickOutsideSort); // add event listener on first render

        // unmount
        return () => document.body.removeEventListener("click", clickOutsideSort);  // delete event listener(unmount)
    }, []);

    return (
        <div ref={popupRef} className="sort">
            <div className="sort__label">
                <img className={showPopup ? "active" : ""} alt="arrow" src={arrowSVG} />
                <b>Sort by: </b>
                <span onClick={() => setShowPopup(!showPopup)}>{sortParameters[selectedSortParameterIndex]}</span>
            </div>
            {
                showPopup && (
                    <div className="sort__popup">
                        <ul>
                            {
                                sortParameters.map((parameter, index) => (
                                    <li onClick={() => { dispatch(setSortParameter(index)); setShowPopup(false); }} key={index} className={index === selectedSortParameterIndex ? "active" : null}>{parameter}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}