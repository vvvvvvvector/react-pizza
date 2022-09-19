import React from "react";

export const Counter: React.FC<{ amount: number }> = ({ amount }) => {
    return (
        <>
            {amount}
        </>
    );
};