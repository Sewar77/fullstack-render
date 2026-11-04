import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
    // 1. Color Schemes (CSS Variables approach)
    colorSchemes: {
        light: {
            primary: {
                main: "#1976d2",
                light: "#42a5f5",
                dark: "#1565c0",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#9c27b0",
                light: "#ba68c8",
                dark: "#7b1fa2",
                contrastText: "#ffffff",
            },
            error: {
                main: "#d32f2f",
                light: "#ef5350",
                dark: "#c62828",
            },
            warning: {
                main: "#ed6c02",
                light: "#ff9800",
                dark: "#e65100",
            },
            info: {
                main: "#0288d1",
                light: "#03a9f4",
                dark: "#01579b",
            },
            success: {
                main: "#2e7d32",
                light: "#4caf50",
                dark: "#1b5e20",
            },
            text: {
                primary: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.6)",
                disabled: "rgba(0, 0, 0, 0.38)",
            },
            background: {
                default: "#f5f5f5",
                paper: "#ffffff",
            },
            divider: "rgba(0, 0, 0, 0.12)",
        },
        dark: {
            primary: {
                main: "#90caf9",
                light: "#e3f2fd",
                dark: "#42a5f5",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            secondary: {
                main: "#ce93d8",
                light: "#f3e5f5",
                dark: "#ab47bc",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            error: {
                main: "#f44336",
                light: "#e57373",
                dark: "#d32f2f",
            },
            warning: {
                main: "#ffa726",
                light: "#ffb74d",
                dark: "#f57c00",
            },
            info: {
                main: "#29b6f6",
                alight: "#4fc3f7",
                dark: "#0288d1",
            },
            success: {
                main: "#66bb6a",
                light: "#81c784",
                dark: "#388e3c",
            },
            text: {
                primary: "#ffffff",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)",
            },
            background: {
                default: "#121212",
                paper: "#1e1e1e",
            },
            divider: "rgba(255, 255, 255, 0.12)",
        },
    },

    // 2. Typography
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        htmlFontSize: 16,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: "2.5rem",
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: "-0.01562em",
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.00833em",
        },
        h3: {
            fontSize: "1.75rem",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "0em",
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: "0.00735em",
        },
        h5: {
            fontSize: "1.25rem",
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: "0em",
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: "0.0075em",
        },
        subtitle1: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "0.00938em",
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1.57,
            letterSpacing: "0.00714em",
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
        },
        body2: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.43,
            letterSpacing: "0.01071em",
        },
        button: {
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.02857em",
            textTransform: "none",
        },
        caption: {
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 1.66,
            letterSpacing: "0.03333em",
        },
        overline: {
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 2.66,
            letterSpacing: "0.08333em",
            textTransform: "uppercase",
        },
    },

    // 3. Layout, Spacing, and Breakpoints
    spacing: 4,
    shape: {
        borderRadius: 8,
    },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },

    // 4. Component Overrides
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                body: {
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": { width: "8px", height: "8px" },
                    "&::-webkit-scrollbar-thumb": {
                        // Use MUI CSS variable tokens directly for cross-theme resilience
                        backgroundColor: "var(--mui-palette-divider)",
                        borderRadius: "4px",
                    },
                },
            }),
        },
        MuiButton: {
            defaultProps: { disableElevation: true, size: "medium" },
            styleOverrides: {
                root: { borderRadius: 6, fontWeight: 600, padding: "6px 16px" },
                containedPrimary: { "&:hover": { boxShadow: "none" } },
            },
        },
        MuiPaper: {
            defaultProps: { elevation: 1 },
            styleOverrides: {
                root: { backgroundImage: "none" },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: 12, overflow: "hidden" },
            },
        },
        MuiTextField: {
            defaultProps: { variant: "outlined", size: "medium", fullWidth: true },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: { borderRadius: 8 },
            },
        },
        MuiMenu: {
            defaultProps: { transitionDuration: 150 },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: { fontSize: "0.875rem" },
            },
        },
        MuiTableHead: {
            styleOverrides: (theme) => ({
                root: {
                    // Leverages theme.vars selector tokens natively generated by colorSchemes
                    backgroundColor: "var(--mui-palette-background-default)",
                    "& .MuiTableCell-head": { fontWeight: 700 },
                },
            }),
        },
        MuiChip: {
            defaultProps: { size: "small" },
            styleOverrides: {
                root: { fontWeight: 500 },
            },
        },
        MuiTooltip: {
            defaultProps: { arrow: true },
            styleOverrides: {
                tooltip: { backgroundColor: "#222222", fontSize: "0.75rem" },
            },
        },
    },
});
