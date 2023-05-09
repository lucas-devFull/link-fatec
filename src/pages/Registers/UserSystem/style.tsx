import styled from 'styled-components';

export const TitleRegister = styled.p`
    padding: 1rem;
    font-size: 2rem;
    margin-bottom: 4rem;
`;

export const ContainerRegister = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ContainerGrid = styled.div``;

export const ContainerButtonGrid = styled.div`
    margin-left: 1.5rem;
    padding: 1rem 0rem;
    display: flex;
    flex-direction: row;
    width: 22rem;
    justify-content: space-between;
`;

export const ContainerForm = styled.form`
    padding: 1rem;

    & > div:first-child {
        padding-bottom: 1rem;
    }
`;

export const ContainerFields = styled.div`
    & > p {
        margin-top: 1rem;
        color: #bf1650;
        text-align: center;
    }

    & > p::before {
        display: inline;
        content: '⚠ ';
    }
`;

export const ContainerPopUpButton = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-top: 0.5rem;
`;

export const ContainerLoginPassword = styled.div`
    display: flex;
    justify-content: space-between;
    & > div {
        width: 45%;
    }
`;
