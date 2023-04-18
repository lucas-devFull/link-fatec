import React from 'react';
import { ContainerEmptyState } from './style';

type EmptyStateProps = {
    icon: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
    title: string;
    message: string | any;
    style?: React.CSSProperties;
};

const EmptyState = ({ icon: Icon, title, message, style }: EmptyStateProps): JSX.Element => {
    return (
        <ContainerEmptyState style={style}>
            <Icon />
            <span>{title}</span>
            <p>{message}.</p>
        </ContainerEmptyState>
    );
};

export default EmptyState;
