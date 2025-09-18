import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer component', () => {
  it('renders footer text', () => {
    render(<Footer />)
    const footerText = screen.getByText(/Engineering Faculty Hostel Management/i)
    expect(footerText).toBeInTheDocument()
  })
})