import { InfoProductSkeleton } from "@/app/ui/skeletons"
import InfoProducto from "@/app/ui/infoProducto"
import { Suspense } from "react"
import { fetchUnProducto } from "@/app/lib/dataProductos";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchUnProducto(params.id);

  if (!data || data === undefined) {
    notFound();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto">
      <Suspense fallback={<InfoProductSkeleton />}>
        <InfoProducto data={data}/>
      </Suspense>
    </div>
  )
}