import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Skills from '../components/Skills'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...filterDomProps(props)}>{children}</div>,
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h2 {...filterDomProps(props)}>{children}</h2>,
    h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h3 {...filterDomProps(props)}>{children}</h3>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...filterDomProps(props)}>{children}</span>,
  },
  useInView: () => true,
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

describe('Skills', () => {
  it('renders section title', () => {
    render(<Skills />)
    expect(screen.getAllByText(/Skills/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders category titles', () => {
    render(<Skills />)
    expect(screen.getByText('Languages & AI')).toBeInTheDocument()
    expect(screen.getByText('Data & Analytics')).toBeInTheDocument()
    expect(screen.getByText('Databases & Tools')).toBeInTheDocument()
  })

  it('renders all skills as badges', () => {
    render(<Skills />)
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('Machine Learning')).toBeInTheDocument()
    expect(screen.getByText('AI Tools')).toBeInTheDocument()
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
    expect(screen.getByText('Scikit-learn')).toBeInTheDocument()
    expect(screen.getByText('Power BI')).toBeInTheDocument()
    expect(screen.getByText('Excel')).toBeInTheDocument()
    expect(screen.getByText('SQL (MySQL)')).toBeInTheDocument()
    expect(screen.getByText('Statistics')).toBeInTheDocument()
    expect(screen.getByText('MySQL')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
    expect(screen.getByText('Pandas / NumPy')).toBeInTheDocument()
  })

  it('renders additional tool badges', () => {
    render(<Skills />)
    expect(screen.getByText('Jupyter / Colab')).toBeInTheDocument()
    expect(screen.getByText('Git')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })

  it('renders 15 total skill badges across 3 groups', () => {
    render(<Skills />)
    const skillNames = ['Python', 'Machine Learning', 'AI Tools', 'TensorFlow', 'Scikit-learn', 'Power BI', 'Excel', 'SQL (MySQL)', 'Statistics', 'Pandas / NumPy', 'MySQL', 'MongoDB', 'Jupyter / Colab', 'Git', 'Docker']
    skillNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})
