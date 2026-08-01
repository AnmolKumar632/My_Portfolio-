import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar'

vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <nav {...filterDomProps(props)}>{children}</nav>,
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <a {...filterDomProps(props)}>{children}</a>,
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...filterDomProps(props)}>{children}</div>,
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...filterDomProps(props)}>{children}</button>,
    li: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <li {...filterDomProps(props)}>{children}</li>,
    ul: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <ul {...filterDomProps(props)}>{children}</ul>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useInView: () => true,
}))

function filterDomProps(props: Record<string, unknown>) {
  const dom: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(props)) {
    if (k === 'children' || k === 'initial' || k === 'animate' || k === 'exit' || k === 'transition' || k === 'whileHover' || k === 'whileTap' || k === 'layoutId' || k === 'style' || k === 'variants' || k === 'onUpdate' || k === 'onAnimationStart') continue
    if (k.startsWith('on') && typeof v === 'function') dom[k] = v
    else if (k === 'className' || k === 'href' || k === 'target' || k === 'rel' || k === 'type' || k === 'id' || k === 'aria-label') dom[k] = v
  }
  return dom
}

describe('Navbar', () => {
  it('renders brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has correct nav link hrefs', () => {
    render(<Navbar />)
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '#home')
    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '#about')
    const projectsLink = screen.getByText('Projects').closest('a')
    expect(projectsLink).toHaveAttribute('href', '#projects')
  })

  it('renders mobile menu button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
