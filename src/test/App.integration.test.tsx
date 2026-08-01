import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...filterDomProps(props)}>{children}</div>,
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...filterDomProps(props)}>{children}</h1>,
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h2 {...filterDomProps(props)}>{children}</h2>,
    h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h3 {...filterDomProps(props)}>{children}</h3>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...filterDomProps(props)}>{children}</p>,
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <a {...filterDomProps(props)}>{children}</a>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...filterDomProps(props)}>{children}</span>,
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...filterDomProps(props)}>{children}</button>,
    li: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <li {...filterDomProps(props)}>{children}</li>,
    ul: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <ul {...filterDomProps(props)}>{children}</ul>,
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <nav {...filterDomProps(props)}>{children}</nav>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { scaleX: () => ({}) } }),
}))

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: React.PropsWithChildren) => <div data-testid="canvas">{children}</div>,
}))

vi.mock('@react-three/drei', () => ({
  Float: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

vi.mock('../components/ParticleField', () => ({
  default: () => <div data-testid="particle-field" />,
}))

vi.mock('../components/HeroObject', () => ({
  default: () => <div data-testid="hero-object" />,
}))

vi.mock('../components/TypingEffect', () => ({
  default: () => <span data-testid="typing-effect">Machine Learning</span>,
}))

vi.mock('../components/AnimatedCounter', () => ({
  default: ({ target, suffix }: { target: number; suffix: string }) => (
    <span data-testid="counter">{target}{suffix}</span>
  ),
}))

vi.mock('../components/Icons', () => ({
  GithubIcon: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="github-icon" {...props} />,
  LinkedinIcon: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="linkedin-icon" {...props} />,
  TwitterIcon: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="twitter-icon" {...props} />,
}))

function filterDomProps(props: Record<string, unknown>) {
  const dom: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(props)) {
    if (['children', 'initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'style', 'variants', 'layoutId'].includes(k)) continue
    if (k.startsWith('on') && typeof v === 'function') dom[k] = v
    else if (['className', 'href', 'target', 'rel', 'type', 'id', 'aria-label'].includes(k)) dom[k] = v
  }
  return dom
}

describe('Integration: Full App Rendering', () => {
  it('renders all sections in order', () => {
    render(<App />)

    // Navbar
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThanOrEqual(1)

    // Hero
    expect(screen.getAllByText(/Anmol Kumar/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Welcome to my portfolio')).toBeInTheDocument()

    // About
    expect(screen.getByText(/Turning/)).toBeInTheDocument()

    // Projects
    expect(screen.getByText(/Featured/)).toBeInTheDocument()

    // Skills
    expect(screen.getByText('Languages & AI')).toBeInTheDocument()

    // Contact
    expect(screen.getByText('Send Message')).toBeInTheDocument()

    // Footer
    expect(screen.getAllByText(/Anmol Kumar/).length).toBeGreaterThanOrEqual(2)
  })

  it('renders 3D canvas in hero', () => {
    render(<App />)
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
    expect(screen.getByTestId('particle-field')).toBeInTheDocument()
    expect(screen.getByTestId('hero-object')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<App />)
    const githubIcons = screen.getAllByTestId('github-icon')
    expect(githubIcons.length).toBeGreaterThanOrEqual(1)
    const linkedinIcons = screen.getAllByTestId('linkedin-icon')
    expect(linkedinIcons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders project cards', () => {
    render(<App />)
    expect(screen.getByText('Customer Churn Prediction')).toBeInTheDocument()
    expect(screen.getByText('AI-Powered Resume Screening')).toBeInTheDocument()
    expect(screen.getByText('Sales Analytics Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Sentiment Analysis Engine')).toBeInTheDocument()
    expect(screen.getByText('Inventory Optimization ML')).toBeInTheDocument()
    expect(screen.getByText('HR Analytics & Attrition Report')).toBeInTheDocument()
  })

  it('renders all skill categories', () => {
    render(<App />)
    expect(screen.getByText('Languages & AI')).toBeInTheDocument()
    expect(screen.getByText('Data & Analytics')).toBeInTheDocument()
    expect(screen.getByText('Databases & Tools')).toBeInTheDocument()
  })

  it('renders contact form', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project inquiry')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<App />)
    const links = screen.getAllByRole('link')
    const navLinks = ['#home', '#about', '#projects', '#skills', '#contact']
    navLinks.forEach(href => {
      const matching = links.filter(l => l.getAttribute('href') === href)
      expect(matching.length).toBeGreaterThanOrEqual(1)
    })
  })
})
