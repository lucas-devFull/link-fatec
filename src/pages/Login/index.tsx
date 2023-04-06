import React, { useState } from 'react';
import { setAxiosToken, useAuth } from '../../contexts/auth';
import { ButtonLogin, ComponentLogin, ContainerInput, ContainerLogin, InputLogin } from './style';
import loginWallpeaper from '../../assets/images/illustration.png';
import { LoginIn, TokenProps } from '../../services/Api';
import ReactNotification, { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import axios from '../../services/Api';

const Login: React.FC = () => {
    const { setLogged } = useAuth();

    function handleLogin() {
        const form = {
            email: fieldsLogin.email,
            password: fieldsLogin.password,
        };

        try {
            axios
                .post('/login', form)
                .then((response) => {
                    if (response.status == 200) {
                        Store.addNotification({
                            // title: 'Login',
                            message: 'Login Efetuado com sucesso',
                            type: 'success',
                            insert: 'top',
                            container: 'top-right',
                            animationIn: ['animated', 'fadeIn'],
                            animationOut: ['animated', 'fadeOut'],
                            dismiss: {
                                duration: 2000,
                                onScreen: true,
                            },
                            onRemoval: () => {
                                localStorage.setItem('token', JSON.stringify(response.data));
                                setAxiosToken(response.data.token);
                                setLogged(true);
                            },
                        });
                    } else {
                        alert('ERRO');
                    }
                })
                .catch((er) => {
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
            debugger;
            alert('erro');
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
                    <div> Gestão Estágio </div>
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
                                placeholder="input"
                                onKeyDown={handleKeyDown}
                                name=""
                                id=""
                            />
                            <span></span>
                            <span className="label"> Usuário </span>
                        </InputLogin>
                    </div>
                    <div>
                        <InputLogin>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setFieldsLogin({
                                        ...fieldsLogin,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="input"
                                onKeyDown={handleKeyDown}
                                name=""
                                id=""
                            />
                            <span></span>
                            <span> Senha </span>
                        </InputLogin>
                    </div>
                    <ButtonLogin onClick={() => handleLogin()}>LOGIN</ButtonLogin>
                </ContainerInput>
            </ContainerLogin>
        </ComponentLogin>
    );
};

export default Login;
