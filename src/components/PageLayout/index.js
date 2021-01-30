import React from 'react';
import './index.scss';

const Pagelayout = ({ 
    children
}) => {

    return (
        <div className="pagelayout">
            {children}
        </div>
    )
}

export default Pagelayout