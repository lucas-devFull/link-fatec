import React, { memo, useEffect, useState } from 'react';
import Navigation, { NavigationItemProps } from '../../components/Navigation/index';

import { ReactComponent as DashboardSvg } from '../../assets/svgs/iconsMenu/dashboard-icon.svg';
import { ReactComponent as GeneralMapSvg } from '../../assets/svgs/iconsMenu/earth-home-world.svg';
import { ReactComponent as ReportSvg } from '../../assets/svgs/iconsMenu/business-chart.svg';
import { ReactComponent as RegisterSvg } from '../../assets/svgs/iconsMenu/plus-add.svg';
import { ReactComponent as LogistSvg } from '../../assets/svgs/iconsMenu/arrow-location-direction.svg';
import { ReactComponent as DriverBehaviorSvg } from '../../assets/svgs/iconsMenu/direction.svg';
import { ReactComponent as PainelAdmSvg } from '../../assets/svgs/iconsMenu/suitcase-portfolio.svg';
import { ReactComponent as SettingsSvg } from '../../assets/svgs/iconsMenu/settings.svg';
import { ReactComponent as ChangelogSvg } from '../../assets/svgs/iconsMenu/documents-file-text.svg';
import { ReactComponent as MessageSvg } from '../../assets/svgs/iconsMenu/emails-letter-mail.svg';
import { ReactComponent as OnboardSpeedReportSvg } from '../../assets/svgs/iconsMenu/dashboard-circle-1.svg';

import Container from './components/Container';
import { ContainerPage } from './styles';
import LogoImage from '../logoImage';
import { getMenu, TDataMenu } from '../../sidebar';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/auth';

interface Props {
    children: JSX.Element;
}

interface NavigationSubItemProps {
    callback: () => void;
    label: string;
}

const MainLayout = ({ children }: Props): JSX.Element => {
    const navigator = useNavigate();
    const [dataMenu, setDataMenu] = useState<TDataMenu[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        setDataMenu(getMenu(user?.login_type));
    }, []);

    const getNameIcon = (name: string) => {
        const icons: Record<string, JSX.Element> = {
            house: <FontAwesomeIcon size="lg" icon={icon({ name: 'house' })} />,
            add: <FontAwesomeIcon size="lg" icon={icon({ name: 'circle-plus' })} />,
        };

        return icons[name];
    };
    const defaultSubItems = (itemsSubItems: TDataMenu[] | null) => {
        const arr: NavigationSubItemProps[] = [];

        itemsSubItems?.map((item) => {
            arr.push({
                callback: () => {
                    item.endpoint ? navigator(item.endpoint) : null;
                },
                label: item.description,
            });
        });
        return arr;
    };

    const items: NavigationItemProps[] = [];
    dataMenu
        .sort((a, b) => a.ordenation - b.ordenation)
        .map((item) => {
            const subItems = item.itens.sort(
                (a: { ordenation: number }, b: { ordenation: number }) => a.ordenation - b.ordenation,
            );

            items.push({
                callback: () => (item.endpoint ? navigator(item.endpoint) : null),
                children: defaultSubItems(item.itens.length === 0 ? null : subItems),
                IconMenu: getNameIcon(item.menu_icon),
                label: `${item.description}`,
            });
        });

    return (
        <ContainerPage>
            <Navbar />
            <Navigation Icon={LogoImage} nameUser={user?.name} items={items} />
            <Container>{children}</Container>
        </ContainerPage>
    );
};

export default memo(MainLayout);
