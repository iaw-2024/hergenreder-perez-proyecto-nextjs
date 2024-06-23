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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsData = await getTransactions(currentPage);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

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
  <div className="w-full overflow-x-auto bg-white rounded">
      <table className="w-full table-auto bg-gray-950">
        <thead>
          <tr className="gap-4 px-6 text-gray-300">
            <th className="text-left px-4">Date</th>
            <th className="text-left px-4">User Email</th>
            <th className="text-left px-4">Status</th>
            <th className="text-left px-4">Id</th>
            <th className="text-right px-4">Amount</th>
            <th className="text-right px-4">Items</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-gray-950">
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <tr className="gap-4 text-white">
                <td className="text-left px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="text-left px-4">{transaction.payer_email}</td>
                <td className="text-left px-4">{transaction.status}</td>
                <td className="text-left px-4">{transaction.id}</td>
                <td className="text-right px-4">${transaction.amount}</td>
                <td className="flex justify-end px-4">
                  <Button onClick={() => toggleTransactionDetails(transaction.id)}>
                    <ChevronDownIcon />
                  </Button>
                </td>
              </tr>
              {expandedTransactionId === transaction.id && expandedItems !== null && (
                <tr className="bg-gray-900 rounded-lg">
                  <td colSpan={6}>
                    <table className="min-w-full bg-gray-900">
                      <thead>
                        <tr className="gap-4 p-4 text-gray-300">
                          <th className="px-4 text-left">Item</th>
                          <th className="px-4 text-left">IdItem</th>
                          <th className="px-4 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expandedItems.map((item) => (
                          <tr key={item.iditem} className="gap-4 text-white">
                            <td className="px-4 text-left">{item.title}</td>
                            <td className="px-4 text-left">{item.iditem}</td>
                            <td className="px-4 text-right">${item.unit_price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
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