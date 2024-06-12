import AddMovieForm from "@/app/ui/admin/addMovieForm";
import { ProductFormSkeleton } from "@/app/ui/admin/skeletons";
import { Suspense } from "react";

export default async function Page() {
    return (
      <div className="gap-6 items-start max-w-6xl mx-auto">
        <Suspense fallback={<ProductFormSkeleton />}>
          <AddMovieForm/>
        </Suspense>
      </div>
    )
  }