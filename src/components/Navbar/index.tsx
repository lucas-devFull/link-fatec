import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Box, Button, CircularProgress, IconButton, InputLabel, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/walter-white.svg';
import { ContainerNavbar } from './styles';
import Logo from '../Avatar';
import logoHeader from '../../assets/images/logoHeader.png';
import { useAuth } from '../../contexts/auth';

type Props = {
    Icon?: any;
};

const Navbar: React.FC<Props> = ({ Icon = <LogoImage /> }) => {
    const { signOut, user, setUser } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    return (
        <ContainerNavbar>
            <div>
                <img onClick={() => navigate('/')} width={'15%'} src={logoHeader} alt="" />
            </div>
            <div>
                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <FontAwesomeIcon size="1x" icon={icon({ name: 'arrow-right-from-bracket' })} />

                        {/* <Logo></Logo> */}
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 0,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 18,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {/* <MenuItem onClick={() => setVisibleModalProfile(true)}>Perfil</MenuItem> */}
                        <MenuItem
                            onClick={() =>
                                signOut(() => {
                                    navigate('/');
                                    window.location.href = '/';
                                })
                            }
                        >
                            Sair
                        </MenuItem>
                    </Menu>
                </Box>
            </div>
        </ContainerNavbar>
    );
};

export default Navbar;
