import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../redux/store';
import { setSortParameter } from '../redux/slices/homeSlice';

import arrowSVG from '../assets/images/categories-arrow.svg';

const sortParameters: string[] = ["popularity ↑", "popularity ↓", "cost ↑", "cost ↓", "alphabet ↑", "alphabet ↓"];

export const Sort: React.FC = () => {
    const dispatch = useDispatch();

    const [showPopup, setShowPopup] = React.useState<boolean>(false);

    const popupRef = React.useRef<HTMLDivElement>(null);

    const {
        selectedSortParameterIndex
    } = useSelector((state: RootState) => state.home);

    // clickOutsideSort is working only when sort component is on page(mounted?)
    React.useEffect(() => {
        const clickOutsideSort = (event: any) => {
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
                <span onClick={() => setShowPopup(!showPopup)}>
                    {sortParameters[selectedSortParameterIndex]}
                </span>
            </div>
            {showPopup && (
                <div className="sort__popup">
                    <ul>
                        {
                            sortParameters.map((parameter, index) => (
                                <li onClick={() => { dispatch(setSortParameter(index)); setShowPopup(false); }} key={index} className={index === selectedSortParameterIndex ? "active" : ""}>{parameter}</li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
    );
}