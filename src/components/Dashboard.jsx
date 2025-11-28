import React, { useEffect } from "react";
import useTransactionStore from "../store/transactionStore";

const Dashboard = () => {
  const { getSummary, summary } = useTransactionStore();

  useEffect(() => {
    getSummary();
  }, []);


  return (
    <div className="flex-col ">
      <h1>Dashboard</h1>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Income</div>
          <div className="stat-value">{summary?.total_income || 0}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Expense</div>
          <div className="stat-value">{summary?.total_expense || 0}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Balance</div>
          <div className="stat-value">{summary?.balance || 0}</div>
        </div>
      </div>

      {/* Income List */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Income by Category</h2>

        {summary?.by_category
          ?.filter((type) => type.type === "income")
          .map((cat, index) => (
            <div
              key={index}
              className="p-3 bg-base-100 rounded shadow mb-2"
            >
              <div className="font-semibold">
                {cat.Category.icon} {cat.Category.name}
              </div>
              <div className="text-sm opacity-60">{cat.total_amount}</div>
            </div>
          ))}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Expense by Category</h2>

        {summary?.by_category
          ?.filter((type) => type.type === "expense")
          .map((cat,index) => (
            <div
              key={index}
              className="p-3 bg-base-100 rounded shadow mb-2"
            >
              <div className="font-semibold">
                {cat.Category.icon} {cat.Category.name}
              </div>
              <div className="text-sm opacity-60">{cat.total_amount}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
