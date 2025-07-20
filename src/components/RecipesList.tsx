import fetchFromJsonServer from '@/lib/client';
import { ApiResponse, RecipeSearchParams, RecipeType } from '@/models';
import { buildQueryString } from '@/utils/helpers';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RecipeCard from './RecipeCard';

type Props = {
  searchParams: RecipeSearchParams;
};

/**
 * RecipesList: Server Component to display a list of recipes.
 * @param searchParams - An object containing the search parameters
 */
export default async function RecipesList({ searchParams }: Props) {
  /* Queries */
  const queryString = buildQueryString(searchParams);
  const { data, error }: ApiResponse<RecipeType[]> = await fetchFromJsonServer(
    `recipes?${queryString}`,
    {
      next: { tags: ['recipes'] },
    }
  );

  /* Render logic */
  if (error) {
    throw new Error(`Error fetching recipes: ${error}`);
  }

  if (!data || data.length === 0) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100%', minHeight: '200px', p: 2 }}
      >
        <Typography variant="h4">No Record Found!</Typography>
      </Stack>
    );
  }

  return (
    <>
      {data.map((recipe: RecipeType) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
}
