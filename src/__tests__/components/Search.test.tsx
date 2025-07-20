import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../../components/Search';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: jest.fn(() => ''),
    toString: () => '',
  }),
  usePathname: () => '/',
}));

describe('Search', () => {
  it('renders the search input', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search here...')).toBeInTheDocument();
  });

  it('updates input value and calls router.push with query', async () => {
    const pushMock = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: jest.fn(() => ''),
      toString: () => '',
    });
    render(<Search />);
    const input = screen.getByPlaceholderText('Search here...');
    fireEvent.change(input, { target: { value: 'pasta' } });
    expect(input).toHaveValue('pasta');
    // Wait for debounce
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('?q=pasta');
    });
  });

  it('removes q param when input is cleared', async () => {
    const pushMock = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: jest.fn(() => 'pasta'),
      toString: () => 'q=pasta',
    });
    render(<Search />);
    const input = screen.getByPlaceholderText('Search here...');
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('?');
    });
  });

  it('does not render on non-root path', () => {
    jest
      .spyOn(require('next/navigation'), 'usePathname')
      .mockReturnValue('/other');
    render(<Search />);
    expect(
      screen.queryByPlaceholderText('Search here...')
    ).not.toBeInTheDocument();
  });
});
