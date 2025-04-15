
import { Expense } from "../data/sampleData";
import { formatCurrency, formatDate, getCategoryById } from "../utils/expenseUtils";
import { Trash2 } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense?: (id: string) => void;
}

const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  // Sort expenses by date (most recent first)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="overflow-y-auto max-h-[400px]">
      {sortedExpenses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No expenses to display</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sortedExpenses.map((expense) => {
            const category = getCategoryById(expense.categoryId);
            
            return (
              <li key={expense.id} className="py-3 flex items-center justify-between hover:bg-gray-50 rounded-md px-2 transition-colors">
                <div className="flex items-start">
                  <span
                    className="w-3 h-3 rounded-full mt-1.5 mr-3 flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  <div>
                    <p className="font-medium text-gray-800">{expense.description}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 mr-2">{formatDate(expense.date)}</span>
                      <CategoryBadge category={category} size="sm" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 mr-4">
                    {formatCurrency(expense.amount)}
                  </span>
                  {onDeleteExpense && (
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                      aria-label="Delete expense"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
