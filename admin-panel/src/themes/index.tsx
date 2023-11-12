import { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Palette from './palette.js';
import Typography from './typography.js';
import CustomShadows from './shadows.js';
import componentsOverride from './overrides/index.js';
import { ThemeOptions } from '@mui/material/styles/createTheme';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

type Props = { children: ReactNode };

export default function ThemeCustomization({ children }: Props) {
    const theme = Palette('light');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const themeTypography = Typography(`'Public Sans', sans-serif`);
    const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536,
                },
            },
            direction: 'ltr',
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
            },
            palette: theme.palette,
            customShadows: themeCustomShadows,
            typography: themeTypography,
        }),
        [theme, themeTypography, themeCustomShadows]
    );

    const themes = createTheme(themeOptions);
    themes.components = componentsOverride(themes);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
