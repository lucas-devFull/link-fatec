import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import {
    NavWrapper,
    NavHeader,
    Content,
    ListItem,
    FirstLevelText,
    Text,
    SecondLevel,
    SecondLevelItem,
    SecondLevelBack,
    SecondLevelTopbar,
    SecondLevelWrapper,
    ContainerLogo,
    ContainerLevelItem,
    HrStyled,
} from './styles';
import { SPACING_INLINE_08 } from '../../utils/stylesGlobals';
import { useNavigate } from 'react-router-dom';

export interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    callback: () => void;
    children: Array<any>;
    IconMenu: any;
    label: string;
}

type Props = {
    Icon: React.FC;
    nameUser?: string;
    items: Array<NavigationItemProps>;
};

const AnimatedSecondLevel = animated(SecondLevel);

const Navigation: React.FC<Props> = ({ items, nameUser = 'Lucas Conceição', Icon }) => {
    const [secondLevelIndex, setLevelIndex] = useState(-1);
    const [activeItem, setActiveItem] = useState<number>(0);
    const navigate = useNavigate();

    const transitions = useTransition(secondLevelIndex >= 0, {
        from: { opacity: 0, left: '208px' },
        enter: { opacity: 1, left: SPACING_INLINE_08 },
        leave: { opacity: 0, left: '208px' },
        config: {
            duration: 400,
        },
    });

    return (
        <NavWrapper
            onMouseLeave={() => {
                setLevelIndex(-1);
                setActiveItem(0);
            }}
        >
            <NavHeader>
                <ContainerLogo onClick={() => navigate('/')}>{<Icon />}</ContainerLogo>
                <div>{nameUser}</div>
            </NavHeader>

            <HrStyled />
            <Content>
                <Content>
                    {items?.map(({ IconMenu, label, callback, children }, index) => {
                        return (
                            <ListItem
                                key={index}
                                onClick={() => {
                                    if (children.length > 0) {
                                        setLevelIndex(index);
                                    }

                                    if (!(children.length > 0)) {
                                        setLevelIndex(-1);
                                    }

                                    callback();
                                    setActiveItem(index);
                                }}
                                active={secondLevelIndex === index || activeItem === index}
                            >
                                <div>{IconMenu}</div>
                                <FirstLevelText size="sm">{label}</FirstLevelText>
                            </ListItem>
                        );
                    })}
                </Content>
                {transitions(
                    (styles, item) =>
                        item && (
                            <SecondLevelWrapper>
                                <AnimatedSecondLevel style={styles}>
                                    <SecondLevelTopbar
                                        size="md"
                                        onClick={() => {
                                            setLevelIndex(-1);
                                            setActiveItem(0);
                                        }}
                                    >
                                        <SecondLevelBack />
                                        {items[secondLevelIndex]?.label}
                                    </SecondLevelTopbar>
                                    <ContainerLevelItem>
                                        {secondLevelIndex >= 0 &&
                                            items[secondLevelIndex].children.map(({ label, callback }, index) => (
                                                <SecondLevelItem key={index} onClick={() => callback()}>
                                                    <Text size="sm">{label}</Text>
                                                </SecondLevelItem>
                                            ))}
                                    </ContainerLevelItem>
                                </AnimatedSecondLevel>
                            </SecondLevelWrapper>
                        ),
                )}
            </Content>
        </NavWrapper>
    );
};

export default Navigation;
