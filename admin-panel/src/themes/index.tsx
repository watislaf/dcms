import { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Palette from './palette.js';
import Typography from './typography.js';
import CustomShadows from './shadows.js';
import componentsOverride from './overrides/index.js';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

type Props = { children: ReactNode };

const useOptions = () => {
    const theme = Palette('light');

    const themeTypography = Typography(`'Public Sans', sans-serif`);
    const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

    return useMemo(
        () =>
            ({
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
            } as const),
        [theme, themeTypography, themeCustomShadows]
    );
};

const useCreateTheme = () => {
    const options = useOptions();

    const themes = createTheme(options);
    themes.components = componentsOverride(themes);

    return themes;
};

export type ProjectTheme = ReturnType<typeof useCreateTheme> & ReturnType<typeof useOptions>;

export default function ThemeCustomization({ children }: Props) {
    const theme = useCreateTheme();

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
