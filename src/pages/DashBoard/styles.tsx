import styled from 'styled-components';

export const ContainerCard = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    & > div {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        padding: 0.3rem 0rem;
        height: 7rem;
    }

    & > div > div > div > div > p {
        font-weight: 600;
        text-align: end;
        font-size: 2rem;
    }
    & > div > div:first-child {
        width: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #005c6d;
        padding: 0.5em;
        color: #fff;
        border-radius: 6px 0px 0px 6px;
    }

    & > div > div:last-child > div {
        padding: 0.5rem 1rem;
    }

    & > div > div:last-child {
        width: 13rem;
        height: 100%;
        border-radius: 0px 6px 6px 0px;
    }
`;

export const ContainerDashboard = styled.div`
    width: 100%;
`;

export const ContainerCharts = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 3rem 3rem 2rem 3rem;
    align-items: flex-start;
    & > div:first-child {
        width: 25rem;
    }
    & > div {
        /* display: flex; */
        /* justify-content: center; */
        /* align-items: center; */
        width: 32rem;
        & > canvas {
            height: 300px;
        }
    }
`;
