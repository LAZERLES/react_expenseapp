import React, { useEffect } from "react";
import useTransactionStore from "../store/transactionStore";
import { Pencil, Trash2 } from "lucide-react";
import AddTransaction from "./TransactionForm";

const Transaction = () => {
  const {
    getTransactions,
    transactions,
    deleteTransaction,
    getBalance,
    balance,
  } = useTransactionStore();

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    await getBalance();
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTransactions();
      await getBalance();
    };
    fetchData();
  }, []);

  return (
    <div className="flex-col">
      <h1 className="p-4 pb-2 text-4xl font-semibold text-base-content tracking-wide">
        Transaction {transactions.length}
      </h1>

      <div className="stats shadow mb-4">
        <div className="stat">
          <div className="stat-title">Total Balance Views</div>
          <div className="stat-value">{balance}</div>
        </div>
      </div>

      <ul className="list flex-1 bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl font-semibold text-base-content tracking-wide">
          All Transactions
        </li>

        {transactions.length > 0 &&
          transactions.map((transaction, index) => {
            const modalId = `edit_modal_${transaction.id}`;

            return (
              <li className="list-row" key={transaction.id}>
                {/* Left user icon + number */}
                <div className="flex gap-3 pt-5 pb-5 pl-5">
                  <div className="text-4xl font-thin opacity-30 tabular-nums p-0.5">
                    {index + 1}
                  </div>
                  <div className="p-1 text-3xl">
                    {transaction.Category?.icon || "💸"} 
                  </div>
                </div>

                {/* Middle content */}
                <div className="list-col-grow collapse">
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-semibold">
                    {transaction.title}
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {transaction.type}
                    </div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {transaction.amount}
                    </div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      at: {transaction.createdAt.split('T')[1].split('.',)[0]} on {transaction.transaction_date}
                    </div>
                  </div>
                  <div className="collapse-content text-sm">
                    <p className="text-lg font-semibold">Description</p>
                    {transaction.description || "No description"}
                  </div>
                </div>

                {/* EDIT BUTTON */}
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => document.getElementById(modalId).showModal()}
                >
                  <Pencil />
                </button>

                {/* EDIT MODAL */}
                <dialog id={modalId} className="modal">
                  <div className="modal-box max-w-2xl">
                    {/* Reusable transaction form with data */}
                    <AddTransaction iniData={transaction} />

                    <div className="modal-action mt-4">
                      <form method="dialog">
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>

                {/* DELETE BUTTON */}
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => handleDelete(transaction.id)}
                >
                  <Trash2 />
                </button>
              </li>
            );
          })}
      </ul>

      {transactions.length === 0 && (
        <p className="p-4 text-lg opacity-70">You have no transaction yet.</p>
      )}
    </div>
  );
};

export default Transaction;
