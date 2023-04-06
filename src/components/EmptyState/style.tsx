import styled from 'styled-components';

export const ContainerEmptyState = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    & > p {
        width: 320px;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 160%;
        margin-top: 16px;
    }

    & > span {
        width: 320px;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 120%;
        margin-top: 32px;
    }

    & > svg {
        margin-top: -116px;
    }
`;
