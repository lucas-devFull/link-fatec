import React, { FC, SVGProps } from 'react';

const SwitchCheckMark: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#switch-check)">
            <path d="M-15.5 -15.5H31.5V31.5H-15.5V-15.5Z" stroke="#CF1C26" />
            <path
                d="M13.606 5.204L6.604 12.206L2.398 8.004"
                stroke="#CF1C26"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="switch-check">
                <rect width="16" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default SwitchCheckMark;
