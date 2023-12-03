import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    Paper,
    Popper,
} from '@mui/material';
import MainCard from 'src/components/mainCard';
import Transitions from 'src/components/@extended/Transitions';
import { CloseOutlined } from '@ant-design/icons';
import { ProjectTheme } from 'src/themes';
import { useGetLocale, useSetLocale } from '@refinedev/core';

const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem',
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none',
};

const LanguagePicker = () => {
    const theme = useTheme<ProjectTheme>();

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';
    const changeLanguage = useSetLocale();

    const locale = useGetLocale();

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {locale() === 'pl' ? (
                    <img width={20} src="/pl.png" alt="pl" />
                ) : (
                    <img width={20} src="/uk.png" alt="uk" />
                )}
            </IconButton>
            <Popper
                placement={'bottom'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [-5, 9],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.customShadows.z1,
                                width: '100%',
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285,
                                },
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton size="small" onClick={handleToggle}>
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List>
                                        <ListItemButton
                                            onClick={() => {
                                                handleToggle();
                                                changeLanguage('en');
                                            }}
                                        >
                                            <img width={20} src="/uk.png" alt="en" />
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton
                                            onClick={() => {
                                                handleToggle();
                                                changeLanguage('pl');
                                            }}
                                        >
                                            <img width={20} src="/pl.png" alt="pl" />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default LanguagePicker;
