import Home from '@/components/layout/Home';
import LoadingComponent from '@/components/LoadingComponent';
import RecipesList from '@/components/RecipesList';
import { RecipeSearchParams } from '@/models';
import { Suspense } from 'react';

type Props = {
  searchParams: RecipeSearchParams;
};

export default async function RecipesPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Home filter={<></>}>
        <RecipesList searchParams={searchParams} />
      </Home>
    </Suspense>
  );
}
