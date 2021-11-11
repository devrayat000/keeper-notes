import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import SearchBar from './Search'
import PrimaryMenu from './PrimaryMenu'
import { Box } from '@mui/system'

const Navbar = () => {
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
        <SearchBar />
        <Box sx={{ flexGrow: 1 }} />
        <PrimaryMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
