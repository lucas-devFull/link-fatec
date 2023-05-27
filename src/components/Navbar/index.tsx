import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/walter-white.svg';
import { useAuth } from '../../contexts/auth';
import { ContainerNavbar } from './styles';
import Logo from '../Avatar';
import { Avatar } from 'primereact/avatar';
import logoHeader from '../../assets/images/logoHeader.png';
type Props = {
    Icon?: any;
};

const Navbar: React.FC<Props> = ({ Icon = <LogoImage /> }) => {
    const { signOut } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    return (
        <ContainerNavbar>
            <div>
                <img width={'15%'} src={logoHeader} alt="" />
            </div>
            <div>
                {/* <Badge badgeContent={4} color="error" style={{ cursor: 'pointer' }}> */}
                {/* <FontAwesomeIcon size="lg" icon={icon({ name: 'bell', style: 'regular' })} /> */}
                {/* </Badge> */}

                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <Logo></Logo>
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
                        {/* <MenuItem onClick={() => navigate('/perfil')}>Perfil</MenuItem> */}
                        <MenuItem
                            onClick={() =>
                                signOut(() => {
                                    navigate('/');
                                    window.location.href = '/';
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
