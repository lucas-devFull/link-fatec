import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoDefault from '../../../assets/nav-logo.png';

export const LogoMenu = (): React.ReactElement => {
    const navigate = useNavigate();
    const S3_URL = process.env.REACT_APP_BASE_URL_S3 || '';

    const getIndice = () => {
        let numberIndice = { indice: '' };
        const indiceStorage = localStorage.getItem('indice');
        if (indiceStorage) {
            try {
                numberIndice = JSON.parse(indiceStorage);
            } catch (error) {
                console.log(error);
            }
        }
        return 'logo_' + numberIndice;
    };

    return (
        <img
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
            src={S3_URL + getIndice()}
            alt="Logo"
            id="logo"
            onError={(e) => {
                e.currentTarget.src = logoDefault;
            }}
        />
    );
};

export default LogoMenu;
