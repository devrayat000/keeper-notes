import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import SearchBar from './Search'
import PrimaryMenu from './PrimaryMenu'
import { Box } from '@mui/system'
import Image from 'next/image'

const Navbar = () => {
  return (
    <AppBar color="transparent" position="sticky" sx={{ px: '2rem' }}>
      <Toolbar sx={{ gap: '1rem' }}>
        <IconButton>
          <Menu fontSize="medium" sx={{ color: '#fff' }} />
        </IconButton>
        <Image
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt="Brand Logo"
          height={40}
          width={40}
        />
        <Typography
          variant="h5"
          align="center"
          fontWeight="400"
          color="GrayText"
          data-testid="heading"
        >
          Keeper
        </Typography>
        <SearchBar sx={{ flexGrow: 1 }} onSearch={s => {}} />
        <PrimaryMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
