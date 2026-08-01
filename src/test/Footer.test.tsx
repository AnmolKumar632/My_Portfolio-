import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
}))

vi.mock('../components/Icons', () => ({
  GithubIcon: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="github-icon" {...props} />,
  LinkedinIcon: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="linkedin-icon" {...props} />,
}))

describe('Footer', () => {
  it('renders copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<Footer />)
    expect(screen.getByText(/Anmol Kumar/)).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Footer />)
    const githubLink = screen.getByTestId('github-icon').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AnmolKumar632/AnmolKumar632/tree/main')
  })

  it('renders LinkedIn link', () => {
    render(<Footer />)
    const linkedinLink = screen.getByTestId('linkedin-icon').closest('a')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/anmol-kumar-b709762b7')
  })

  it('renders social links with target blank', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })
})
