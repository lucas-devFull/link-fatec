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
    justify-content: flex-start;
`;

export const ContainerGrid = styled.div``;

export const ContainerButtonGrid = styled.div`
    margin-left: 1.5rem;
    padding: 1rem 0rem;
    display: flex;
    flex-direction: row;
    width: 31rem;
    justify-content: space-between;
`;

export const ContainerForm = styled.form`
    padding: 1rem;

    & > div {
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

export const ContainerFieldsForm = styled.div`
    display: flex;
    justify-content: space-between;

    & > div.campos {
        max-width: 32% !important;
    }

    & > div {
        width: 48%;
    }

    & > div:not(:last-child) {
        padding-bottom: 0.5rem;
    }
`;

export const ContainerInputFile = styled.div`
    & > label {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        color: #495057;
        background: #ffffff;
        padding: 0.75rem 0.75rem;
        border: 1px solid #ced4da;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        appearance: none;
        cursor: pointer;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }

    & > input[type='file'] {
        display: none;
    }
`;

export const ContainerPreviewImg = styled.div`
    width: 100%;
    justify-content: center;
    height: 24rem;
    align-items: flex-start;
    display: flex;
    flex-direction: row;

    & > img {
        width: 100%;
        max-height: 100%;
        padding: 0.5rem;
    }

    & > div {
        width: 2.5rem;
        height: 2rem;
        background-color: #333333;
        cursor: pointer;
        z-index: 106;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: -3rem;
        margin-top: 0.5rem;
        color: white;
    }

    & > div:hover {
        font-size: 1.1em;
        transition: ease-in;
    }
`;
