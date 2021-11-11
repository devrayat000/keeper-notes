import { render, screen } from '@testing-library/react'
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

    userEvent.type(await screen.findByRole('search'), 'note1')

    expect(await screen.findByRole('search')).toHaveValue('note1')
  })
})
