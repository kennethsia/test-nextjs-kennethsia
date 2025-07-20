'use client';

import { RecipeType } from '@/models';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRecipeForm } from '../hooks/useRecipeForm';
import ImageViewer from './ImageViewer';
import Form from './layout/Form';

type Props = {
  recipe?: RecipeType;
};

/**
 * RecipeForm: Component to display a form for viewing, creating or editing a recipe.
 * @param recipe - An object containing the recipe data for editing (optional)
 */
export default function RecipeForm({ recipe }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    handleImageChange,
    onSubmit,
    onUpdate,
    onDelete,
    recipeId,
  } = useRecipeForm(recipe);

  return (
    <Form
      image={
        <>
          <Box>
            <Button
              type="submit"
              color="primary"
              component={Link}
              href={'/'}
              startIcon={<ChevronLeft />}
              size="large"
            >
              Back to Recipes
            </Button>
          </Box>
          <ImageViewer
            fileName={recipe?.imageFilename ?? null}
            onImageChange={handleImageChange}
          />
        </>
      }
    >
      <Stack
        component="form"
        sx={{ '& > :not(style)': { m: 1 } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(recipeId ? onUpdate : onSubmit)}
      >
        {/* Name */}
        <TextField
          id="name"
          label="YOUR NAME"
          variant="outlined"
          size="small"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register('name')}
        />

        {/* Email */}
        <TextField
          id="email"
          label="EMAIL ADDRESS"
          type="email"
          variant="outlined"
          size="small"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
        {/* Title */}
        <TextField
          id="title"
          label="TITLE"
          variant="outlined"
          size="small"
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register('title')}
        />
        {/* Description */}
        <TextField
          id="description"
          label="DESCRIPTION"
          variant="outlined"
          size="small"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description')}
        />
        {/* Ingredients */}
        <TextField
          id="ingredients"
          label="INGREDIENTS"
          variant="outlined"
          size="small"
          multiline
          rows={4}
          error={!!errors.ingredients}
          helperText={errors.ingredients?.message}
          {...register('ingredients')}
        />
        {/* Instructions */}
        <TextField
          id="instructions"
          label="INSTRUCTIONS"
          variant="outlined"
          size="small"
          multiline
          rows={4}
          error={!!errors.instructions}
          helperText={errors.instructions?.message}
          {...register('instructions')}
        />
        <Stack direction="row" spacing={2} justifyContent={'flex-end'}>
          {recipeId && (
            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={() => onDelete(recipeId)}
            >
              Delete
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
