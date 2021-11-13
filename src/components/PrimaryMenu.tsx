import { useRef } from 'react'
import IconButton from '@mui/material/IconButton'
import {
  AccountCircle,
  GridViewOutlined,
  ViewAgendaOutlined,
  LightMode,
  DarkMode,
} from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardHeader,
  Popover,
  Typography,
  Zoom,
} from '@mui/material'
import { Box } from '@mui/system'
import { SwitchTransition } from 'react-transition-group'

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
        onClick={_e => {
          toggleMode()
        }}
        data-testid="theme-mode"
      >
        <SwitchTransition mode="out-in">
          <Zoom
            key={mode ? 'light' : 'dark'}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false)
            }}
          >
            {mode ? <LightMode /> : <DarkMode />}
          </Zoom>
        </SwitchTransition>
      </IconButton>
      <IconButton
        onClick={_e => {
          toggleView()
        }}
        data-testid="view-mode"
      >
        <SwitchTransition mode="out-in">
          <Zoom
            key={view ? 'grid' : 'list'}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false)
            }}
          >
            {view ? <GridViewOutlined /> : <ViewAgendaOutlined />}
          </Zoom>
        </SwitchTransition>
      </IconButton>
      <AccountPopover />
    </Box>
  )
}

export default PrimaryMenu

export const AccountPopover = () => {
  const [popoverState, , setPopoverState] = useToggle()
  const accountPopoverButton = useRef<HTMLButtonElement>(null)

  return (
    <div>
      <IconButton
        component="button"
        ref={accountPopoverButton}
        onClick={() => {
          setPopoverState(true)
        }}
        aria-describedby="account"
        data-testid="account"
      >
        <AccountCircle />
      </IconButton>
      <Popover
        id="account"
        open={popoverState}
        anchorEl={accountPopoverButton.current}
        onClose={_e => {
          setPopoverState(false)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'azure' }} aria-label="recipe">
                R
              </Avatar>
            }
          />
        </Card>
      </Popover>
    </div>
  )
}
