import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const defaultTheme = createTheme()
const { breakpoints, typography: { pxToRem } } = defaultTheme

let theme = createTheme({

    overrides: {
        MuiToggleButton: {
            root: {
                backgroundColor: "#FFFFFF",
                borderRadius: "2px",
                "&:hover": {
                    backgroundColor: "#FFFFFF"
                },
                height: '6vh',
                width: '10vh',
                "&$selected": {
                    backgroundColor: "white",
                    border: "0.5px solid #0076BF",
                    "&:hover": {
                        backgroundColor: "white"
                    }
                },
                [breakpoints.down("xs")]: {
                    height: "10vh",
                    width: "12vh"
                },
                [breakpoints.down("md")]: {
                    height: "70px",
                    width: "90px"
                },
                "&$disabled": {
                    opacity: '0.6'

                }
            }
        },
        MuiTabs: {
            root: {
                borderBottom: '1px solid #e8e8e8',
                width: '100%'
            },
        },
        MuiTab: {
            root: {
                minWidth: '72px !important',
                marginRight: defaultTheme.spacing(3),
                textTransform: 'none',
            }
        },
        MuiOutlinedInput: {
            input: {
                backgroundColor: 'white'
            },
            adornedEnd: {
                backgroundColor: 'white'
            }
        },
        MuiInputBase: {
            root: {
                "&$disabled": {
                    backgroundColor: '#FDEBE3'
                }
            },
            input: {
                "&$disabled": {
                    backgroundColor: '#FDEBE3'
                }
            }
        },
        MuiAlert: {
            filledInfo: {
                backgroundColor: '#1781c3'
            }
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
            'Public Sans',
            'serif',
        ].join(','),

        h6: {
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 1,
            color: "#58595b",
            [breakpoints.down("xs")]: {
                fontSize: 10
            }
        },

        h5: {
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 1,
            [breakpoints.down("xs")]: {
                fontSize: 12
            }
        },

        h4: {
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            [breakpoints.down("xs")]: {
                fontSize: 14
            }
        },

        h3: {
            fontSize: 25,
            color: "#0076bf",
            letterSpacing: 2,
            fontWeight: 600,
            textAlign: 'center',
            [breakpoints.down("xs")]: {
                fontSize: 19
            }
        },
        h2: {
            fontSize: 30,
            letterSpacing: 2,
            fontWeight: 600,
            textAlign: 'center',
            [breakpoints.down("xs")]: {
                fontSize: 24
            }
        },

        subtitle1: {
            fontSize: 17,
            letterSpacing: 1,
            color: '#58595b',
            [breakpoints.down("xs")]: {
                fontSize: 13
            }
        },

        subtitle2: {
            fontSize: 12,
            letterSpacing: 1,
            color: "#FFFFFF",
            [breakpoints.down("xs")]: {
                fontSize: 8
            }
        },

        body2: {
            fontSize: 14,
            fonotColor: '#58595B',
            [breakpoints.down("xs")]: {
                fontSize: 10
            }
        },

        body1: {
            // color: '#1781c3'
        },

        button: {
            fontSize: 17,
            letterSpacing: 1,
            color: "#FFFFFF",
            textTransform: "capitalize",
            [breakpoints.down("xs")]: {
                fontSize: 13
            }
        },
        caption: {
            fontSize: 10,
            letterSpacing: 1.5,
            color: "#f4f4f4",
            [breakpoints.down("xs")]: {
                fontSize: 8
            }
        },
    },

    palette: {
        primary: {
            main: '#0076bf',
        },
    },
});

theme = responsiveFontSizes(theme)

export default theme
