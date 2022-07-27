import React from 'react';

export function Pagination() {
    return (
        <div className="pagination">
            <ul>
                <li><a>←</a></li>
                <li><a className="active">1</a></li>
                <li><a>2</a></li>
                <li><a>3</a></li>
                <li><a>→</a></li>
            </ul>
        </div>
    );
}