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
    align-items: flex-start;

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

export const ContainerHeaderModalApplications = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div.body {
        padding: 0.5em;
    }

    & > div > div.avatar {
        width: 7rem;
        height: 7rem;

        & > img {
            border-radius: 10px;
        }
    }

    & > div:first-child {
        display: flex;
        align-items: start;

        & > div:last-child {
            margin-left: 0.5rem;
            margin-top: 0.5rem;
        }
    }
`;

export const ContainerModalApplication = styled.div`
    & > div.modalApplications {
        margin: 1.25rem 0px 0px 0px;
    }
`;

export const ContainerBodyModalApplication = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
        height: auto;
        padding: 0.5rem 0rem;
        width: 100%;
        border-bottom: 1px solid #e6e6e6;
    }
`;

export const ContainerNameCompany = styled.div`
    font-size: 1rem;

    & > div {
        display: flex;
        flex-direction: column;

        & > span {
            margin-top: 0.1rem;
            font-size: 0.8rem;
            font-weight: 400;
        }
    }
`;

type Props = {
    typeButton: string;
};

export const ContainerStateJob = styled.div<Props>`
    margin: 0 1rem;
    padding: 0.5rem;
    cursor: pointer;

    & > div {
        color: #fff;
        border-radius: 10px !important;
        font-weight: 800;
        background-color: ${({ typeButton }: Props) => (typeButton == 'active' ? '#3acf1f' : '#D32719')};
        border: 1px solid ${({ typeButton }: Props) => (typeButton == 'active' ? '#3acf1f' : '#D32719')};

        & > svg {
            font-weight: 800;
            margin-right: 0.5rem;
        }
    }
`;

export const ContainerStudentsApplications = styled.div`
    padding: 0.5rem;
`;

export const ContainerNoApplications = styled.div`
    text-align: center;
`;

export const ContainerFileResume = styled.a`
    display: flex;
    align-items: end;
    margin: 0.5rem 0rem;
    padding: 0.5rem;
    border: 1px solid #292929;
    cursor: pointer;
    text-decoration: none;
    color: #292929;
    width: 7rem;
    justify-content: center;

    &:hover {
        background-color: #292929;
        color: #f0f0f0;
    }

    & > svg {
        margin-left: 0.5rem;
    }
`;

export const ContainerLoading = styled.div`
    position: relative;
    bottom: 2.91rem;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff73;
    border: 1px solid #ffffff73;
    z-index: 999;
`;

export const ContainerLoadingState = styled.div`
    position: relative;
    bottom: 3.2rem;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff73;
    border: 1px solid #ffffff73;
    z-index: 999;
`;
