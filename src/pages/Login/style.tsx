import styled from 'styled-components';

export const ComponentLogin = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(-135deg, #c850c0, #4158d0);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContainerLogin = styled.div`
    & > div > div:first-child {
        text-align: center;
        font-size: 3rem;
        font-family: Resolve-Sans-Regular;
    }

    position: absolute;
    background-color: white;
    width: 23%;
    height: 55%;
    box-shadow: #fff 2px 2px 2px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    border-radius: 20px;

    & > div {
        padding: 4rem 2rem;
    }
`;

export const InputLogin = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    width: 100%;
    height: 3rem;
    position: relative;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    margin-bottom: 2rem;

    & > input {
        outline: none;
        border: none;
        display: block;
        width: 100%;
        background: 0 0;
        font-family: Montserrat-Regular;
        font-size: 18px;
        color: #555;
        line-height: 1.2;
        padding: 0 26px;

        height: 100%;
        transition: all 0.4s;

        &:focus + span {
            visibility: visible;
            opacity: 1;
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }

        &::-webkit-input-placeholder {
            color: transparent;
        }

        &:focus::-webkit-input-placeholder {
            color: transparent;
        }

        &:focus:-moz-placeholder {
            color: transparent;
        }

        &:focus::-moz-placeholder {
            color: transparent;
        }

        &:focus:-ms-input-placeholder {
            color: transparent;
        }

        &:focus,
        &:not(:placeholder-shown) {
            padding-top: 0.6em;
        }

        &:focus + span + span {
            top: 2px;
            color: rgb(53, 53, 54);
            font-size: 13px;
        }

        &:not(:placeholder-shown) + span + span {
            top: 2px;
            color: rgb(53, 53, 54);
            font-size: 13px;
        }
    }

    & > span:nth-child(2) {
        position: absolute;
        display: block;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        top: -1px;
        left: -1px;
        pointer-events: none;
        border: 1px solid #353536;
        border-radius: 10px;
        visibility: hidden;
        opacity: 0;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
        -webkit-transform: scaleX(1.1) scaleY(1.3);
        -moz-transform: scaleX(1.1) scaleY(1.3);
        -ms-transform: scaleX(1.1) scaleY(1.3);
        -o-transform: scaleX(1.1) scaleY(1.3);
        transform: scaleX(1.1) scaleY(1.3);
    }

    & > span:nth-child(3) {
        font-family: Montserrat-Regular;
        font-size: 18px;
        color: #999;
        line-height: 1.2;
        display: block;
        position: absolute;
        pointer-events: none;
        width: 100%;
        padding-left: 24px;
        left: 0;
        top: 0.9rem;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }
`;

export const ContainerInput = styled.div`
    & > div:first-child {
        font-size: 2rem;
        margin-bottom: 3rem;
    }
`;

export const ButtonLogin = styled.button`
    margin-top: 2rem;
    width: 100%;
    height: 3rem;
    border-radius: 10px;
    outline: none;
    appearance: none;
    padding: 1rem;
    cursor: pointer;
    background: #d30808;
    font-family: Montserrat-Bold;
    font-weight: bold;
    border: 1px solid #d30808;
    color: #fff;

    &:hover {
        background: #bf0404;
    }
`;
