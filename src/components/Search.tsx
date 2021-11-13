import { useEffect, useState } from 'react'
import { styled, alpha, InputBase, IconButton, Zoom } from '@mui/material'
import {
  Search as SearchIcon,
  ClearRounded as ClearIcon,
} from '@mui/icons-material'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { SxProps } from '@mui/system'

export const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  transition: theme.transitions.create('background-color', {
    duration: 0.2,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.075),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height: '3rem',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}))

export const Form = styled('form')(s => ({}))

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, sx }) => {
  const { register, handleSubmit, watch, resetField, setFocus } = useForm({
    defaultValues: {
      search: '',
    },
  })
  const [cancelButtonState, setCancelButtonState] = useState(false)

  useEffect(() => {
    const subscription = watch((value, _) => {
      if (value.search && value.search.length > 0 && !cancelButtonState) {
        setCancelButtonState(true)
      }
      if (!value.search && cancelButtonState) {
        setCancelButtonState(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, cancelButtonState])

  return (
    <Form onSubmit={handleSubmit(onSearch)}>
      <Search {...{ sx }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{
            'aria-label': 'search',
            role: 'search',
            ...register('search'),
          }}
        />
        <Zoom in={cancelButtonState}>
          <IconButton
            style={{ pointerEvents: 'initial' }}
            sx={{ px: 2 }}
            type="reset"
            onClick={e => {
              e.preventDefault()
              resetField('search')
              setFocus('search')
            }}
            data-testid="cancel-button"
          >
            <ClearIcon />
          </IconButton>
        </Zoom>
      </Search>
    </Form>
  )
}

export default SearchBar

export interface SearchBarProps {
  onSearch: SubmitHandler<{ search: string }>
  sx?: SxProps
}
