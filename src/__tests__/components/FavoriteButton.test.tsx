import FavoriteButton from '@/components/FavoriteButton';
import { RecipeType } from '@/models';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/app/actions/recipes', () => ({
  updateRecipe: jest.fn().mockResolvedValue({}),
}));

describe('FavoriteButton', () => {
  const recipe: RecipeType = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    title: 'Test Recipe',
    description: 'Test Description',
    ingredients: 'Test Ingredients',
    instructions: 'Test Instructions',
    favorite: 'no',
  };

  it('renders StarOutlined when not favorite', () => {
    render(<FavoriteButton recipe={recipe} />);
    expect(screen.getByTestId('StarOutlineOutlinedIcon')).toBeInTheDocument();
  });

  it('renders Star when favorite', () => {
    render(<FavoriteButton recipe={{ ...recipe, favorite: 'yes' }} />);
    expect(screen.getByTestId('StarIcon')).toBeInTheDocument();
  });

  it('calls updateRecipe and toggles favorite on click', async () => {
    render(<FavoriteButton recipe={recipe} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(require('@/app/actions/recipes').updateRecipe).toHaveBeenCalled();
  });
});
