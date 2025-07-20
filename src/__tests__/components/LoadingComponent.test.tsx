import { render, screen } from '@testing-library/react';
import LoadingComponent from '../../components/LoadingComponent';

// Mock MUI components
jest.mock('@mui/material/Box', () => {
  const MockBox = (props: any) => <div data-testid="mui-box" {...props} />;
  MockBox.displayName = 'MockBox';
  return MockBox;
});
jest.mock('@mui/material/CircularProgress', () => {
  const MockCircularProgress = () => <div data-testid="circular-progress" />;
  MockCircularProgress.displayName = 'MockCircularProgress';
  return MockCircularProgress;
});

describe('LoadingComponent', () => {
  it('renders a centered loading indicator', () => {
    render(<LoadingComponent />);
    // Check for the CircularProgress mock
    const progress = screen.getByTestId('circular-progress');
    expect(progress).toBeInTheDocument();
  });
});
