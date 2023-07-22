import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { ButtonLogin, ComponentLogin, ContainerInput, ContainerLogin, InputLogin } from './style';
import loginWallpeaper from '../../assets/images/illustration.png';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import axios from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import logoLogin from '../../assets/images/logoLogin.png';

const Login: React.FC = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    function handleLogin() {
        setLoading(true);
        const form = {
            email: fieldsLogin.email,
            password: fieldsLogin.password,
        };

        try {
            axios
                .post('/v1/web/login', form)
                .then((response) => {
                    if (response.status == 200) {
                        setLoading(false);
                        signIn(response.data, () => {
                            navigate('/');
                        });
                    } else {
                        alert('ERRO');
                    }
                })
                .catch((er) => {
                    setLoading(false);
                    Store.addNotification({
                        message: 'Login ou Senha Incorretos! Tente novamente',
                        type: 'warning',
                        insert: 'top',
                        container: 'top-right',
                        width: 350,
                        dismiss: {
                            duration: 2000,
                            onScreen: true,
                        },
                    });
                });
        } catch (error) {
            console.log('erro');
        }
    }

    const [fieldsLogin, setFieldsLogin] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };
    return (
        <ComponentLogin
            style={{
                backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + loginWallpeaper + ')',
            }}
        >
            <ReactNotifications />
            <ContainerLogin>
                <ContainerInput>
                    <div>
                        <img src={logoLogin} alt="" />
                    </div>
                    <div>
                        <InputLogin>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setFieldsLogin({
                                        ...fieldsLogin,
                                        email: e.target.value,
                                    })
                                }
                                placeholder=""
                                onKeyDown={handleKeyDown}
                                name=""
                                id=""
                            />
                            <span></span>
                            <span className="label"> Email </span>
                        </InputLogin>
                    </div>
                    <div>
                        <InputLogin>
                            <input
                                type="password"
                                onChange={(e) =>
                                    setFieldsLogin({
                                        ...fieldsLogin,
                                        password: e.target.value,
                                    })
                                }
                                placeholder=""
                                onKeyDown={handleKeyDown}
                                name=""
                                id=""
                            />
                            <span></span>
                            <span> Senha </span>
                        </InputLogin>
                    </div>
                    <ButtonLogin onClick={() => handleLogin()} disabled={loading}>
                        {loading ? <CircularProgress color={'error'} size={'2rem'} /> : 'LOGIN'}
                    </ButtonLogin>
                </ContainerInput>
            </ContainerLogin>
        </ComponentLogin>
    );
};

export default Login;
