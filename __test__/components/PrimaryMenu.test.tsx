import { render, screen } from '@testing-library/react'
import PrimaryMenu from '../../src/components/PrimaryMenu'

describe('Navbar', () => {
  it('should render the menubar', async () => {
    render(<PrimaryMenu />)

    expect(await screen.findByRole('menubar')).toBeInTheDocument()
  })
  it('should have display: flex', async () => {
    render(<PrimaryMenu />)

    expect(await screen.findByRole('menubar')).toHaveStyle({
      display: 'flex',
    })
  })

  it('should have the theme mode button enabled', async () => {
    render(<PrimaryMenu />)

    expect(await screen.findByTestId('theme-mode')).toBeEnabled()
  })

  it('should have the theme mode button enabled', async () => {
    render(<PrimaryMenu />)

    expect(await screen.findByTestId('view-mode')).toBeEnabled()
  })

  it('should have the theme mode button enabled', async () => {
    render(<PrimaryMenu />)

    expect(await screen.findByTestId('account')).toBeEnabled()
  })
})
