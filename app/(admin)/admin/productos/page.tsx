import ProductCardEdit from "@/app/ui/admin/productoCardEdit";
import Pagination from '@/app/ui/pagination';
import { ProductoCardEditSkeleton } from "@/app/ui/admin/skeletons"
import { Suspense } from 'react';
import { fetchProductsPages } from '@/app/lib/dataAdmin';

export default async function Component({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages("", query);

  return (
    <div>
      <Suspense key={query + currentPage} fallback={<ProductoCardEditSkeleton />}>
        <ProductCardEdit type="" query={query} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}