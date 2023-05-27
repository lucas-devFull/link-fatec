import React, { useEffect } from 'react';
import { ReactComponent as PageNotFoundIcon } from '../../assets/svgs/imageIllustration/pageNotFound.svg';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../contexts/auth';

type props = {
    redirectPage?: boolean | null;
};
const PageNotFound = ({ redirectPage = false }: props): JSX.Element => {
    const { logged } = useAuth();
    useEffect(() => {
        if (logged !== true) {
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            clearTimeout;
        }
    }, [logged]);

    return (
        <>
            <EmptyState
                icon={PageNotFoundIcon}
                title={'URL não encontrada'}
                style={{ height: redirectPage ? '100vh' : '100%' }}
                message={'certifique-se que a URL digitada está correta'}
            ></EmptyState>
        </>
    );
};

export default PageNotFound;
