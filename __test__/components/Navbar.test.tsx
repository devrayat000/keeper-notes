import { render, screen } from '@testing-library/react'
import Navbar from '../../src/components/Navbar'

describe('Navbar', () => {
  it('should render the heading', async () => {
    render(<Navbar />)

    expect(await screen.findByTestId('heading')).toBeInTheDocument()
  })

  it('should have the title correctly', async () => {
    render(<Navbar />)

    expect(await screen.findByTestId('heading')).toHaveTextContent('Keeper')
  })
})
