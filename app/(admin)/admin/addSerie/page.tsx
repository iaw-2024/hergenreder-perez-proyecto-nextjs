
import AddSerieForm from "@/app/ui/admin/addSerieForm";
import { ProductFormSkeleton } from "@/app/ui/admin/skeletons";
import { Suspense } from "react";

export default async function Page() {
    return (
      <div className="gap-6 items-start max-w-6xl mx-auto">
        <Suspense fallback={<ProductFormSkeleton />}>
          <AddSerieForm/>
        </Suspense>
      </div>
    )
  }