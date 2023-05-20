import styled from 'styled-components';

export const ContainerCard = styled.div`
    display: flex;
    width: 100%;
    height: 8rem;
    justify-content: space-around;
    align-items: center;

    & > div {
        display: flex;
        flex-direction: row;
        cursor: pointer;
    }

    & > div > div > div > div > p {
        font-weight: 600;
        text-align: end;
        font-size: 2rem;
    }
    & > div > div:first-child {
        width: 8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #005c6d;
        padding: 0.5em;
        color: #fff;
        border-radius: 6px 0px 0px 6px;
    }

    & > div > div:last-child > div {
        padding: 1rem;
    }

    & > div > div:last-child {
        width: 18rem;
        height: 100%;
        border-radius: 0px 6px 6px 0px;
    }
`;

export const ContainerDashboard = styled.div`
    width: 100%;
`;

export const ContainerCharts = styled.div`
    height: 88%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 6rem 3rem 5rem 3rem;
    & > div {
        /* display: flex; */
        /* justify-content: center; */
        /* align-items: center; */
        width: 35rem;
    }
`;
