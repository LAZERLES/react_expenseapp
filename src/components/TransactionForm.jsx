// pages/AddTransaction.jsx - PRACTICE VERSION
import { useEffect, useState } from "react";
import useCategoryStore from "../store/categoryStore";
import useTransactionStore from "../store/transactionStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TransactionForm = ({ iniData = null }) => {
  const { getCategories, categories } = useCategoryStore();
  const { createTransaction, updateTransaction } = useTransactionStore();
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState(
    iniData || {
      title: "",
      amount: "",
      type: "expense",
      category_id: "",
      transaction_date: new Date().toISOString().split("T")[0],
      description: "",
    }
  );

  const isEdit = Boolean(iniData);

  // Filter categories by type
  const filteredCategories = categories.filter(
    (cate) => cate.type === formData.type
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      // Reset category when type changes
      ...(name === "type" && { category_id: "" }),
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form

    // Check title
    if (!formData.title.trim()) {
      alert("⚠️ Please enter a title");
      return;
    }

    // Check amount
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("⚠️ Please enter a valid amount greater than 0");
      return;
    }

    // Check category
    if (!formData.category_id) {
      alert("⚠️ Please select a category");
      return;
    }

    // Send form data to API
    const dataToSend = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    let result;
    if (isEdit) {
      result = await updateTransaction(iniData.id, dataToSend);
    } else {
      result = await createTransaction(dataToSend);
    }

    if (result.success) {
      toast.success(isEdit ? "Updated successfully!" : "Added successfully!");

      // reset only if adding
      if (!isEdit) {
        // Reset form
        setFormData({
          title: "",
          amount: "",
          type: "expense",
          category_id: "",
          transaction_date: new Date().toISOString().split("T")[0],
          description: "",
        });

        setTimeout(() => {
          navigate("/transactions");
        }, 1000);
      } else {
        toast.error(result.error || "Failed to add transaction");
      }
    }
  };
  // Handle form reset
  const handleReset = () => {
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category_id: "",
      transaction_date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <div className="flex flex-1 justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-base-200 border-base-300 rounded-box border p-6 lg:p-8"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h1>
        </div>

        {/* Title */}
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text text-xl">Title</span>
            <span className="label-text-alt text-error">* Required</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            className="input input-bordered w-full"
            placeholder="e.g., Lunch at restaurant"
            onChange={handleChange}
          />
          <label className="label"></label>
        </div>

        {/* Amount */}
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text text-xl">Amount</span>
            <span className="label-text-alt text-error">* Required</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            name="amount"
            value={formData.amount}
            className="input input-bordered w-full"
            placeholder="0.00"
            onChange={handleChange}
          />
          <label className="label"></label>
        </div>

        {/* Type */}
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text text-xl">Type</span>
            <span className="label-text-alt text-error">* Required</span>
          </label>
          <select
            name="type"
            value={formData.type}
            className="select select-bordered w-full"
            onChange={handleChange}
          >
            <option value="expense">💸 Expense</option>
            <option value="income">💰 Income</option>
          </select>
          <label className="label">
            <span className="label-text-alt text-info">
              ℹ️ Category list changes when you change type
            </span>
          </label>
        </div>

        {/* Category */}
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text text-xl">Category</span>
            <span className="label-text-alt text-error">* Required</span>
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            className="select select-bordered w-full"
            onChange={handleChange}
          >
            <option value="">-- Select Category --</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
                {category.type}
              </option>
            ))}
          </select>
          <label className="label">
            <span className="label-text-alt text-success">
              ✓ {filteredCategories.length} categories for {formData.type}
            </span>
          </label>
        </div>

        {/* Date */}
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text text-xl">Transaction Date</span>
            <span className="label-text-alt text-error">* Required</span>
          </label>
          <input
            type="date"
            name="transaction_date"
            value={formData.transaction_date}
            max={new Date().toISOString().split("T")[0]}
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <label className="label">
            <span className="label-text-alt text-warning">
              ⚠️ Cannot select future dates
            </span>
          </label>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full mb-6">
          <label className="label">
            <span className="label-text text-xl">Description</span>
            <span className="label-text-alt">Optional</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            className="textarea textarea-bordered h-24"
            placeholder="Add notes here... (optional)"
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary flex-1">
            {isEdit ? "💾 Save Changes" : "📝 Add Transaction"}
          </button>

          {!isEdit && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                handleReset()
              }
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
