import React from 'react';
import { TITLE_MODIFIERS, TitleContainer, ParagraphContainer } from './styles';
import type { ParagraphContainerProps, TitleContainerProps } from './styles';

export const Title: React.FC<TitleContainerProps> = ({ children, size, ...rest }) => {
    const tag = TITLE_MODIFIERS[size][0];
    return (
        <TitleContainer size={size} {...rest} as={tag}>
            {children}
        </TitleContainer>
    );
};

export const Paragraph: React.FC<ParagraphContainerProps> = ({ children, size, ...rest }) => {
    return (
        <ParagraphContainer size={size} {...rest}>
            {children}
        </ParagraphContainer>
    );
};
