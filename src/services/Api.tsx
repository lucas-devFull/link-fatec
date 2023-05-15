import axios, { AxiosError } from 'axios';
import { useAuth } from '../contexts/auth';

const API_URL = process.env.REACT_APP_API_URL || '';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '',
        cancelToken: true,
    },
});

export interface TokenProps {
    access_token: string;
    refresh_token: string;
}

export const LoginIn = async (email: string, password: string) => {
    try {
        const form = {
            email: email,
            password: password,
        };
        const { data } = await instance.post('/login', form);
        if (data) {
            localStorage.setItem('token', JSON.stringify(data));
            instance.defaults.headers.Authorization = `Bearer ${data.access_token}`;
        }

        return data;
    } catch (error) {
        return false;
    }
};

export const getRefreshToken = async () => {
    const oldToken = JSON.parse(localStorage.getItem('token') || '');

    const form = new FormData();
    form.append('refresh_token', oldToken.refresh_token);
    form.append('grant_type', 'refresh_token');
    const resRefresh = await instance.post<TokenProps>('/token/refresh', form);

    if (resRefresh && resRefresh.status == 200) {
        localStorage.setItem('token', JSON.stringify(resRefresh.data));
        instance.defaults.headers.Authorization = `Bearer ${resRefresh.data.access_token}`;
    }
    return resRefresh;
};

instance.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
        if (err && err.response && err.response.status === 401) {
            localStorage.clear();
            window.location.href = 'http://localhost:3000/login';
        }
    },
);

export default instance;
