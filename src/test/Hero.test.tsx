import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...filterDomProps(props)}>{children}</div>,
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...filterDomProps(props)}>{children}</h1>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...filterDomProps(props)}>{children}</p>,
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <a {...filterDomProps(props)}>{children}</a>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...filterDomProps(props)}>{children}</span>,
  },
  useInView: () => true,
}))

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: React.PropsWithChildren) => <div data-testid="canvas-mock">{children}</div>,
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

vi.mock('../components/Icons', () => ({
  GithubIcon: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="github-icon" {...props} />,
  LinkedinIcon: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="linkedin-icon" {...props} />,
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

describe('Hero', () => {
  it('renders welcome badge', () => {
    render(<Hero />)
    expect(screen.getByText('Welcome to my portfolio')).toBeInTheDocument()
  })

  it('renders name', () => {
    render(<Hero />)
    expect(screen.getByText(/Anmol Kumar/)).toBeInTheDocument()
  })

  it('renders role', () => {
    render(<Hero />)
    expect(screen.getByText('Data Scientist / AI Engineer')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('View Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
  })

  it('renders social links with correct hrefs', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link')
    const githubLink = links.find(l => l.getAttribute('href')?.includes('github.com'))
    expect(githubLink).toBeTruthy()
    const linkedinLink = links.find(l => l.getAttribute('href')?.includes('linkedin.com'))
    expect(linkedinLink).toBeTruthy()
  })

  it('renders 3D canvas', () => {
    render(<Hero />)
    expect(screen.getByTestId('canvas-mock')).toBeInTheDocument()
  })

  it('renders typing effect', () => {
    render(<Hero />)
    expect(screen.getByTestId('typing-effect')).toBeInTheDocument()
  })

  it('renders profile image', () => {
    render(<Hero />)
    const img = screen.getByAltText('Anmol Kumar')
    expect(img).toHaveAttribute('src', '/profile.jpg')
  })

  it('has correct CTA button links', () => {
    render(<Hero />)
    const projectsBtn = screen.getByText('View Projects').closest('a')
    expect(projectsBtn).toHaveAttribute('href', '#projects')
    const contactBtn = screen.getByText('Contact Me').closest('a')
    expect(contactBtn).toHaveAttribute('href', '#contact')
  })

  it('renders scroll arrow', () => {
    render(<Hero />)
    const scrollLink = screen.getByText('Scroll').closest('a')
    expect(scrollLink).toHaveAttribute('href', '#about')
  })
})
