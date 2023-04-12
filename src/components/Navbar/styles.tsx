import styled from 'styled-components';
import * as styleguide from '../../utils/stylesGlobals';

export const ContainerNavbar = styled.div`
    background: ${styleguide.COLOR_WHITE};
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid rgb(213, 216, 218);
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padd */

    & > div:first-child {
        padding: 1rem;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 600;
        color: #a83c3c;
    }

    & > div:last-child {
        width: 14rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
`;
