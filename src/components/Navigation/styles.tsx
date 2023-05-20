import { darken, lighten } from 'polished';
import styled, { keyframes } from 'styled-components';
import { Title } from '../Text';
import { getLightnessFromHex } from '../../utils/color-convert';
import BackArrow from '../../assets/svgStyleguide/BackArrowIcon';
import * as styleguide from '../../utils/stylesGlobals';

const fadeText = keyframes`
  from {
    display: none;
    opacity: 0;
    pointer-events: none;
  }

  to {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }
`;

export const Text = styled(Title)`
    margin: 0;
`;

export const FirstLevelText = styled(Title)`
    opacity: 0;
    pointer-events: none;
`;

type PropsActive = {
    active?: boolean;
};

export const ListItem = styled('div')<PropsActive>`
    align-items: center;
    display: flex;
    color: ${({ active }) => (active ? '#ff5656' : `${styleguide.COLOR_WHITE}`)};
    cursor: pointer;
    height: 40px;
    margin-bottom: ${styleguide.SPACING_STACK_02};
    opacity: ${styleguide.OPACITY_LEVEL_INTENSE};
    transition: 0.2s ease opacity;

    div {
        position: relative;
        text-align: center;
        width: 56px;

        svg {
            width: 56px;
            text-align: center;
        }
    }

    &:hover {
        color: #ff5656;
    }
`;

export const Dropdown = styled('div')`
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    position: relative;
    z-index: 2;

    svg path {
        stroke: ${styleguide.COLOR_NEUTRAL_DAY};
    }
`;

export const NavWrapper = styled('div')`
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    width: ${styleguide.SPACING_INLINE_08};
    background-color: ${styleguide.COLOR_BLACK};
    box-sizing: border-box;
    overflow: hidden;
    transition: width 0.3s linear;
    z-index: 9999;

    &:hover {
        width: 300px;
        transition: all 0.5s ease;

        ${FirstLevelText} {
            animation: ${fadeText} 0.2s linear forwards;
            animation-delay: 0.2s;
        }

        ${Dropdown} {
            animation: ${fadeText} 0.2s linear forwards;
            animation-delay: 0.2s;
        }
    }
`;

export const ContainerLogo = styled('div')`
    position: relative;
    text-align: center;
    width: 54px;

    div {
        text-align: center;
    }
`;

export const HrStyled = styled('hr')`
    color: #a0a0a0;
    width: 94%;
`;

export const NavHeader = styled('div')`
    display: flex;
    align-items: center;
    margin: 15px 0px;
    width: 100%;
    color: #a0a0a0;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    line-height: 120%;
    font-size: 14px;
    cursor: pointer;

    > svg {
        box-sizing: content-box;
        min-width: 40px;
        padding: ${styleguide.SPACING_INSET_NANO};
    }
`;

type MenuProps = {
    visible: boolean;
};

export const Menu = styled('div')<MenuProps>`
    background-color: #fff;
    height: 80px;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    pointer-events: ${({ visible }) => (visible ? 'initial' : 'none')};
    position: absolute;
    top: 2.7rem;
    transition: 0.2s ease opacity;
    width: 230px;
    box-shadow: ${styleguide.SHADOW_LEVEL_02} rgba(107, 117, 124, 0.32);
`;

export const Label = styled(Title)`
    max-width: 14.5em;
    color: ${styleguide.COLOR_NEUTRAL_DAY};
    margin-right: ${styleguide.SPACING_INLINE_02};
`;

export const Content = styled('div')`
    transition: all 0.5s ease-out;
`;

export const SecondLevel = styled('div')`
    background-color: ${() => {
        if (getLightnessFromHex(styleguide.COLOR_BLACK) >= 18) {
            return darken(0.02, styleguide.COLOR_BLACK);
        }
        return lighten(0.02, styleguide.COLOR_BLACK);
    }};
    height: 100%;
    left: 208px;
    opacity: 0;
    position: absolute;
    top: 0;
    width: calc(300px - ${styleguide.SPACING_INLINE_08});
    z-index: 3;
`;

export const ContainerLevelItem = styled.div`
    overflow-y: auto;
    height: 92.5%;
    padding-bottom: ${styleguide.SPACING_INLINE_03};

    &::-webkit-scrollbar-track {
        background-color: ${styleguide.COLOR_BLACK};
    }

    &::-webkit-scrollbar {
        width: 8px;
        background: ${styleguide.COLOR_BLACK};
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #6b757c;
    }
`;

export const SecondLevelItem = styled(ListItem)`
    margin: ${styleguide.SPACING_INLINE_04} 0;
    margin-left: ${styleguide.SPACING_INLINE_07};
    margin-right: ${styleguide.SPACING_INLINE_03};
    height: auto;
`;

export const SecondLevelBack = styled(BackArrow)`
    margin-left: ${styleguide.SPACING_INLINE_03};
    margin-right: ${styleguide.SPACING_INLINE_02};
`;

export const SecondLevelTopbar = styled(Title)<{ onClick: () => void }>`
    align-items: center;
    color: ${styleguide.COLOR_NEUTRAL_DAY};
    cursor: pointer;
    display: flex;
    margin-bottom: ${styleguide.SPACING_STACK_03};
    margin-top: ${styleguide.SPACING_STACK_05};
    gap: 12px;
    padding-left: ${styleguide.SPACING_INLINE_03};
`;

export const SecondLevelWrapper = styled.div`
    height: 100%;
    overflow: hidden;
    top: 0;
    width: calc(300px - ${styleguide.SPACING_INLINE_08});
`;
