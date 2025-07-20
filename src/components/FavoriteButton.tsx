import { updateRecipe } from '@/app/actions/recipes';
import { RecipeType } from '@/models';
import Star from '@mui/icons-material/Star';
import StarOutlined from '@mui/icons-material/StarOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

type Props = { recipe: RecipeType };

/**
 * FavoritesFilter: Component to toggle a recipe as favorite or not.
 * @param recipe: The recipe object to toggle favorite status.
 */
export default function FavoriteButton({ recipe }: Props) {
  const { id: recipeId, favorite } = recipe;
  const [isFavorite, setIsFavorite] = useState(favorite === 'yes');

  const handleToggleFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // prevent event bubbling
    e.stopPropagation();
    e.preventDefault();
    // Logic to toggle favorite status
    setIsFavorite((prev) => !prev);

    // updateRecipe server action
    const { error } = await updateRecipe(String(recipeId), {
      ...recipe,
      favorite: isFavorite ? 'no' : 'yes',
    });

    if (error) {
      throw new Error(`Error updating recipe: ${error}`);
    }
  };

  return (
    <IconButton
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        '&:hover': { bgcolor: 'primary.dark' },
        zIndex: 1,
      }}
      onClick={handleToggleFavorite}
      size="large"
    >
      {favorite === 'yes' ? (
        <Star sx={{ color: 'yellow' }} />
      ) : (
        <StarOutlined sx={{ color: 'yellow' }} />
      )}
    </IconButton>
  );
}
