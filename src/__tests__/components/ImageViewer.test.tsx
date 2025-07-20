import { fireEvent, render, screen } from '@testing-library/react';
import ImageViewer from '../../components/ImageViewer';

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => '/mock-url');
});
afterAll(() => {
  (global.URL.createObjectURL as jest.Mock).mockReset();
});

describe('ImageViewer', () => {
  it('renders with placeholder if no fileName', () => {
    render(<ImageViewer fileName={null} onImageChange={jest.fn()} />);
    const img = screen.getByAltText(/preview/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('placeholder.jpg')
    );
  });

  it('renders with fileName if provided', () => {
    render(<ImageViewer fileName="test.jpg" onImageChange={jest.fn()} />);
    const img = screen.getByAltText(/preview/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('test.jpg'));
  });

  it('calls onImageChange when a file is selected', () => {
    const onImageChange = jest.fn();
    render(<ImageViewer fileName={null} onImageChange={onImageChange} />);
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['dummy'], 'dummy.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(onImageChange).toHaveBeenCalledWith(file);
  });

  it('shows placeholder if image fails to load', () => {
    render(<ImageViewer fileName="notfound.jpg" onImageChange={jest.fn()} />);
    const img = screen.getByAltText(/preview/i);
    fireEvent.error(img);
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('placeholder.jpg')
    );
  });
});
