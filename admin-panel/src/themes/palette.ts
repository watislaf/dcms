// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from 'src/themes/theme';
import { PaletteMode } from '@mui/material';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode: PaletteMode) => {
    const colors = presetPalettes;

    const greyPrimary = [
        '#ffffff',
        '#F3F6F9',
        '#E5EAF2',
        '#DAE2ED',
        '#C7D0DD',
        '#B0B8C4',
        '#9DA8B7',
        '#6B7A90',
        '#434D5B',
        '#303740',
        '#1C2025',
    ];

    const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];

    const greyConstant = ['#fafafb', '#e6ebf1'];

    colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

    const paletteColor = ThemeOption(colors);

    return createTheme({
        palette: {
            mode,
            common: {
                black: '#000',
                white: '#fff',
            },
            ...paletteColor,
            text: {
                primary: paletteColor.grey[700],
                secondary: paletteColor.grey[500],
                disabled: paletteColor.grey[400],
            },
            action: {
                disabled: paletteColor.grey[300],
            },
            divider: paletteColor.grey[200],
            background: {
                paper: paletteColor.grey[0],
                default: paletteColor.grey.A50,
            },
        },
    });
};

export default Palette;
