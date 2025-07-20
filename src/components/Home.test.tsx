import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  it('renders Home heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /home/i });
    expect(heading).toBeInTheDocument();
  });
});
