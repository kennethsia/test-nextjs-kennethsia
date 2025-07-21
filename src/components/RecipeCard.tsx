'use client';

import { RecipeType } from '@/models';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

type Props = {
  recipe: RecipeType;
};

/**
 * RecipeCard: Display a card for a recipe.
 * @param recipe - An object containing the recipe information
 */
export default function RecipeCard({ recipe }: Props) {
  const testId = `recipe-card-${recipe.title.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <Card
      component={Link}
      href={`/recipes/${recipe.id}`}
      elevation={3}
      data-testid={testId}
      sx={{
        display: 'flex',
        minHeight: '250px',
        mb: 2,
        textDecoration: 'none',
        color: 'inherit',
      }}
      key={recipe.id}
    >
      <Box
        sx={{
          position: 'relative',
          width: 300,
          minHeight: 250,
          flexShrink: 0,
        }}
      >
        <FavoriteButton recipe={recipe} />
        <Image
          src={`/${recipe.imageFilename}?v=${Date.now()}`}
          alt="Recipe Image"
          fill
          style={{ objectFit: 'cover', borderRadius: '8px 0 0 8px' }}
        />
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {recipe.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Added by:</strong> {recipe.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Date:</strong>{' '}
            {recipe.createdDate
              ? new Date(recipe.createdDate).toLocaleDateString()
              : 'N/A'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
