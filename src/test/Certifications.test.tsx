import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Certifications from '../components/Certifications'

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

function filterDomProps(props: Record<string, unknown>) {
  const dom: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(props)) {
    if (['children', 'initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'style', 'variants'].includes(k)) continue
    if (k.startsWith('on') && typeof v === 'function') dom[k] = v
    else if (['className', 'href', 'target', 'rel', 'type', 'id', 'role', 'htmlFor', 'disabled', 'required', 'placeholder'].includes(k)) dom[k] = v
  }
  return dom
}

describe('Certifications', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders section title', () => {
    render(<Certifications />)
    expect(screen.getByText(/Recognized/)).toBeInTheDocument()
    expect(screen.getByText(/Achievements/)).toBeInTheDocument()
  })

  it('renders empty state when no certifications', () => {
    render(<Certifications />)
    expect(screen.getByText(/No credentials uploaded yet/)).toBeInTheDocument()
  })

  it('renders upload form with all fields', () => {
    render(<Certifications />)
    expect(screen.getByPlaceholderText(/AWS Certified/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g. AWS')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('2025')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Verified Credential')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('License Ready')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Share what the credential covers')).toBeInTheDocument()
  })

  it('renders file input with correct accept attribute', () => {
    render(<Certifications />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('accept', '.pdf,.png,.jpg,.jpeg')
  })

  it('renders upload button', () => {
    render(<Certifications />)
    expect(screen.getByText('Upload Certificate')).toBeInTheDocument()
  })

  it('shows file error when submitting without selecting a file', () => {
    render(<Certifications />)
    fireEvent.change(screen.getByPlaceholderText(/AWS Certified/), { target: { value: 'AWS Data Engineer' } })
    fireEvent.change(screen.getByPlaceholderText('e.g. AWS'), { target: { value: 'AWS' } })
    fireEvent.change(screen.getByPlaceholderText('2025'), { target: { value: '2025' } })

    fireEvent.click(screen.getByText('Upload Certificate'))
    expect(screen.getByText(/Please select a certificate file/)).toBeInTheDocument()
  })

  it('rejects invalid file types and shows error', () => {
    render(<Certifications />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

    const invalidFile = new File(['test'], 'malware.exe', { type: 'application/x-executable' })
    Object.defineProperty(invalidFile, 'size', { value: 1024 })
    fireEvent.change(fileInput, { target: { files: [invalidFile] } })

    expect(screen.getByText(/Invalid file type/)).toBeInTheDocument()
  })

  it('rejects files larger than 5MB', () => {
    render(<Certifications />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

    const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'big.pdf', { type: 'application/pdf' })
    Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 })
    fireEvent.change(fileInput, { target: { files: [largeFile] } })

    expect(screen.getByText(/File too large/)).toBeInTheDocument()
  })

  it('accepts valid PDF file and shows preview', () => {
    render(<Certifications />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

    const validFile = new File(['pdf-content'], 'cert.pdf', { type: 'application/pdf' })
    Object.defineProperty(validFile, 'size', { value: 1024 })
    fireEvent.change(fileInput, { target: { files: [validFile] } })

    expect(screen.getAllByText('cert.pdf').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('1.0 KB')).toBeInTheDocument()
    expect(screen.queryByText(/Invalid file type/)).not.toBeInTheDocument()
  })

  it('accepts valid JPG file and shows preview', () => {
    render(<Certifications />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

    const validFile = new File(['image-data'], 'cert.jpg', { type: 'image/jpeg' })
    Object.defineProperty(validFile, 'size', { value: 2048 })
    fireEvent.change(fileInput, { target: { files: [validFile] } })

    expect(screen.getAllByText('cert.jpg').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('2.0 KB')).toBeInTheDocument()
  })

  it('shows title, issuer, and year as required fields', () => {
    render(<Certifications />)
    const titleInput = screen.getByPlaceholderText(/AWS Certified/)
    const issuerInput = screen.getByPlaceholderText('e.g. AWS')
    const yearInput = screen.getByPlaceholderText('2025')

    expect(titleInput).toHaveAttribute('required')
    expect(issuerInput).toHaveAttribute('required')
    expect(yearInput).toHaveAttribute('required')
  })
})
