import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, CircularProgress, IconButton, InputLabel, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/walter-white.svg';
import { useAuth } from '../../contexts/auth';
import { ContainerNavbar } from './styles';
import Logo from '../Avatar';
import { Dialog } from 'primereact/dialog';
import logoHeader from '../../assets/images/logoHeader.png';
import { Divider } from 'primereact/divider';
import {
    ContainerFields,
    ContainerFieldsForm,
    ContainerForm,
    ContainerInputFile,
    ContainerPreviewImg,
} from '../../pages/Registers/jobs/style';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { propsFieldsUser } from '../../pages/Registers/UserSystem';
import { isValidEmail } from '../../utils';

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
    const [visibleModalProfile, setVisibleModalProfile] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<propsFieldsUser>();
    const [previewImg, setPreviewImg] = useState<any | null>(null);
    const [nameImg, setNameImg] = useState<string | null>(null);

    const setFields = (values: propsFieldsUser | null) => {
        if (values == null) {
            reset();
        } else {
            setValue('id', values.id);
            setValue('full_name', values.name);
            setValue('email', values.email);
            setPreviewImg(values.profile_picture);

            if (values && values.profile_picture !== null && typeof values.profile_picture === 'string') {
                setNameImg(values.profile_picture.slice(31));
            }
        }
    };

    const getImg = (): string => {
        if (previewImg && previewImg !== null && typeof previewImg === 'string') {
            return previewImg;
        }

        return URL.createObjectURL(previewImg);
    };

    const convertImgBase64 = (file: FileList, calback: (reader: any) => void) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            calback(reader.result);
        };
        reader.readAsDataURL(file[0]);
    };

    const getLabelImage = () => {
        const labelImage = nameImg && nameImg !== null ? nameImg : 'Selecione um arquivo';
        return labelImage;
    };

    const saveUser = () => {
        return;
    };

    return (
        <ContainerNavbar>
            <Dialog
                draggable={false}
                header="Perfil"
                visible={visibleModalProfile}
                style={{ width: '50vw' }}
                onHide={() => {
                    setVisibleModalProfile(false);
                    setPreviewImg(null);
                    setNameImg(null);
                }}
                footer={() => {
                    return (
                        <>
                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button
                                    style={{ width: '8rem' }}
                                    form="formUserSystem"
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                >
                                    {loading ? <CircularProgress color={'primary'} size={'2rem'} /> : 'Salvar'}
                                </Button>
                            </div>
                        </>
                    );
                }}
            >
                <ContainerForm id="formUserSystem" onSubmit={handleSubmit(saveUser)}>
                    <ContainerFieldsForm>
                        <ContainerFields className="campos">
                            <InputLabel> Nome completo </InputLabel>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                </span>
                                <InputText
                                    {...register('full_name', { required: true })}
                                    placeholder="Nome Completo"
                                    className={errors.full_name ? 'p-invalid' : ''}
                                />
                            </div>
                            {errors.full_name && <p>Este campo é obrigatório</p>}
                        </ContainerFields>

                        <ContainerFields className="campos">
                            <InputLabel> Email </InputLabel>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'circle-user' })} />
                                </span>
                                <InputText
                                    {...register('email', { validate: isValidEmail })}
                                    placeholder="Email"
                                    className={errors.email ? 'p-invalid' : ''}
                                />
                            </div>
                            {errors.email && <p> Preencha o campo corretamente </p>}
                        </ContainerFields>

                        <ContainerFields className="campos">
                            <InputLabel> Senha </InputLabel>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'lock' })} />
                                </span>

                                <InputText
                                    type="password"
                                    {...register('password', { required: watch('id') ? false : true })}
                                    placeholder="Senha"
                                    className={errors.password ? 'p-invalid' : ''}
                                />
                            </div>
                            {errors.password && <p>Este campo é obrigatório</p>}
                        </ContainerFields>
                    </ContainerFieldsForm>

                    <ContainerFieldsForm>
                        <ContainerFields>
                            <InputLabel> Foto de perfil </InputLabel>
                            <ContainerInputFile className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'image' })} />
                                </span>
                                <label htmlFor="file" className={errors.profile_picture ? 'p-invalid' : ''}>
                                    {getLabelImage()}
                                </label>
                                <InputText
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    {...register('profile_picture')}
                                    placeholder="Imagem Perfil"
                                    {...register('profile_picture', { required: false })}
                                    onChange={(e) => {
                                        if (e && e.target && e.target.files && e.target.files?.length > 0) {
                                            setPreviewImg(e.target.files[0]);
                                            setNameImg(e.target.files[0].name);
                                            convertImgBase64(e.target.files, (reader) => {
                                                setValue('profile_picture', reader);
                                            });
                                        }
                                    }}
                                />
                            </ContainerInputFile>
                            {errors.profile_picture && <p>Este campo é obrigatório</p>}
                        </ContainerFields>
                        <ContainerFields>
                            {previewImg && (
                                <ContainerPreviewImg>
                                    <img src={getImg()} />
                                    <div
                                        onClick={() => {
                                            setPreviewImg(null);
                                            setNameImg(null);
                                            setValue('profile_picture', '');
                                        }}
                                    >
                                        <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
                                    </div>
                                </ContainerPreviewImg>
                            )}
                        </ContainerFields>
                    </ContainerFieldsForm>
                </ContainerForm>
            </Dialog>
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
                        <MenuItem onClick={() => setVisibleModalProfile(true)}>Perfil</MenuItem>
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
