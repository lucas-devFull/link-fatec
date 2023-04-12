import React, { FC } from 'react';

const NavLogo: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <g clipPath="url(#navlogo0)">
            <path
                d="M4.24615 11C4.11021 11 4 11.1102 4 11.2462V29.4615C4 29.5975 4.11021 29.7077 4.24615 29.7077H29.7442C29.8095 29.7077 29.8721 29.6818 29.9183 29.6356L35.9279 23.6259C35.9741 23.5798 36 23.5172 36 23.4519V11.2462C36 11.1102 35.8898 11 35.7538 11H4.24615Z"
                fill="#CF1C26"
            />
            <g clipPath="url(#navlogo1)">
                <rect x="5.96924" y="12.9692" width="14.7692" height="3.93846" rx="0.246154" fill="white" />
                <rect x="5.96924" y="18.3848" width="9.84615" height="3.93846" rx="0.246154" fill="white" />
                <rect x="5.96924" y="23.7998" width="4.92308" height="3.93846" rx="0.246154" fill="white" />
            </g>
        </g>
        <defs>
            <clipPath id="navlogo0">
                <rect width="32" height="18.7077" fill="white" transform="translate(4 11)" />
            </clipPath>
            <clipPath id="navlogo1">
                <rect width="14.7692" height="14.7692" fill="white" transform="translate(5.96924 12.9692)" />
            </clipPath>
        </defs>
    </svg>
);

export default NavLogo;
