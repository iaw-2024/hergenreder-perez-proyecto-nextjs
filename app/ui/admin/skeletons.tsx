
function ProductAdminCardSkeleton() {

  return (
    /*agregar mapeo para todos los productos, o una cantidad. */
    <div className="grid grid-cols-[80px_1fr_80px] items-center gap-4 bg-gray-950  rounded-md">
      <div className="w-full aspect-[80/80] bg-gray-300 animate-pulse rounded-md" />
      <div className="max-h-30 sm:block">
        <div className="mt-2 h-4 w-20 rounded-md bg-gray-400 animate-pulse" />
        <div className="mt-2 p-2 h-4 w-40 rounded-md bg-gray-200 animate-pulse" />
      </div>
    </div>
  )
}

export function ProductoCardEditSkeleton() {

  return (
    <div className="grid grid-cols-1 max-w-6xl mx-auto gap-4">
      <ProductAdminCardSkeleton />
      <ProductAdminCardSkeleton />
      <ProductAdminCardSkeleton />
      <ProductAdminCardSkeleton />
      <ProductAdminCardSkeleton />
      <ProductAdminCardSkeleton />
    </div>
  )
}

export function ProductFormSkeleton() {
  return (
    <div className="text-white bg-gray-950 rounded-lg p-6 w-full">
      <div className='flex items-center justify-between pb-4'>
        <div className="mt-2 h-5 w-20 rounded-md bg-gray-300 animate-pulse" />
        <div className="mt-2 h-8 w-20 rounded-md bg-red-500 animate-pulse" />
      </div>
      <div className="bg-[#0F1A2F] rounded-lg p-6 space-y-4">
        <div className="mt-2 h-5 w-20 rounded-md bg-gray-300 animate-pulse" />
        <div className="mt-2 h-8 w-40 rounded-md bg-gray-500 animate-pulse" />

        <div className="mt-2 h-5 w-20 rounded-md bg-gray-300 animate-pulse" />
        <div className="mt-2 h-8 w-full rounded-md bg-gray-500 animate-pulse" />

        <div className="mt-2 h-5 w-20 rounded-md bg-gray-300 animate-pulse" />
        <div className="mt-2 h-8 w-full rounded-md bg-gray-500 animate-pulse" />

        <div className="mt-2 h-5 w-20 rounded-md bg-gray-300 animate-pulse" />
        <div className="mt-2 h-8 w-full rounded-md bg-gray-500 animate-pulse" />

        <div className="mt-2 h-5 w-20 rounded-md bg-gray-300 animate-pulse" />
        <div className="mt-2 h-8 w-full rounded-md bg-gray-500 animate-pulse" />

        <div className="mt-2 h-5 w-20 rounded-md bg-gray-300 animate-pulse" />
        <div className="mt-2 h-8 w-full rounded-md bg-gray-500 animate-pulse" />
      </div>
    </div>
  )
}