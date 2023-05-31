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
        if (user) {
            setImg(user.profile_picture);
        }
    }, [user]);

    const getImgAvatar = () => {
        if (img && img !== null) {
            return (
                <Avatar
                    style={{
                        width: 45,
                        height: 'auto',
                        maxHeight: '100%',
                    }}
                    image={img}
                    size="normal"
                    shape="square"
                />
            );
        }

        return (
            <Avatar
                icon={<FontAwesomeIcon icon={icon({ name: 'user', style: 'regular' })} />}
                style={{
                    // padding: '1.3rem',
                    width: 45,
                    height: 40,
                }}
                size="normal"
                shape="square"
            />
        );
    };
    return (
        <div onClick={click}>
            <IconButton sx={{ padding: '5px' }}>{getImgAvatar()}</IconButton>
        </div>
    );
};

export default Logo;
