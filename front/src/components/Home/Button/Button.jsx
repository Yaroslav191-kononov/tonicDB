import React from 'react';
import './Button.css';

export const Button = ({ children, variant = 'primary', ...props }) => {
    // variant может быть 'primary', 'outline' и т.д.
    return (
        <button className={`Button Button--${variant}`} {...props}>
            {children}
        </button>
    );
};
