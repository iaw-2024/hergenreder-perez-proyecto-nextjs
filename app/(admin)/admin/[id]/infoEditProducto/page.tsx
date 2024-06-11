import InfoProductoEdit from "@/app/ui/admin/infoProductoEdit";
import { InfoProductSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id : string } }) {
    return (
      <div className="gap-6 items-start max-w-6xl mx-auto">
        <Suspense fallback={<InfoProductSkeleton />}>
          <InfoProductoEdit id={params.id}/>
        </Suspense>
      </div>
    )
  }
