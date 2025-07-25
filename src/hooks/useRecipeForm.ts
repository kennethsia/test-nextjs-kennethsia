import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from '@/app/actions/recipes';
import { uploadFile } from '@/app/actions/upload';
import { ApiResponse, RecipeSchema, RecipeType } from '@/models';
import { wait } from '@/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

/** * useRecipeForm: Custom hook for managing recipe form state and actions.
 * @param recipe: Optional recipe object for editing an existing recipe.
 * @returns Object containing form methods, handlers, and state.
 */
export function useRecipeForm(recipe?: RecipeType) {
  const router = useRouter();
  // RHF useForm hook configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RecipeSchema),
    mode: 'onChange',
    defaultValues: recipe || {},
  });

  // State for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // State for image file
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Recipe ID for updates and deletions
  const recipeId = recipe?.id?.toString();

  /* Handlers */
  // handler close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  // handler to set image file from ImageViewer component
  const handleImageChange: (file: File | null) => void = (file) => {
    setImageFile(file);
  };

  // handler to upload image file
  async function uploadImage(imageFile: File, title: string) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('fileName', `${title}.jpg`);
    // uploadFile server action
    const res = await uploadFile(formData);
    if (res.error) {
      console.error('Error uploading image:', res.error);
      return false;
    }
    return true;
  }

  // handler to submit data for creating a new recipe
  const onSubmit = async (data: RecipeType) => {
    if (imageFile) await uploadImage(imageFile, data.title);

    const payload = {
      ...data,
      imageFilename: `${data.title}.jpg`,
    };

    // createRecipe server action
    const { data: recipe, error } = await createRecipe(payload);

    if (error) {
      if (error === 'Recipe title must be unique') {
        setSnackbarMessage('Recipe title must be unique');
        setOpenSnackbar(true);
        return;
      }
      throw new Error(`Error submitting recipe: ${error}`);
    }
    // Show success message
    setSnackbarMessage('Recipe created successfully!');
    setOpenSnackbar(true);
    // Redirect to the recipe list after creation
    router.push('/recipes/' + recipe?.id);
  };

  // handler to update an existing recipe
  const onUpdate = async (data: RecipeType) => {
    if (!recipeId) {
      throw new Error('No recipe ID provided for update.');
    }

    if (imageFile) await uploadImage(imageFile, data.title);

    const payload = {
      ...data,
      imageFilename: `${data.title}.jpg`,
    };

    // updateRecipe server action
    const { error } = await updateRecipe(recipeId, payload);
    if (error) {
      throw new Error(`Error updating recipe: ${error}`);
    }
    // Show success message
    setSnackbarMessage('Recipe updated successfully!');
    setOpenSnackbar(true);
    await wait(2000);
    // Redirect to the recipe list after update
    router.push('/');
  };

  // handler to delete a recipe
  const onDelete = async (recipeId: string) => {
    const { error }: ApiResponse<RecipeType> = await deleteRecipe(recipeId);
    if (error) {
      throw new Error(`Error deleting recipe: ${error}`);
    }
    router.push('/');
  };

  return {
    register,
    handleSubmit,
    errors,
    handleImageChange,
    onSubmit,
    onUpdate,
    onDelete,
    recipeId,
    handleCloseSnackbar,
    openSnackbar,
    snackbarMessage,
  };
}
