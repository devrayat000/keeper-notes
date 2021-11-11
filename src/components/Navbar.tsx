import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import {
  AccountCircle,
  GridViewOutlined,
  ViewAgendaOutlined,
  LightMode,
  DarkMode,
  Menu,
  Search as SearchIcon,
} from '@mui/icons-material'
import Search, { SearchIconWrapper, StyledInputBase } from './Search'
import { Box } from '@mui/system'
import useToggle from '../hooks/useToggle'

const Navbar = () => {
  const [view, toggleView] = useToggle()
  const [mode, toggleMode] = useToggle()

  return (
    <AppBar color="primary" position="sticky" sx={{ paddingX: '2rem' }}>
      <Toolbar sx={{ gap: '1rem' }}>
        <IconButton>
          <Menu fontSize="medium" sx={{ color: '#fff' }} />
        </IconButton>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="white"
          data-testid="heading"
        >
          Keeper
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          justifyContent="space-between"
          gap="0.5rem"
          display="flex"
          fontWeight={700}
        >
          <IconButton
            onClick={e => {
              toggleMode()
            }}
          >
            {mode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton
            onClick={e => {
              toggleView()
            }}
          >
            {view ? <GridViewOutlined /> : <ViewAgendaOutlined />}
          </IconButton>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
