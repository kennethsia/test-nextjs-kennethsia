import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RecipeCard from '../../components/RecipeCard';

jest.mock('next/image', () => {
  const MockImage = (props: any) => <img {...props} alt={props.alt} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: any) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('RecipeCard', () => {
  const recipe = {
    id: 1,
    title: 'Test Recipe',
    description: 'A delicious test recipe.',
    name: 'Chef Test',
    email: 'chef@test.com',
    ingredients: 'Eggs, Flour',
    instructions: 'Mix and cook.',
    createdDate: '2025-07-21T12:00:00Z',
    imageFilename: 'test.jpg',
  };

  it('renders recipe title, description, name, and date', () => {
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('A delicious test recipe.')).toBeInTheDocument();
    expect(screen.getByText('Added by:')).toBeInTheDocument();
    expect(screen.getByText('Chef Test')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('7/21/2025')).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(<RecipeCard recipe={recipe} />);
    const img = screen.getByAltText('Recipe Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('test.jpg'));
  });

  it('links to the correct recipe page', () => {
    render(<RecipeCard recipe={recipe} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/recipes/1');
  });

  it('shows N/A if createdDate is missing', () => {
    const recipeNoDate = { ...recipe, createdDate: undefined };
    render(<RecipeCard recipe={recipeNoDate} />);
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
