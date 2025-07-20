import ErrorComponent from '@/components/ErrorComponent';
import { render, screen } from '@testing-library/react';

describe('ErrorComponent', () => {
  it('renders the error message', () => {
    const error = new Error('Test error message');
    render(<ErrorComponent error={error} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders with MUI Alert and AlertTitle', () => {
    const error = new Error('Another error');
    render(<ErrorComponent error={error} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
