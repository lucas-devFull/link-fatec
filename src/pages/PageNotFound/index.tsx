import React from 'react';
import { ReactComponent as PageNotFoundIcon } from '../../assets/svgs/imageIllustration/pageNotFound.svg';
import EmptyState from '../../components/EmptyState';

type props = {
    redirect?: boolean;
};
const PageNotFound = ({ redirect = false }: props): JSX.Element => {
    return (
        <>
            <EmptyState
                icon={PageNotFoundIcon}
                title={'URL não encontrada'}
                style={{ height: redirect ? '100vh' : '100%' }}
                message={'certifique-se que a URL digitada está correta'}
            ></EmptyState>
        </>
    );
};

export default PageNotFound;
