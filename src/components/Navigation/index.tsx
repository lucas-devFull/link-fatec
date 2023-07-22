import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import {
    NavWrapper,
    NavHeader,
    Content,
    ListItem,
    FirstLevelText,
    Text,
    SecondLevel,
    SecondLevelItem,
    SecondLevelBack,
    SecondLevelTopbar,
    SecondLevelWrapper,
    ContainerLogo,
    ContainerLevelItem,
    HrStyled,
} from './styles';
import { SPACING_INLINE_08 } from '../../utils/stylesGlobals';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Logo from '../Avatar';
import { dataUser, useAuth } from '../../contexts/auth';
import { Avatar } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import logoFatec from '../../assets/images/logoFatec.png';
import { Badge, Box, Button, CircularProgress, IconButton, InputLabel, Menu, MenuItem, Tooltip } from '@mui/material';
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
import { isValidEmail } from '../../utils';
import axios from '../../services/Api';
import { ReactNotifications, Store } from 'react-notifications-component';
import './index.css';

export interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    callback: () => void;
    children: Array<any>;
    IconMenu: any;
    label: string;
}

type propsFieldsProfile = {
    id?: number;
    full_name: string;
    name: string;
    email: string;
    password?: string;
    profile_picture: any | null;
};

type Props = {
    Icon: React.FC;
    nameUser?: string;
    items: Array<NavigationItemProps>;
};

const AnimatedSecondLevel = animated(SecondLevel);

const Navigation: React.FC<Props> = ({ items, nameUser = 'Lucas Conceição', Icon }) => {
    const { user, setUser } = useAuth();
    const [secondLevelIndex, setLevelIndex] = useState(-1);
    const [activeItem, setActiveItem] = useState<number>(0);

    const transitions = useTransition(secondLevelIndex >= 0, {
        from: { opacity: 0, left: '208px' },
        enter: { opacity: 1, left: SPACING_INLINE_08 },
        leave: { opacity: 0, left: '208px' },
        config: {
            duration: 400,
        },
    });

    const [visibleModalProfile, setVisibleModalProfile] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<propsFieldsProfile>();
    const [previewImg, setPreviewImg] = useState<any | null>(null);
    const [nameImg, setNameImg] = useState<string | null>(null);

    const getProfile = () => {
        axios
            .get('/v1/web/profile')
            .then((response) => {
                setFields(response.data);
            })
            .catch((error) => {
                setFields(null);
            });
    };

    const setFields = (values: propsFieldsProfile | null) => {
        if (values == null) {
            reset();
        } else {
            setValue('id', user?.id);
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

    const saveProfile = () => {
        const formData = watch();

        if (!formData.password) {
            delete formData.password;
        }

        setLoading(true);
        axios
            .put(`v1/web/profile`, formData)
            .then((response) => {
                if (response.status == 200) {
                    Store.addNotification({
                        message: 'Perfil atualizado com sucesso !!',
                        type: 'success',
                        insert: 'top',
                        container: 'top-center',
                        width: 350,
                        dismiss: {
                            duration: 1000,
                            onScreen: true,
                        },
                        onRemoval: () => {
                            if (response.data && response.data.id && response.data.name) {
                                setUser({
                                    ...(user !== null ? user : ({} as dataUser)),
                                    profile_picture: response.data.profile_picture,
                                    name: response.data.name,
                                });

                                const storagedToken = localStorage.getItem('token');
                                if (storagedToken) {
                                    try {
                                        const storage = JSON.parse(storagedToken);
                                        const data = storage.data;
                                        data.name = response.data.name;
                                        data.profile_picture = response.data.profile_picture;
                                        localStorage.setItem(
                                            'token',
                                            JSON.stringify({ token: storage.token, data: data }),
                                        );
                                    } catch (error) {}
                                }
                            }

                            setLoading(false);
                            setVisibleModalProfile(false);
                            setPreviewImg(null);
                            setNameImg(null);
                            reset();
                        },
                    });
                    setLoading(false);
                }
            })
            .catch((err) => {
                Store.addNotification({
                    message: 'Erro ao atualizar o perfil, tente novamente !!',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-center',
                    width: 350,
                    dismiss: {
                        duration: 1000,
                        onScreen: true,
                    },
                    onRemoval: () => {
                        setLoading(false);
                        setPreviewImg(null);
                        setNameImg(null);
                        reset();
                    },
                });
                setLoading(false);
            });
    };

    return (
        <NavWrapper
            onMouseLeave={() => {
                setLevelIndex(-1);
                setActiveItem(0);
            }}
        >
            <Dialog
                draggable={false}
                header="Perfil"
                baseZIndex={99999}
                visible={visibleModalProfile}
                style={{ width: '50vw' }}
                onShow={() => {
                    getProfile();
                }}
                onHide={() => {
                    setVisibleModalProfile(false);
                    setPreviewImg(null);
                    setNameImg(null);
                    reset();
                }}
                footer={() => {
                    return (
                        <>
                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button
                                    style={{ width: '8rem' }}
                                    form="formProfileSystem"
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
                <ContainerForm id="formProfileSystem" onSubmit={handleSubmit(saveProfile)}>
                    <ReactNotifications className="notificacao" />
                    <ContainerFieldsForm>
                        <ContainerFields className="campos">
                            <InputLabel> Nome completo </InputLabel>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <FontAwesomeIcon icon={icon({ name: 'pen-to-square' })} />
                                </span>
                                <InputText
                                    autoFocus={true}
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
            <NavHeader>
                <ContainerLogo>
                    <Logo
                        click={() => {
                            setVisibleModalProfile(true);
                        }}
                    ></Logo>
                    {/* <FontAwesomeIcon size="2x" icon={icon({ name: 'circle-user' })} /> */}
                    {/* <Avatar
                        src={logoFatec}
                        sx={{
                            backgroundColor: '#F0F0F0',
                            padding: '0.5rem',
                            width: 45,
                            height: 45,
                            margin: '0rem 2rem 0rem 0.3rem',
                        }}
                    ></Avatar> */}
                </ContainerLogo>
                <div
                    style={{ width: 'max-content', display: 'flex', justifyContent: 'space-around', margin: '0 .5rem' }}
                    // onClick={() => navigate('/perfil')}
                >
                    {nameUser}
                </div>
            </NavHeader>

            <HrStyled />
            <Content>
                <Content>
                    {items?.map(({ IconMenu, label, callback, children }, index) => {
                        return (
                            <ListItem
                                key={index}
                                onClick={() => {
                                    if (children.length > 0) {
                                        setLevelIndex(index);
                                    }

                                    if (!(children.length > 0)) {
                                        setLevelIndex(-1);
                                    }

                                    callback();
                                    setActiveItem(index);
                                }}
                                active={secondLevelIndex === index || activeItem === index}
                            >
                                <div>{IconMenu}</div>
                                <FirstLevelText size="sm">{label}</FirstLevelText>
                            </ListItem>
                        );
                    })}
                </Content>
                {transitions(
                    (styles, item) =>
                        item && (
                            <SecondLevelWrapper>
                                <AnimatedSecondLevel style={styles}>
                                    <SecondLevelTopbar
                                        size="md"
                                        onClick={() => {
                                            setLevelIndex(-1);
                                            setActiveItem(0);
                                        }}
                                    >
                                        <SecondLevelBack />
                                        {items[secondLevelIndex]?.label}
                                    </SecondLevelTopbar>
                                    <ContainerLevelItem>
                                        {secondLevelIndex >= 0 &&
                                            items[secondLevelIndex].children.map(({ label, callback }, index) => (
                                                <SecondLevelItem key={index} onClick={() => callback()}>
                                                    <Text size="sm">{label}</Text>
                                                </SecondLevelItem>
                                            ))}
                                    </ContainerLevelItem>
                                </AnimatedSecondLevel>
                            </SecondLevelWrapper>
                        ),
                )}
            </Content>
        </NavWrapper>
    );
};

export default Navigation;
