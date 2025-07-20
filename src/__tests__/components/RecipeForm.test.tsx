import { RecipeType } from '@/models';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RecipeForm from '../../components/RecipeForm';
import { useRecipeForm } from '../../hooks/useRecipeForm';

jest.mock('../../hooks/useRecipeForm', () => {
  const defaultRecipe = {
    id: 1,
    name: 'Tester',
    email: 'test@example.com',
    title: 'Test',
    description: 'desc',
    ingredients: 'ing',
    instructions: 'inst',
    imageFilename: 'test.jpg',
  };
  return {
    useRecipeForm: jest.fn((recipe: any) => ({
      register: jest.fn((field: any) => ({
        onChange: jest.fn(),
        name: field,
        ref: jest.fn(),
        value: recipe && recipe[field] !== undefined ? recipe[field] : '',
      })),
      handleSubmit: (fn: any) => (e: any) => {
        if (e && e.preventDefault) e.preventDefault();
        fn(recipe || defaultRecipe);
      },
      errors: {},
      handleImageChange: jest.fn(),
      onSubmit: jest.fn(),
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      recipeId: recipe && recipe.id ? recipe.id.toString() : undefined,
    })),
  };
});

// Move mock component definitions above jest.mock calls
function MockImageViewer() {
  return <div data-testid="image-viewer" />;
}
MockImageViewer.displayName = 'MockImageViewer';
jest.mock('@/components/ImageViewer', () => MockImageViewer);

function MockForm(props: any) {
  return <div data-testid="form">{props.children}</div>;
}
MockForm.displayName = 'MockForm';
jest.mock('@/components/layout/Form', () => MockForm);

const defaultRecipe: RecipeType = {
  id: 1,
  name: 'Tester',
  email: 'test@example.com',
  title: 'Test',
  description: 'desc',
  ingredients: 'ing',
  instructions: 'inst',
  imageFilename: 'test.jpg',
};

describe('RecipeForm', () => {
  it('renders all fields', () => {
    render(<RecipeForm recipe={defaultRecipe} />);
    expect(screen.getByLabelText(/YOUR NAME/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/EMAIL ADDRESS/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/TITLE/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/DESCRIPTION/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/INGREDIENTS/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/INSTRUCTIONS/i)).toBeInTheDocument();
  });

  it('renders the correct values for a given recipe', () => {
    render(<RecipeForm recipe={defaultRecipe} />);
    expect(screen.getByLabelText(/YOUR NAME/i)).toHaveValue(defaultRecipe.name);
    expect(screen.getByLabelText(/EMAIL ADDRESS/i)).toHaveValue(
      defaultRecipe.email
    );
    expect(screen.getByLabelText(/TITLE/i)).toHaveValue(defaultRecipe.title);
    expect(screen.getByLabelText(/DESCRIPTION/i)).toHaveValue(
      defaultRecipe.description
    );
    expect(screen.getByLabelText(/INGREDIENTS/i)).toHaveValue(
      defaultRecipe.ingredients
    );
    expect(screen.getByLabelText(/INSTRUCTIONS/i)).toHaveValue(
      defaultRecipe.instructions
    );
  });

  it('calls onSubmit when Save is clicked (create)', async () => {
    const onSubmit = jest.fn();
    (useRecipeForm as jest.Mock).mockImplementation((recipe: any) => ({
      register: jest.fn((field: any) => ({
        onChange: jest.fn(),
        name: field,
        ref: jest.fn(),
        value: recipe && recipe[field] !== undefined ? recipe[field] : '',
      })),
      handleSubmit: (fn: any) => (e: any) => {
        if (e && e.preventDefault) e.preventDefault();
        fn(recipe || defaultRecipe);
      },
      errors: {},
      handleImageChange: jest.fn(),
      onSubmit,
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      recipeId: undefined,
    }));
    render(<RecipeForm />);
    fireEvent.click(screen.getByText(/Save/i));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('calls onUpdate when Save is clicked (edit)', async () => {
    const onUpdate = jest.fn();
    (useRecipeForm as jest.Mock).mockImplementation((recipe: any) => ({
      register: jest.fn((field: any) => ({
        onChange: jest.fn(),
        name: field,
        ref: jest.fn(),
        value: recipe && recipe[field] !== undefined ? recipe[field] : '',
      })),
      handleSubmit: (fn: any) => (e: any) => {
        if (e && e.preventDefault) e.preventDefault();
        fn(recipe || defaultRecipe);
      },
      errors: {},
      handleImageChange: jest.fn(),
      onSubmit: jest.fn(),
      onUpdate,
      onDelete: jest.fn(),
      recipeId: recipe && recipe.id ? recipe.id.toString() : '1',
    }));
    render(<RecipeForm recipe={defaultRecipe} />);
    fireEvent.click(screen.getByText(/Save/i));
    await waitFor(() => expect(onUpdate).toHaveBeenCalled());
  });

  it('calls onDelete when Delete is clicked', async () => {
    const onDelete = jest.fn();
    (useRecipeForm as jest.Mock).mockImplementation((recipe: any) => ({
      register: jest.fn((field: any) => ({
        onChange: jest.fn(),
        name: field,
        ref: jest.fn(),
        value: recipe && recipe[field] !== undefined ? recipe[field] : '',
      })),
      handleSubmit: (fn: any) => (e: any) => {
        if (e && e.preventDefault) e.preventDefault();
        fn(recipe || defaultRecipe);
      },
      errors: {},
      handleImageChange: jest.fn(),
      onSubmit: jest.fn(),
      onUpdate: jest.fn(),
      onDelete,
      recipeId: recipe && recipe.id ? recipe.id.toString() : '1',
    }));
    render(<RecipeForm recipe={defaultRecipe} />);
    fireEvent.click(screen.getByText(/Delete/i));
    await waitFor(() => expect(onDelete).toHaveBeenCalledWith('1'));
  });
});
