import React, { createContext, useState, useEffect, useContext } from 'react';
import axios, { LoginIn, TokenProps } from '../services/Api';
import PropTypes from 'prop-types';

interface IAuthContext {
    logged: boolean;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user: Record<string, string> | null;
    signIn(email: string, password: string): Promise<boolean>;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const setAxiosToken = (token: string): void => {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
};

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<Record<string, string> | null>(null);
    const [logged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        const storagedToken = localStorage.getItem('token');
        if (storagedToken) {
            try {
                const token = JSON.parse(storagedToken);
                setAxiosToken(token.token);
                setLogged(true);
            } catch (error) {}
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        // let token: TokenProps;
        // try {
        //     token = JSON.parse(localStorage.getItem(`token`) || ``);
        // } catch (error) {
        //     token = {
        //         access_token: '',
        //     };
        //     // token = await LoginIn(email, password);
        // }
        // debugger;
        // if (token) {
        //     setLogged(true);
        //     return true;
        //     // localStorage.setItem('@fulltrack:user', JSON.stringify(user));
        // }
        return false;
    };

    const signOut = () => {
        setUser(null);
        setLogged(false);
    };

    return (
        <AuthContext.Provider value={{ logged: logged, setLogged, user, signIn, signOut }}>
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
