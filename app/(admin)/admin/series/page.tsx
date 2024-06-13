import Pagination from '@/app/ui/pagination';
import { ProductoCardEditSkeleton } from "@/app/ui/admin/skeletons"
import { Suspense } from 'react';
import { fetchProductosTotalPages } from '@/app/lib/dataProductos';
import ProductoCardEdit from "@/app/ui/admin/productoCardEdit";

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
  const totalPages = await fetchProductosTotalPages(query, "serie");

  return (
    <div>
      <Suspense fallback={<ProductoCardEditSkeleton />}>
        <ProductoCardEdit type="serie" query={query} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}