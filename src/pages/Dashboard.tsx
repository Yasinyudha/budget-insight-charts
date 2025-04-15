
import { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import { sampleExpenses, Expense } from "../data/sampleData";
import { 
  calculateTotal, 
  formatCurrency, 
  getCurrentMonthExpenses,
  calculateMonthOverMonthChange
} from "../utils/expenseUtils";
import { DollarSign, TrendingUp, List, ArrowUpRight, ArrowDownRight, PieChart, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const totalExpenses = calculateTotal(expenses);
  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const currentMonthTotal = calculateTotal(currentMonthExpenses);
  const monthOverMonthChange = calculateMonthOverMonthChange(expenses);

  // Load sample data on initial render
  useEffect(() => {
    setExpenses(sampleExpenses);
  }, []);

  // Add a new expense
  const handleAddExpense = (expense: Expense) => {
    setExpenses(prevExpenses => [expense, ...prevExpenses]);
  };

  // Delete an expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Budget Insights</h1>
        <p className="text-gray-600 mt-2">Track and visualize your expenses</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Add Expense Form */}
        <div>
          <DashboardCard title="Add New Expense">
            <ExpenseForm onAddExpense={handleAddExpense} />
          </DashboardCard>
        </div>

        {/* Middle & Right Columns - Expense Summary & Charts */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <DashboardCard title="Total Expenses" className="bg-blue-50">
              <div className="flex items-center">
                <div className="mr-3 bg-blue-100 p-3 rounded-full">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalExpenses)}</p>
              </div>
            </DashboardCard>
            
            <DashboardCard title="This Month" className="bg-green-50">
              <div className="flex items-center">
                <div className="mr-3 bg-green-100 p-3 rounded-full">
                  <List className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(currentMonthTotal)}</p>
                  <p className="text-sm text-gray-600">
                    {currentMonthExpenses.length} transaction{currentMonthExpenses.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Month-over-Month" className="bg-indigo-50">
              <div className="flex items-center">
                <div className={`mr-3 p-3 rounded-full ${monthOverMonthChange >= 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                  {monthOverMonthChange >= 0 ? (
                    <ArrowUpRight className="text-red-600" size={24} />
                  ) : (
                    <ArrowDownRight className="text-green-600" size={24} />
                  )}
                </div>
                <div>
                  <p className={`text-xl font-bold ${monthOverMonthChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {Math.abs(monthOverMonthChange).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">
                    {monthOverMonthChange >= 0 ? 'Increase' : 'Decrease'}
                  </p>
                </div>
              </div>
            </DashboardCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown Chart */}
            <DashboardCard title="Spending by Category">
              <div className="flex items-center mb-2">
                <PieChart className="text-indigo-500 mr-2" size={20} />
                <span className="text-gray-600 text-sm">Category breakdown</span>
              </div>
              <ExpenseChart expenses={expenses} />
            </DashboardCard>
            
            {/* Monthly Trend Chart */}
            <DashboardCard title="Monthly Spending">
              <div className="flex items-center mb-2">
                <BarChart3 className="text-blue-500 mr-2" size={20} />
                <span className="text-gray-600 text-sm">Your spending trends over time</span>
              </div>
              <MonthlyBarChart expenses={expenses} />
            </DashboardCard>
          </div>
          
          {/* Recent Transactions */}
          <DashboardCard title="Recent Transactions">
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
