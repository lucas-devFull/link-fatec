import React from 'react';
import styled from 'styled-components';
import * as styleguide from '../../utils/stylesGlobals';

type HeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TitleModifiersProps = {
    huge: [HeadingTypes, string];
    standard: [HeadingTypes, string];
    section: [HeadingTypes, string];
    md: [HeadingTypes, string];
    sm: [HeadingTypes, string];
    subheading: [HeadingTypes, string];
};

type ParagraphModifiersProps = {
    md: string;
    sm: string;
    caption: string;
};

export const TITLE_MODIFIERS: TitleModifiersProps = {
    huge: [
        'h1',
        `
        font-size: ${styleguide.FONT_SIZE_XXL};
        letter-spacing: ${styleguide.LETTER_SPACING_TIGHT};
    `,
    ],
    standard: [
        'h2',
        `
        font-size: ${styleguide.FONT_SIZE_XL};
        letter-spacing: ${styleguide.LETTER_SPACING_TIGHT};
    `,
    ],
    section: [
        'h3',
        `
        font-size: ${styleguide.FONT_SIZE_LG};
        font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
        letter-spacing: ${styleguide.LETTER_SPACING_TIGHT};
    `,
    ],
    md: [
        'h4',
        `
        font-size: ${styleguide.FONT_SIZE_MD};
    `,
    ],
    sm: [
        'h5',
        `
        font-size: ${styleguide.FONT_SIZE_SM};
    `,
    ],
    subheading: [
        'h6',
        `
        font-size: ${styleguide.FONT_SIZE_XS};
        letter-spacing: ${styleguide.LETTER_SPACING_VERY_DISTANT};
        text-transform: ${styleguide.LETTER_CASE_UPPERCASE};
    `,
    ],
};

const PARAGRAPH_MODIFIERS: ParagraphModifiersProps = {
    md: `
        font-size: ${styleguide.FONT_SIZE_MD};
    `,
    sm: `
        font-size: ${styleguide.FONT_SIZE_SM};
    `,

    caption: `
        font-size: ${styleguide.FONT_SIZE_XS};
    `,
};

type TitleSizes = 'subheading' | 'sm' | 'md' | 'section' | 'standard' | 'huge';

export interface TitleContainerProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    size: TitleSizes;
}

export type ParagraphSizes = 'caption' | 'sm' | 'md';

export interface ParagraphContainerProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    size: ParagraphSizes;
}

export const TitleContainer = styled('h1')<TitleContainerProps>`
    font-family: ${styleguide.FONT_FAMILY_01};
    font-weight: ${styleguide.FONT_WEIGHT_BOLD};
    line-height: ${styleguide.LINE_HEIGHT_TIGHT};
    ${({ size }) => {
        return TITLE_MODIFIERS[size][1];
    }}
`;

export const ParagraphContainer = styled('p')<ParagraphContainerProps>`
    font-family: ${styleguide.FONT_FAMILY_01};
    font-weight: ${styleguide.FONT_WEIGHT_MEDIUM};
    line-height: ${styleguide.LINE_HEIGHT_MEDIUM};
    ${({ size }) => {
        return PARAGRAPH_MODIFIERS[size];
    }}
`;
