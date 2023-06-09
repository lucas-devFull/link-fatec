import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../services/Api';
import PropTypes from 'prop-types';
import { Store } from 'react-notifications-component';
import { redirect } from 'react-router-dom';

export type dataUser = {
    login_type: string | number;
    name: string;
    id: number;
    profile_picture: string | null;
};
interface DataLogin {
    token: {
        access_token: string;
    };
    data: dataUser;
}
interface IAuthContext {
    logged: boolean;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user: dataUser | null;
    setUser: React.Dispatch<React.SetStateAction<dataUser | null>>;
    signIn(dataLogin: DataLogin, callback: () => void): void;
    signOut(callback?: () => void): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const setAxiosToken = (token: string): void => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
};

const AuthProvider = ({ children }: any) => {
    const storagedToken = localStorage.getItem('token');
    if (storagedToken) {
        try {
            const token = JSON.parse(storagedToken);
            setAxiosToken(token.token.access_token);
        } catch (error) {
            redirect('/');
        }
    }

    const storage = localStorage.getItem('token');
    const userActive = storage == null ? null : JSON.parse(storage).data;
    const [user, setUser] = useState<dataUser | null>(userActive ? userActive : null);
    const [logged, setLogged] = useState<boolean>(storage !== null ? true : false);

    useEffect(() => {
        const storagedToken = localStorage.getItem('token');
        if (storagedToken) {
            try {
                const token = JSON.parse(storagedToken);
                if (token && token.data && user === null) {
                    setUser(token.data);
                }

                if (token && token.token && token.token.access_token && !logged) {
                    setAxiosToken(token.token.access_token);
                    setLogged(true);
                }
            } catch (error) {
                redirect('/');
            }
        }
    }, []);

    const signIn = async (dataLogin: DataLogin, callback: () => void) => {
        Store.addNotification({
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
                localStorage.setItem('token', JSON.stringify(dataLogin));
                setAxiosToken(dataLogin.token.access_token);
                setLogged(true);
                setUser(dataLogin.data);
                callback();
            },
        });
        return false;
    };

    const signOut = (callback: () => void) => {
        // setUser(null);
        setLogged(false);
        localStorage.clear();
        callback();
    };

    return (
        <AuthContext.Provider value={{ logged: logged, setLogged, user, setUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
