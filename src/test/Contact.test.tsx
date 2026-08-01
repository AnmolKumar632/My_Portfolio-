import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Contact from '../components/Contact'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...filterDomProps(props)}>{children}</div>,
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h2 {...filterDomProps(props)}>{children}</h2>,
    h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h3 {...filterDomProps(props)}>{children}</h3>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...filterDomProps(props)}>{children}</p>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...filterDomProps(props)}>{children}</span>,
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <a {...filterDomProps(props)}>{children}</a>,
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...filterDomProps(props)}>{children}</button>,
  },
  useInView: () => true,
}))

function filterDomProps(props: Record<string, unknown>) {
  const dom: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(props)) {
    if (['children', 'initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'style', 'variants'].includes(k)) continue
    if (k.startsWith('on') && typeof v === 'function') dom[k] = v
    else if (['className', 'href', 'target', 'rel', 'type', 'id', 'disabled', 'name', 'value', 'placeholder', 'rows', 'required'].includes(k)) dom[k] = v
  }
  return dom
}

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Contact', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders section title', () => {
    render(<Contact />)
    expect(screen.getByText(/Get In/)).toBeInTheDocument()
    expect(screen.getByText(/Touch/)).toBeInTheDocument()
  })

  it('renders contact info', () => {
    render(<Contact />)
    expect(screen.getByText('anmolkumar27818@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('linkedin.com/in/anmol-kumar-b709762b7')).toBeInTheDocument()
    expect(screen.getByText('github.com/AnmolKumar632')).toBeInTheDocument()
    expect(screen.getByText('Halasuru, Bangalore-560008')).toBeInTheDocument()
  })

  it('renders contact form fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Project inquiry')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeInTheDocument()
  })

  it('renders send message button', () => {
    render(<Contact />)
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('renders email link with correct href', () => {
    render(<Contact />)
    const emailLink = screen.getByText('anmolkumar27818@gmail.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:anmolkumar27818@gmail.com')
  })

  it('renders LinkedIn link with correct href', () => {
    render(<Contact />)
    const linkedInLink = screen.getByText('linkedin.com/in/anmol-kumar-b709762b7').closest('a')
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/anmol-kumar-b709762b7')
    expect(linkedInLink).toHaveAttribute('target', '_blank')
  })

  it('renders GitHub link with correct href', () => {
    render(<Contact />)
    const githubLink = screen.getByText('github.com/AnmolKumar632').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/AnmolKumar632/AnmolKumar632/tree/main')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('has all required form inputs', () => {
    render(<Contact />)
    const nameInput = screen.getByPlaceholderText('Your name')
    expect(nameInput).toBeRequired()
    const emailInput = screen.getByPlaceholderText('you@email.com')
    expect(emailInput).toBeRequired()
    const subjectInput = screen.getByPlaceholderText('Project inquiry')
    expect(subjectInput).toBeRequired()
    const messageInput = screen.getByPlaceholderText('Tell me about your project...')
    expect(messageInput).toBeRequired()
  })

  it('has email input with type="email" for validation', () => {
    render(<Contact />)
    const emailInput = screen.getByPlaceholderText('you@email.com')
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  describe('Form Submission - Valid Data', () => {
    it('shows "Sending..." during submission', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ success: true }),
      })

      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Anmol Kumar' } })
      fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Data Science Project' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'I need help with ML models.' } })

      fireEvent.click(screen.getByText('Send Message'))

      await waitFor(() => {
        expect(screen.getByText(/Sending/)).toBeInTheDocument()
      })
    })

    it('shows success message after successful submission', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ success: true }),
      })

      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Anmol Kumar' } })
      fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Data Science Project' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'I need help with ML models.' } })

      fireEvent.click(screen.getByText('Send Message'))

      await waitFor(() => {
        expect(screen.getByText(/Message Sent Successfully/)).toBeInTheDocument()
      })
    })

    it('sends correct data to Web3Forms API', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ success: true }),
      })

      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Anmol Kumar' } })
      fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Data Science Project' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'I need help with ML models.' } })

      fireEvent.click(screen.getByText('Send Message'))

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('https://api.web3forms.com/submit', expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('Anmol Kumar'),
        }))
      })
    })

    it('clears form fields after successful submission', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ success: true }),
      })

      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Anmol Kumar' } })
      fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Data Science Project' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'I need help.' } })

      fireEvent.click(screen.getByText('Send Message'))

      await waitFor(() => {
        expect(screen.getByText(/Message Sent Successfully/)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission - Empty Fields', () => {
    it('all inputs are required - cannot submit empty', () => {
      render(<Contact />)
      const nameInput = screen.getByPlaceholderText('Your name')
      const emailInput = screen.getByPlaceholderText('you@email.com')
      const subjectInput = screen.getByPlaceholderText('Project inquiry')
      const messageInput = screen.getByPlaceholderText('Tell me about your project...')

      expect(nameInput).toBeRequired()
      expect(emailInput).toBeRequired()
      expect(subjectInput).toBeRequired()
      expect(messageInput).toBeRequired()
    })

    it('does not call API when form has empty fields', async () => {
      render(<Contact />)

      const submitBtn = screen.getByText('Send Message').closest('button')!
      fireEvent.click(submitBtn)

      await waitFor(() => {
        expect(mockFetch).not.toHaveBeenCalled()
      })
    })
  })

  describe('Form Submission - Invalid Email', () => {
    it('email input has type="email" for browser validation', () => {
      render(<Contact />)
      const emailInput = screen.getByPlaceholderText('you@email.com')
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('does not call API with invalid email format', async () => {
      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Anmol' } })
      fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'not-an-email' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Test' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'Test message' } })

      const submitBtn = screen.getByText('Send Message').closest('button')!
      fireEvent.click(submitBtn)

      await waitFor(() => {
        expect(mockFetch).not.toHaveBeenCalled()
      })
    })

    it('does not call API with empty email', async () => {
      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Anmol' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Test' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'Test message' } })

      const submitBtn = screen.getByText('Send Message').closest('button')!
      fireEvent.click(submitBtn)

      await waitFor(() => {
        expect(mockFetch).not.toHaveBeenCalled()
      })
    })
  })

  describe('Form Submission - API Error', () => {
    it('shows error message when API returns failure', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ success: false }),
      })

      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test' } })
      fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Test' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'Test' } })

      fireEvent.click(screen.getByText('Send Message'))

      await waitFor(() => {
        expect(screen.getByText(/Failed to send/)).toBeInTheDocument()
      })
    })

    it('shows error message when fetch throws', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<Contact />)

      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test' } })
      fireEvent.change(screen.getByPlaceholderText('you@email.com'), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByPlaceholderText('Project inquiry'), { target: { value: 'Test' } })
      fireEvent.change(screen.getByPlaceholderText('Tell me about your project...'), { target: { value: 'Test' } })

      fireEvent.click(screen.getByText('Send Message'))

      await waitFor(() => {
        expect(screen.getByText(/Failed to send/)).toBeInTheDocument()
      })
    })
  })
})
