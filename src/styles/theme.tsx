import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
          default: '#f0f0f0', // Custom background color
      },
    },
    components: {
      MuiButton: {
          styleOverrides: {
              root: {
                  '&:focus': { outline: 'none' },
                  '&:focus-visible': { outline: 'none' },
              },
          },
      },
      MuiIconButton: {
          styleOverrides: {
              root: {
                  '&:focus': { outline: 'none' },
                  '&:focus-visible': { outline: 'none' },
              },
          },
      },
    },
});