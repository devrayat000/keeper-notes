import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../../src/components/Search'

const search = jest.fn()

describe('Search', () => {
  it('should render searchbox', async () => {
    render(<SearchBar onSearch={search} />)

    expect(await screen.findByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('should searchbox be enabled', async () => {
    render(<SearchBar onSearch={search} />)

    expect(await screen.findByPlaceholderText(/search/i)).toBeEnabled()
  })

  it('should searchbox be enabled', async () => {
    render(<SearchBar onSearch={search} />)
    const searchEl = await screen.findByRole('search')

    expect(searchEl).toHaveValue('')

    userEvent.type(searchEl, 'note1')

    expect(searchEl).toHaveValue('note1')
  })

  it('should render cancel button when something is written', async () => {
    render(<SearchBar onSearch={search} />)
    const clearBtnEl = await screen.findByTestId('cancel-button')

    expect(clearBtnEl).toBeInTheDocument()
    expect(clearBtnEl).not.toBeVisible()

    userEvent.type(await screen.findByRole('search'), 'note1')
    expect(clearBtnEl).toBeVisible()
  })

  it('should clear the text if cancel button is clicked', async () => {
    render(<SearchBar onSearch={search} />)
    const searchEl = await screen.findByRole('search')

    expect(searchEl).toHaveValue('')

    userEvent.type(searchEl, 'note1')
    expect(searchEl).toHaveValue('note1')

    await waitFor(() => {
      screen.getByRole('button')
    })

    userEvent.click(screen.getByRole('button'))
    expect(searchEl).toHaveValue('')
  })
})
