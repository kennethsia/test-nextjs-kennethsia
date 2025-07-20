import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'Required' }),
  email: z.email(),
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  ingredients: z.string().min(1, { message: 'Required' }),
  instructions: z.string().min(1, { message: 'Required' }),
  imageFilename: z.string().optional(),
  createdDate: z.iso.datetime().optional(),
  favorite: z.string().optional(),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
