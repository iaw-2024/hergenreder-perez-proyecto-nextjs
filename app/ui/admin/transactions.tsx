"use client"
import React, { useState, useEffect } from "react"
import { getTransactions, getItemsForTransactions} from "@/app/lib/dataAdmin";
import { Button } from "../button";
import { QueryResultRow } from "@vercel/postgres";

export default function Transactions({
    currentPage,
  }: {
    currentPage: number;
  }) 
 {

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

    const toggleTransactionDetails = async (id: string) => {
        try {
          if (expandedTransactionId === id) {
            setExpandedTransactionId(null);
            setExpandedItems(null);
          } else {
            setExpandedTransactionId(id);
            const items = await getItemsForTransactions(id);
            setExpandedItems(items);
          }
        } catch (error) {
          console.error("Error fetching items for transaction:", error);
        }
      };

      useEffect(() => {
        fetchTransactions();
      });

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-muted text-muted-foreground">
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Id</th>
            <th className="px-4 py-3 text-right">Total</th>
            <th className="px-4 py-3 text-right">Items</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <tr className="border-b">
                <td className="px-4 py-3 font-medium">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-medium">{transaction.id}</td>
                <td className="px-4 py-3 text-right font-medium">${transaction.amount}</td>
                <td className="px-4 py-3 text-right ">
                    <div className="flex justify-end">
                        <Button onClick={() => toggleTransactionDetails(transaction.id)}>
                            <ChevronDownIcon/>
                        </Button>
                    </div>
                </td>
              </tr>
              {expandedTransactionId === transaction.id && expandedItems!==null && (
                <tr>
                  <td colSpan={3} className="px-4 py-3">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/20">
                          <th className="px-4 py-2 text-left">Item</th>
                          <th className="px-4 py-2 text-right">IdItem</th>
                          <th className="px-4 py-2 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expandedItems.map((expandedItems) => {
                          return (
                            <tr key={expandedItems.iditem}>
                              <td className="px-4 py-2">{expandedItems.title}</td>
                              <td className="px-4 py-2 text-right">{expandedItems.iditem}</td>
                              <td className="px-4 py-2 text-right">${expandedItems.unit_price}</td>
                            </tr>
                          );
                        })}
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