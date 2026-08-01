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

describe('System Tests: Portfolio完整性', () => {
  describe('Content Verification', () => {
    it('displays correct personal information', () => {
      render(<App />)
      expect(screen.getAllByText(/Anmol Kumar/).length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('Data Scientist / AI Engineer')).toBeInTheDocument()
      expect(screen.getByText('anmolkumar27818@gmail.com')).toBeInTheDocument()
      expect(screen.getAllByText(/linkedin.com\/in\/anmol-kumar-b709762b7/).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/github.com\/AnmolKumar632/).length).toBeGreaterThanOrEqual(1)
    })

    it('displays correct section headings', () => {
      render(<App />)
      expect(screen.getByText(/Welcome to my portfolio/)).toBeInTheDocument()
      expect(screen.getByText(/Turning/)).toBeInTheDocument()
      expect(screen.getByText(/Featured/)).toBeInTheDocument()
      expect(screen.getAllByText(/Skills/).length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText(/Get In/)).toBeInTheDocument()
    })

    it('displays all project titles', () => {
      render(<App />)
      const projects = [
        'Customer Churn Prediction',
        'AI-Powered Resume Screening',
        'Sales Analytics Dashboard',
        'Sentiment Analysis Engine',
        'Inventory Optimization ML',
        'HR Analytics & Attrition Report',
      ]
      projects.forEach(project => {
        expect(screen.getByText(project)).toBeInTheDocument()
      })
    })

    it('displays key skills', () => {
      render(<App />)
      expect(screen.getAllByText('Python').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Machine Learning').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Power BI').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Excel').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('MongoDB').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('Pandas / NumPy').length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Navigation Links', () => {
    it('has nav links pointing to correct sections', () => {
      render(<App />)
      const navLinks = ['#home', '#about', '#projects', '#skills', '#contact']
      navLinks.forEach(href => {
        const links = screen.getAllByRole('link')
        const matching = links.filter(l => l.getAttribute('href') === href)
        expect(matching.length).toBeGreaterThanOrEqual(1)
      })
    })

    it('CTA buttons link to correct sections', () => {
      render(<App />)
      const viewProjects = screen.getByText('View Projects').closest('a')
      expect(viewProjects).toHaveAttribute('href', '#projects')
      const contactMe = screen.getByText('Contact Me').closest('a')
      expect(contactMe).toHaveAttribute('href', '#contact')
    })
  })

  describe('Social Media Links', () => {
    it('GitHub links point to correct profile', () => {
      render(<App />)
      const githubLinks = screen.getAllByTestId('github-icon')
      githubLinks.forEach(icon => {
        const link = icon.closest('a')
        expect(link?.getAttribute('href')).toContain('github.com/AnmolKumar632')
      })
    })

    it('LinkedIn links point to correct profile', () => {
      render(<App />)
      const linkedinLinks = screen.getAllByTestId('linkedin-icon')
      linkedinLinks.forEach(icon => {
        const link = icon.closest('a')
        expect(link?.getAttribute('href')).toContain('linkedin.com/in/anmol-kumar')
      })
    })

    it('external links have target="_blank"', () => {
      render(<App />)
      const githubIcon = screen.getAllByTestId('github-icon')[0]
      const githubLink = githubIcon.closest('a')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noreferrer')
    })
  })

  describe('3D Integration', () => {
    it('renders Canvas with 3D objects', () => {
      render(<App />)
      expect(screen.getByTestId('canvas')).toBeInTheDocument()
      expect(screen.getByTestId('particle-field')).toBeInTheDocument()
      expect(screen.getByTestId('hero-object')).toBeInTheDocument()
    })
  })

  describe('Contact Form', () => {
    it('has all required fields', () => {
      render(<App />)
      expect(screen.getByPlaceholderText('Your name')).toBeRequired()
      expect(screen.getByPlaceholderText('you@email.com')).toBeRequired()
      expect(screen.getByPlaceholderText('Project inquiry')).toBeRequired()
      expect(screen.getByPlaceholderText('Tell me about your project...')).toBeRequired()
    })

    it('has submit button', () => {
      render(<App />)
      const button = screen.getByText('Send Message')
      expect(button).toBeInTheDocument()
      expect(button.closest('button')).toHaveAttribute('type', 'submit')
    })
  })

  describe('Responsive Design Elements', () => {
    it('renders buttons (mobile menu + submit)', () => {
      render(<App />)
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Footer', () => {
    it('renders current year', () => {
      render(<App />)
      const year = new Date().getFullYear().toString()
      expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
    })

    it('renders tech stack mention', () => {
      render(<App />)
      expect(screen.getByText(/React & Tailwind CSS/)).toBeInTheDocument()
    })
  })
})
