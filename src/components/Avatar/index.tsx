import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { Avatar } from 'primereact/avatar';
import { IconButton } from '@mui/material';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <Avatar
                icon={<FontAwesomeIcon icon={icon({ name: 'user', style: 'regular' })} />}
                style={{ padding: '1.3rem' }}
                size="normal"
                shape="circle"
            />
        );
    };
    return (
        <div onClick={click}>
            <IconButton>{getImgAvatar()}</IconButton>
        </div>
    );
};

export default Logo;
