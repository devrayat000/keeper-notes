import { createTheme } from '@mui/material/styles'
import { yellow } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: yellow,
  },
  typography: {
    fontFamily: ['Poppins', createTheme().typography.fontFamily].join(', '),
  },
})
