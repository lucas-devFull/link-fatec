import React, { FC } from 'react';

const CarretDown: FC = () => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        stroke="currentColor"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#carret-down)">
            <path d="M1 3L5 7L9 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
            <clipPath id="carret-down">
                <rect width="10" height="10" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default CarretDown;
