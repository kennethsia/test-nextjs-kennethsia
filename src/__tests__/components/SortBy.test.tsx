import { fireEvent, render, screen } from '@testing-library/react';
import SortBy from '../../components/SortBy';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: jest.fn(() => 'title'),
    toString: () => '_sort=title',
  }),
}));

describe('SortBy', () => {
  it('renders select with TITLE, NAME, and DATE options', () => {
    render(<SortBy />);
    expect(screen.getByText('Sort by Title')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText('Select'));
    expect(screen.getAllByText('TITLE').length).toBeGreaterThan(0);
    expect(screen.getAllByText('NAME').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DATE').length).toBeGreaterThan(0);
  });

  it('calls router.push with correct query when selecting NAME', () => {
    const pushMock = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: jest.fn(() => 'title'),
      toString: () => '_sort=title',
    });
    render(<SortBy />);
    fireEvent.mouseDown(screen.getByLabelText('Select'));
    fireEvent.click(screen.getByText('NAME'));
    expect(pushMock).toHaveBeenCalledWith('?_sort=name');
  });

  it('calls router.push with correct query when selecting DATE', () => {
    const pushMock = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: jest.fn(() => 'title'),
      toString: () => '_sort=title',
    });
    render(<SortBy />);
    fireEvent.mouseDown(screen.getByLabelText('Select'));
    fireEvent.click(screen.getByText('DATE'));
    expect(pushMock).toHaveBeenCalledWith('?_sort=createdDate');
  });
});
