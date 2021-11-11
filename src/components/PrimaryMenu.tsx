import IconButton from '@mui/material/IconButton'
import {
  AccountCircle,
  GridViewOutlined,
  ViewAgendaOutlined,
  LightMode,
  DarkMode,
} from '@mui/icons-material'
import { Box } from '@mui/system'
import useToggle from '../hooks/useToggle'

const PrimaryMenu = () => {
  const [view, toggleView] = useToggle()
  const [mode, toggleMode] = useToggle()

  return (
    <Box
      justifyContent="space-between"
      gap="0.5rem"
      display="flex"
      fontWeight={700}
      role="menubar"
    >
      <IconButton
        onClick={e => {
          toggleMode()
        }}
        data-testid="theme-mode"
      >
        {mode ? <LightMode /> : <DarkMode />}
      </IconButton>
      <IconButton
        onClick={e => {
          toggleView()
        }}
        data-testid="view-mode"
      >
        {view ? <GridViewOutlined /> : <ViewAgendaOutlined />}
      </IconButton>
      <IconButton data-testid="account">
        <AccountCircle />
      </IconButton>
    </Box>
  )
}

export default PrimaryMenu
