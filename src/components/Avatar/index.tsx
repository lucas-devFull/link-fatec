import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { Avatar } from 'primereact/avatar';
import { IconButton } from '@mui/material';

type props = {
    click?: React.MouseEventHandler<HTMLDivElement>;
};
const Logo = ({ click }: props): JSX.Element => {
    const { user } = useAuth();
    const [img, setImg] = React.useState<string | null>(null);

    useEffect(() => {
        if (user && user.profile_picture && user.profile_picture !== null) {
            setImg(user.profile_picture);
        }
    }, [user]);

    const getImgAvatar = () => {
        if (img && img !== null) {
            return <Avatar style={{ padding: '0.4rem' }} image={img} size="large" shape="circle" />;
        }

        return (
            <Avatar icon={'pi pi-user'} style={{ width: '2.5rem', height: '2.5rem' }} size="normal" shape="circle" />
        );
    };
    return (
        <div onClick={click}>
            <IconButton>{getImgAvatar()}</IconButton>
        </div>
    );
};

export default Logo;