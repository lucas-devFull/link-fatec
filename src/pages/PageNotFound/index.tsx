import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PageNotFoundIcon } from '../../assets/svgs/imageIllustration/pageNotFound.svg';
import EmptyState from '../../components/EmptyState';

type props = {
    redirect?: boolean;
};
const PageNotFound = ({ redirect = false }: props): JSX.Element => {
    const navigate = useNavigate();

    if (redirect) {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }

    return (
        <EmptyState
            icon={PageNotFoundIcon}
            title={'URL não encontrada'}
            style={{ height: redirect ? '100vh' : '100%' }}
            message={
                redirect
                    ? 'Redirecionando para o Login'
                    : 'certifique-se que a URL digitada está correta com o responsável'
            }
        ></EmptyState>
    );
};

export default PageNotFound;
