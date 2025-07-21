import RecipeForm from '@/components/RecipeForm';
import fetchFromJsonServer from '@/lib/client';
import { ApiResponse, RecipeType } from '@/models';

type Props = {
  id: string;
};

/**
 * Recipe: Server Component to display a single recipe.
 * @param id - The ID of the recipe to display
 */
export default async function Recipe({ id }: Props) {
  const { data, error }: ApiResponse<RecipeType> = await fetchFromJsonServer(
    `recipes/${id}`,
    {
      next: { tags: [`recipe${id}`] },
    }
  );

  if (error) {
    throw new Error(`Error fetching recipe with id: ${id}`);
  }

  if (!data) {
    return <div>No recipe found</div>;
  }

  return <RecipeForm recipe={data} data-testid="recipe-details" />;
}
