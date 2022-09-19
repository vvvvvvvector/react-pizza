import React from "react";

export const Counter: React.FC<{ amount: number, counterStyle: string }> = ({ amount, counterStyle }) => {
    return (
        <div className={counterStyle}>
            <b>{amount}</b>
        </div>
    );
};