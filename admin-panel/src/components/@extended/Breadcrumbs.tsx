import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, Typography } from '@mui/material';
import MainCard from 'src/components/mainCard';
import menuItems from 'src/pages/pages-list';

type Props = {
    title: boolean;
};

const Breadcrumbs = ({ title, ...others }: Props) => {
    const location = useLocation();
    const [item, setItem] = useState();

    // set active item state
    const getCollapse = (menu) => {
        if (menu.children) {
            menu.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === 'item') {
                    if (location.pathname === collapse.url) {
                        setItem(collapse);
                    }
                }

                return false;
            });
        }
    };

    useEffect(() => {
        menuItems?.items?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                getCollapse(menu);
            }

            return false;
        });
    });
    // items
    if (item && item.type === 'item') {
        return (
            <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid item>
                        <MuiBreadcrumbs aria-label="breadcrumb">
                            <Typography
                                component={Link}
                                to="/"
                                color="textSecondary"
                                variant="h6"
                                sx={{ textDecoration: 'none' }}
                            >
                                Home
                            </Typography>
                            <Typography variant="subtitle1" color="textPrimary">
                                {item.title}
                            </Typography>
                        </MuiBreadcrumbs>
                    </Grid>
                </Grid>
            </MainCard>
        );
    }

    return <></>;
};

export default Breadcrumbs;
