import { forwardRef, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { DrawerIsOpenedContext } from 'src/pages/mainLayout/index';
import { NavigationItem } from 'src/pages/pages-list';
import { OpenItemOperationsContext } from 'src/pages/mainLayout/Drawer/DrawerContent/Navigation/index';

type Props = {
    item: NavigationItem;
    level: number;
};

const NavItem = ({ item, level }: Props) => {
    const theme = useTheme();
    const { pathname } = useLocation();

    const drawerOpen = useContext(DrawerIsOpenedContext);
    const { openedItem, setOpenItem } = useContext(OpenItemOperationsContext);
    let itemTarget = '_self';

    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => (
            <Link ref={ref} {...props} to={item.url} target={itemTarget} />
        )),
    };

    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const Icon = item.icon;
    const itemIcon = <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} />;

    const isSelected = openedItem === item.id;
    // active menu item on page load
    useEffect(() => {
        if (pathname.includes(item.url)) {
            setOpenItem(item.id);
        }
        // eslint-disable-next-line
    }, [pathname]);

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            onClick={() => setOpenItem(item.id)}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1.25 : 1,
                ...(drawerOpen && {
                    '&:hover': {
                        bgcolor: 'primary.lighter',
                    },
                    '&.Mui-selected': {
                        bgcolor: 'primary.lighter',
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: 'primary.lighter',
                        },
                    },
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: 'transparent',
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent',
                        },
                        bgcolor: 'transparent',
                    },
                }),
            }}
        >
            {itemIcon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter',
                            },
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                                bgcolor: 'primary.lighter',
                                '&:hover': {
                                    bgcolor: 'primary.lighter',
                                },
                            }),
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                            {item.title}
                        </Typography>
                    }
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
