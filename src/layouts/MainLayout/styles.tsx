import styled from 'styled-components';

export const ContainerPage = styled.div`
    overflow-y: hidden;
    height: 100vh;

    display: grid;
    grid-template-columns: 3.5rem;
    grid-template-rows: 3rem;

    & > div:nth-child(1) {
        grid-area: nav;
    }

    & > div:nth-child(2) {
        grid-area: menu;
    }

    & > div:last-child {
        grid-area: content;
    }

    & {
        grid-template-areas:
            'nav nav'
            'menu content';
    }
`;
