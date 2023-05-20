import React, { ReactElement } from 'react';
import styled from 'styled-components';

export const ContainerContent = styled.div`
    max-height: 100%;
`;

interface Props {
    children: ReactElement;
}
const Container = ({ children }: Props): JSX.Element => {
    return <ContainerContent> {children} </ContainerContent>;
};

export default Container;
