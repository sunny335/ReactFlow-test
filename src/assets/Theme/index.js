
import { createTheme } from '@mui/material/styles';
// Warning: #ff924f
//#6200EE;
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#0F1219',
        },
        secondary: {
            main: '#02589b'
        },
        success: {
            main: '#4c7a34'
        },
        error: {
            main: '#840705'
        },
        info: {
            main: "#9013FE"
        },
        myColor: {
            main: '#ffe'
        }
    },
    typography: {
        button: {
            textTransform: "none"
        }
    },
    breakpoints: {
        values: {
            xs: 300,
            sm: 600,
            md: 960,
            mdx: 1100,
            lg: 1280,
            llg: 1440,
            xlx: 1640,
            xl: 1920
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                },
            },
        },
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        }
    },

});
export default theme;
