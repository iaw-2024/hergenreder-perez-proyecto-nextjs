import { getTransactionsForPage } from "@/app/lib/dataAdmin";
import Transactions from "@/app/ui/admin/transactions";
import Pagination from "@/app/ui/pagination";
import { Suspense } from "react";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        page?: string;
    };
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await getTransactionsForPage();

    return (
        <>
            <div className="xl:w-3/4 mx-auto text-white bg-gray-950 rounded-lg p-6 w-full">
            <Suspense fallback={<>loading...</>}>
                <Transactions currentPage={currentPage}/>
            </Suspense>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </>
    )
}