import React from 'react';
import { ContainerEmptyState } from './style';

type EmptyStateProps = {
    icon: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
    title: string;
    message: string;
};

const EmptyState = ({ icon: Icon, title, message }: EmptyStateProps): JSX.Element => {
    return (
        <ContainerEmptyState>
            <Icon />
            <span>{title}</span>
            <p>{message}.</p>
        </ContainerEmptyState>
    );
};

export default EmptyState;
