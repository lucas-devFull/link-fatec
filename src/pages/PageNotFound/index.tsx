import React from 'react';
import { ReactComponent as PageNotFoundIcon } from '../../assets/svgs/imageIllustration/pageNotFound.svg';
import EmptyState from '../../components/EmptyState';

const PageNotFound = (): JSX.Element => {
    return (
        <EmptyState
            icon={PageNotFoundIcon}
            title={'URL não encontrada'}
            message={'certifique-se que a URL digitada está correta com o responsável'}
        ></EmptyState>
    );
};

export default PageNotFound;
