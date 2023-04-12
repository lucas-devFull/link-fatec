import React, { FC } from 'react';

const MinusMark: FC = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#minusmark)">
            <path d="M-9.5 -9.5H19.5V19.5H-9.5V-9.5Z" stroke="white" />
            <rect x="1" y="4" width="8" height="2" rx="1" fill="white" />
        </g>
        <defs>
            <clipPath id="minusmark">
                <rect width="10" height="10" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default MinusMark;
