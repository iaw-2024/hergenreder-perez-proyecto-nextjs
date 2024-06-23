import InfoProductoEdit from "@/app/ui/admin/infoProductoEdit";
import { ProductFormSkeleton } from "@/app/ui/admin/skeletons";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id : string } }) {
    return (
      <div className="gap-6 items-start max-w-6xl mx-auto">
        <Suspense fallback={<ProductFormSkeleton />}>
          <InfoProductoEdit id={params.id}/>
        </Suspense>
      </div>
    )
  }
