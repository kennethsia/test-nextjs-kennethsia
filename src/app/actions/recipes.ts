'use server';

import fetchFromJsonServer from '@/lib/client';
import { ApiResponse, RecipeSchema, RecipeType } from '@/models';
import { revalidateTag } from 'next/cache';

/**
 * POST: Create a new recipe
 * @param body - The recipe data to be created, excluding the 'id' field
 * @returns An ApiResponse containing {data, error, message}
 */
export async function createRecipe(
  body: Omit<RecipeType, 'id'>
): Promise<ApiResponse<RecipeType>> {
  // validate the body against the RecipeSchema using zod
  const parseResult = RecipeSchema.omit({ id: true }).safeParse(body);

  if (!parseResult.success) {
    return { error: JSON.stringify(parseResult.error) };
  }

  // send POST request to the JSON server
  const { data, ok } = await fetchFromJsonServer('recipes', {
    method: 'POST',
    body: JSON.stringify({
      ...parseResult.data,
      createdDate: new Date().toISOString(),
    }),
  });

  if (!ok) return { error: 'Failed to create recipe' };

  // revalidate the cache for the recipes
  revalidateTag('recipes');

  return { data, message: 'Recipe created successfully' };
}

/**
 * PUT: Update an existing recipe
 * @param id - The ID of the recipe to be updated
 * @param body - The recipe data to be updated
 * @returns An ApiResponse containing {data, error, message}
 */
export async function updateRecipe(
  id: string,
  body: Partial<Omit<RecipeType, 'id'>>
): Promise<ApiResponse<RecipeType>> {
  // validate the body against the RecipeSchema using zod
  const parseResult = RecipeSchema.omit({ id: true }).partial().safeParse(body);

  if (!parseResult.success) {
    return { error: JSON.stringify(parseResult.error) };
  }

  // send PUT request to the JSON server
  const { data, ok, status } = await fetchFromJsonServer(`recipes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(parseResult.data),
  });

  if (!ok) {
    if (status === 404) return { error: 'Not found' };
    return { error: 'Failed to update recipe' };
  }

  // revalidate the cache for the updated recipe and all recipes
  revalidateTag(`recipe${id}`);
  revalidateTag('recipes');

  return { data, message: 'Recipe updated successfully' };
}

/**
 * DELETE: Remove an existing recipe
 * @param id - The ID of the recipe to be deleted
 * @returns An ApiResponse containing {data, error, message}
 */
export async function deleteRecipe(
  id: string
): Promise<ApiResponse<RecipeType>> {
  // send DELETE request to the JSON server
  const { data, ok, status } = await fetchFromJsonServer(`recipes/${id}`, {
    method: 'DELETE',
  });

  if (!ok) {
    if (status === 404) return { error: 'Not found' };
    return { error: 'Failed to delete recipe' };
  }

  // revalidate the cache for the deleted recipe and all recipes
  revalidateTag(`recipe${id}`);
  revalidateTag('recipes');

  return { data, message: 'Recipe deleted successfully' };
}
