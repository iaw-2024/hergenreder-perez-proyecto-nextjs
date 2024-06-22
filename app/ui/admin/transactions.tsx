"use client"
import React, { useState, useEffect, Suspense } from "react"
import { getTransactions, getItemsForTransactions } from "@/app/lib/dataAdmin";
import { Button } from "../button";
import { QueryResultRow } from "@vercel/postgres";

export default function Transactions({
  currentPage,
}: {
  currentPage: number;
}) {

  const [transactions, setTransactions] = useState<QueryResultRow[]>([]);
  const [expandedTransactionId, setExpandedTransactionId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<QueryResultRow[] | null>(null);

  const fetchTransactions = async () => {
    try {
      const transactionsData = await getTransactions(currentPage);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const toggleTransactionDetails = async (id: string) => {
    try {
      if (expandedTransactionId === id) {
        setExpandedTransactionId(null);
        setExpandedItems(null);
        return;
      }
      setExpandedTransactionId(id);
      const items = await getItemsForTransactions(id);
      setExpandedItems(items);
    } catch (error) {
      console.error("Error fetching items for transaction:", error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
    <div className="bg-white shadow-md rounded">
      <div className="grid grid-cols-4 gap-4 px-6 bg-gray-950 text-gray-300">
        <div className="text-left">Date</div>
        <div className="text-left">Id</div>
        <div className="text-right">Total</div>
        <div className="text-right">Items</div>
      </div>
      <div className="divide-y divide-gray-200 bg-gray-950">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex flex-col">
            <div className="flex flex-row items-center justify-between px-6 py-3">
              <div className="text-left ">{new Date(transaction.date).toLocaleDateString()}</div>
              <div className="text-left ">{transaction.id}</div>
              <div className="text-right">${transaction.amount}</div>
              <Button onClick={() => toggleTransactionDetails(transaction.id)} >
                <ChevronDownIcon />
              </Button>
            </div>
            {expandedTransactionId === transaction.id && expandedItems !== null && (
             <div className="grid grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg">
             <div className="col-span-3">
               <div className="grid grid-cols-3 text-gray-300">
                 <div className="px-4 text-left">Item</div>
                 <div className="px-4 text-left">IdItem</div>
                 <div className="px-4 text-right">Price</div>
               </div>
             </div>
             {expandedItems.map((item) => (
                 <div className="col-span-3">
                  <div className="grid grid-cols-3">
                   <div className="px-4 text-left">{item.title}</div>
                   <div className="px-4 text-left">{item.iditem}</div>
                   <div className="px-4 text-right">${item.unit_price}</div>
                   </div>
                 </div>
             ))}
           </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}