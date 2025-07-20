import AddRecipe from '@/components/AddRecipe';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// eslint-disable-next-line react/display-name
jest.mock('next/link', () => ({ children, ...props }: any) => (
  <a {...props}>{children}</a>
));

describe('AddRecipe', () => {
  it('renders the Add icon button', () => {
    render(<AddRecipe />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
  });

  it('has correct styles and is clickable', async () => {
    render(<AddRecipe />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('position: absolute');
    expect(button).toHaveStyle('top: 10px');
    expect(button).toHaveStyle('right: 10px');
    await userEvent.click(button);
    // No navigation since Link is mocked, but click should not throw
  });
});
