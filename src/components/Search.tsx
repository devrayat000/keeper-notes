import { styled, alpha, InputBase } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { SubmitHandler, useForm } from 'react-hook-form'

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.65),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}))

const SearchBar = ({
  onSearch,
}: {
  onSearch: SubmitHandler<{ search: string }>
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{
            'aria-label': 'search',
            role: 'search',
          }}
          {...register('search')}
        />
      </Search>
    </form>
  )
}

export default SearchBar
