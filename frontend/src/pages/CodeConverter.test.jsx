import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodeConverter from './CodeConverter';

// Mock the external dependencies
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="markdown">{children}</div>,
}));

jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => ({}),
}));

jest.mock('react-to-print', () => ({
  useReactToPrint: () => jest.fn(),
}));

describe('CodeConverter Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  it('renders the component correctly', () => {
    render(<CodeConverter />);
    
    // Check if main elements are present
    expect(screen.getByText('Code Converter')).toBeInTheDocument();
    expect(screen.getByText('Input your legacy code (C/C++/Java/COBOL)')).toBeInTheDocument();
    expect(screen.getByText('Microservices (SpringBoot/Python/Javascript)')).toBeInTheDocument();
  });

  it('handles input code changes', () => {
    render(<CodeConverter />);
    const textarea = screen.getByPlaceholderText('Type or paste your code here...');
    
    fireEvent.change(textarea, { target: { value: 'test code' } });
    expect(textarea.value).toBe('test code');
  });

  it('handles file upload', () => {
    render(<CodeConverter />);
    const file = new File(['test code'], 'test.js', { type: 'text/javascript' });
    const input = screen.getByTestId('fileInput');

    fireEvent.change(input, { target: { files: [file] } });
    // Add assertions based on your file upload logic
  });

  it('handles reset functionality', () => {
    render(<CodeConverter />);
    const resetButton = screen.getByText('Reset');
    const textarea = screen.getByPlaceholderText('Type or paste your code here...');

    fireEvent.change(textarea, { target: { value: 'test code' } });
    fireEvent.click(resetButton);

    expect(textarea.value).toBe('');
  });

  it('toggles preview mode', () => {
    render(<CodeConverter />);
    const previewButton = screen.getByText('Edit');

    fireEvent.click(previewButton);
    expect(screen.getByText('Preview')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('handles message submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          choices: [{ message: { content: 'Test response' } }]
        })
      })
    );

    render(<CodeConverter />);
    const input = screen.getByPlaceholderText('Ask a question...');
    const submitButton = screen.getByRole('button', { name: '' }); // The button with ArrowRightIcon

    fireEvent.change(input, { target: { value: 'test question' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.mistral.ai/v1/chat/completions',
        expect.any(Object)
      );
    });
  });

  it('handles code conversion', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ result: 'converted code' })
      })
    );

    render(<CodeConverter />);
    const convertButton = screen.getByText('Convert');

    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('handles code generation', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ result: 'generated code' })
      })
    );

    render(<CodeConverter />);
    const generateButton = screen.getByText('Generate');

    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  // Add test for error handling
  it('handles API errors gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API Error')));

    render(<CodeConverter />);
    const convertButton = screen.getByText('Convert');

    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByText('Error occurred while converting code.')).toBeInTheDocument();
    });
  });
});