import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/walter-white.svg';
import { useAuth } from '../../contexts/auth';
import { ContainerNavbar } from './styles';

type Props = {
    Icon?: any;
};

const Navbar: React.FC<Props> = ({ Icon = <LogoImage /> }) => {
    const { signOut, user } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    return (
        <ContainerNavbar>
            <div> FATEC ESTÁGIO </div>
            <div>
                <Badge badgeContent={4} color="error" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon size="lg" icon={icon({ name: 'bell', style: 'regular' })} />
                </Badge>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Abrir Configurações" onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <IconButton>
                            <Avatar sx={{ width: 32, height: 32 }} alt=""></Avatar>
                        </IconButton>
                    </Tooltip>

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
                                mt: 1.5,
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
                                    right: 14,
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
                        <MenuItem onClick={() => navigate('/perfil')}>Perfil</MenuItem>
                        <MenuItem
                            onClick={() =>
                                signOut(() => {
                                    navigate('/login');
                                })
                            }
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </div>
        </ContainerNavbar>
    );
};

export default Navbar;
