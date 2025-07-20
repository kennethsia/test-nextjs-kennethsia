import fetchFromJsonServer from '@/lib/client';
import { RecipeType } from '@/models';
import { revalidateTag } from 'next/cache';
import { createRecipe, deleteRecipe, updateRecipe } from './recipes';

jest.mock('@/lib/client', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

const mockRecipe: RecipeType = {
  id: 1,
  title: 'Test Recipe',
  description: 'Test Desc',
  createdDate: '2024-07-01T08:00:00Z',
  name: 'Test',
  email: 'test@example.com',
  ingredients: 'Eggs',
  instructions: 'Cook',
};

describe('recipes actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRecipe', () => {
    it('returns error for invalid body', async () => {
      // @ts-expect-error
      const res = await createRecipe({});
      expect(res.error).toBeDefined();
    });

    it('returns error when fetch is not ok', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({ ok: false });
      const { id, ...recipeWithoutId } = mockRecipe;
      const res = await createRecipe(recipeWithoutId);
      expect(res.error).toBe('Failed to create recipe');
    });

    it('returns data and calls revalidateTag when successful', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({
        data: mockRecipe,
        ok: true,
      });
      const { id, ...recipeWithoutId } = mockRecipe;
      const res = await createRecipe(recipeWithoutId);
      expect(res.data).toEqual(mockRecipe);
      expect(res.message).toBe('Recipe created successfully');
      expect(revalidateTag).toHaveBeenCalledWith('recipes');
    });
  });

  describe('updateRecipe', () => {
    it('returns error for invalid body', async () => {
      // @ts-expect-error
      const res = await updateRecipe('1', { title: 123 });
      expect(res.error).toBeDefined();
    });

    it('returns not found for 404', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });
      const res = await updateRecipe('1', { title: 'New' });
      expect(res.error).toBe('Not found');
    });

    it('returns error for other errors', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });
      const res = await updateRecipe('1', { title: 'New' });
      expect(res.error).toBe('Failed to update recipe');
    });

    it('returns data and calls revalidateTag when successful', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({
        data: mockRecipe,
        ok: true,
      });
      const res = await updateRecipe('1', { title: 'New' });
      expect(res.data).toEqual(mockRecipe);
      expect(res.message).toBe('Recipe updated successfully');
      expect(revalidateTag).toHaveBeenCalledWith('recipe1');
      expect(revalidateTag).toHaveBeenCalledWith('recipes');
    });
  });

  describe('deleteRecipe', () => {
    it('returns not found for 404', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });
      const res = await deleteRecipe('1');
      expect(res.error).toBe('Not found');
    });

    it('returns error for other errors', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });
      const res = await deleteRecipe('1');
      expect(res.error).toBe('Failed to delete recipe');
    });

    it('returns data and calls revalidateTag when successful', async () => {
      (fetchFromJsonServer as jest.Mock).mockResolvedValueOnce({
        data: mockRecipe,
        ok: true,
      });
      const res = await deleteRecipe('1');
      expect(res.data).toEqual(mockRecipe);
      expect(res.message).toBe('Recipe deleted successfully');
      expect(revalidateTag).toHaveBeenCalledWith('recipe1');
      expect(revalidateTag).toHaveBeenCalledWith('recipes');
    });
  });
});
