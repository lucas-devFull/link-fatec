import React, { FC } from 'react';

const CheckMark: FC = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#checkmark)">
            <path d="M-9.5 -9.5H19.5V19.5H-9.5V-9.5Z" stroke="white" />
            <path
                d="M8.50375 3.2525L4.1275 7.62875L1.49875 5.0025"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="checkmark">
                <rect width="10" height="10" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default CheckMark;
