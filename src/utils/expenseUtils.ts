
import { categories, Category, Expense } from "../data/sampleData";

// Format currency (USD)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date to readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
};

// Get category by ID
export const getCategoryById = (categoryId: string): Category => {
  return categories.find(cat => cat.id === categoryId) || categories[categories.length - 1];
};

// Calculate total expenses
export const calculateTotal = (expenses: Expense[]): number => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

// Group expenses by category
export const getExpensesByCategory = (expenses: Expense[]) => {
  const grouped = expenses.reduce((acc: Record<string, number>, expense) => {
    if (!acc[expense.categoryId]) {
      acc[expense.categoryId] = 0;
    }
    acc[expense.categoryId] += expense.amount;
    return acc;
  }, {});

  return Object.entries(grouped).map(([categoryId, amount]) => {
    const category = getCategoryById(categoryId);
    return {
      name: category.name,
      value: amount,
      color: category.color
    };
  }).sort((a, b) => b.value - a.value); // Sort by value (highest first)
};

// Get current month expenses
export const getCurrentMonthExpenses = (expenses: Expense[]): Expense[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
};

// Calculate month-over-month change
export const calculateMonthOverMonthChange = (expenses: Expense[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  let previousMonth = currentMonth - 1;
  let previousYear = currentYear;
  
  if (previousMonth < 0) {
    previousMonth = 11;
    previousYear -= 1;
  }
  
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  
  const previousMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === previousMonth && expenseDate.getFullYear() === previousYear;
  });
  
  const currentTotal = calculateTotal(currentMonthExpenses);
  const previousTotal = calculateTotal(previousMonthExpenses);
  
  if (previousTotal === 0) return 0;
  
  return ((currentTotal - previousTotal) / previousTotal) * 100;
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
