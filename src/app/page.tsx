import FavoritesFilter from '@/components/FavoritesFilter';
import Home from '@/components/layout/Home';
import LoadingComponent from '@/components/LoadingComponent';
import OrderByAscDesc from '@/components/OrderByAscDesc';
import RecipesList from '@/components/RecipesList';
import SortBy from '@/components/SortBy';
import { RecipeSearchParams } from '@/models';
import { Suspense } from 'react';

type Props = {
  searchParams: RecipeSearchParams;
};

export default async function RecipesPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Home
        filter={
          <>
            <SortBy />
            <OrderByAscDesc />
            <FavoritesFilter />
          </>
        }
      >
        <RecipesList searchParams={searchParams} />
      </Home>
    </Suspense>
  );
}
