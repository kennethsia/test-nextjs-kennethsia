import { fireEvent, render, screen } from '@testing-library/react';
import OrderByAscDesc from '../../components/OrderByAscDesc';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => 'asc'),
    toString: () => '_order=asc',
  }),
}));

describe('OrderByAscDesc', () => {
  it('renders select with ASC, DESC, and None options', () => {
    render(<OrderByAscDesc />);
    expect(screen.getByText('Order by ASC/DESC')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText('Select'));
    expect(screen.getAllByText('ASC').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DESC').length).toBeGreaterThan(0);
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('calls router.push with correct query when selecting DESC', () => {
    const pushMock = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: jest.fn(() => 'asc'),
      toString: () => '_order=asc',
    });
    render(<OrderByAscDesc />);
    fireEvent.mouseDown(screen.getByLabelText('Select'));
    fireEvent.click(screen.getByText('DESC'));
    expect(pushMock).toHaveBeenCalledWith('?_order=desc');
  });

  it('removes _order param when selecting None', () => {
    const pushMock = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push: pushMock });
    jest.spyOn(require('next/navigation'), 'useSearchParams').mockReturnValue({
      get: jest.fn(() => 'desc'),
      toString: () => '_order=desc',
    });
    render(<OrderByAscDesc />);
    fireEvent.mouseDown(screen.getByLabelText('Select'));
    fireEvent.click(screen.getByText('None'));
    expect(pushMock).toHaveBeenCalledWith('?');
  });
});
