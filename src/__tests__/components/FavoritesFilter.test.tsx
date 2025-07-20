import { fireEvent, render, screen } from '@testing-library/react';
import FavoritesFilter from '../../components/FavoritesFilter';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => ''),
    toString: () => '',
  }),
}));

describe('FavoritesFilter', () => {
  it('renders radio buttons for All, Yes, and No', () => {
    render(<FavoritesFilter />);
    expect(screen.getByLabelText('All')).toBeInTheDocument();
    expect(screen.getByLabelText('Yes')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();
  });

  it('calls router.push with correct query when selecting Yes', () => {
    const pushMock = jest.fn();
    const getMock = jest.fn(() => '');
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: getMock,
      toString: () => '',
    });
    render(<FavoritesFilter />);
    fireEvent.click(screen.getByLabelText('Yes'));
    expect(pushMock).toHaveBeenCalledWith('?favorite=yes');
  });

  it('calls router.push with correct query when selecting No', () => {
    const pushMock = jest.fn();
    const getMock = jest.fn(() => '');
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: getMock,
      toString: () => '',
    });
    render(<FavoritesFilter />);
    fireEvent.click(screen.getByLabelText('No'));
    expect(pushMock).toHaveBeenCalledWith('?favorite=no');
  });

  it('removes favorite param when selecting All', () => {
    const pushMock = jest.fn();
    const getMock = jest.fn(() => 'yes');
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: getMock,
      toString: () => 'favorite=yes',
    });
    render(<FavoritesFilter />);
    fireEvent.click(screen.getByLabelText('All'));
    expect(pushMock).toHaveBeenCalledWith('?');
  });
});
