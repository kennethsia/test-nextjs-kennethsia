import LoadingComponent from '@/components/LoadingComponent';
import Recipe from '@/components/Recipe';
import { Suspense } from 'react';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipeCreatePage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Recipe id={id} />
    </Suspense>
  );
}
