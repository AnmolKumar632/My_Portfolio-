import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '../components/About'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...filterDomProps(props)}>{children}</div>,
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h2 {...filterDomProps(props)}>{children}</h2>,
    h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h3 {...filterDomProps(props)}>{children}</h3>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...filterDomProps(props)}>{children}</p>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...filterDomProps(props)}>{children}</span>,
  },
  useInView: () => true,
}))

vi.mock('../components/AnimatedCounter', () => ({
  default: ({ target, suffix }: { target: number; suffix: string }) => (
    <span data-testid="counter">{target}{suffix}</span>
  ),
}))

function filterDomProps(props: Record<string, unknown>) {
  const dom: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(props)) {
    if (['children', 'initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'style', 'variants'].includes(k)) continue
    if (k.startsWith('on') && typeof v === 'function') dom[k] = v
    else if (['className', 'href', 'target', 'rel', 'type', 'id'].includes(k)) dom[k] = v
  }
  return dom
}

describe('About', () => {
  it('renders section title', () => {
    render(<About />)
    expect(screen.getByText(/Turning/)).toBeInTheDocument()
    expect(screen.getByText(/Into Decisions/)).toBeInTheDocument()
  })

  it('renders profile image', () => {
    render(<About />)
    const img = screen.getByAltText('Anmol Kumar')
    expect(img).toHaveAttribute('src', '/profile.jpg')
  })

  it('renders bio text', () => {
    render(<About />)
    expect(screen.getByText(/currently pursuing my/)).toBeInTheDocument()
  })

  it('renders info cards', () => {
    render(<About />)
    expect(screen.getByText('AI & ML')).toBeInTheDocument()
    expect(screen.getByText('Data Science')).toBeInTheDocument()
    expect(screen.getByText('Bangalore')).toBeInTheDocument()
    expect(screen.getByText('B.Tech (Data Science)')).toBeInTheDocument()
  })

  it('renders stat counters', () => {
    render(<About />)
    const counters = screen.getAllByTestId('counter')
    expect(counters).toHaveLength(4)
  })

  it('does not render My Journey section', () => {
    render(<About />)
    expect(screen.queryByText('My Journey')).not.toBeInTheDocument()
    expect(screen.queryByText('AI Engineer')).not.toBeInTheDocument()
    expect(screen.queryByText('Data Analyst')).not.toBeInTheDocument()
  })
})
