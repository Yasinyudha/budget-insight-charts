
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getExpensesByCategory, formatCurrency, getCategoryById } from "../utils/expenseUtils";
import { Expense } from "../data/sampleData";
import CategoryBadge from "./CategoryBadge";

interface ExpenseChartProps {
  expenses: Expense[];
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const category = getCategoryById(data.categoryId);
    
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <CategoryBadge category={category} size="md" />
        <p className="text-gray-700 font-medium mt-2">{formatCurrency(data.value)}</p>
        <p className="text-gray-500 text-sm">
          {Math.round(data.percent * 100)}% of total
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="mt-4 space-y-2">
      {payload.map((entry: any, index: number) => {
        const category = getCategoryById(entry.payload.categoryId);
        return (
          <li key={`item-${index}`} className="flex items-center justify-between">
            <div className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-sm">{entry.value}</span>
            </div>
            <span className="text-sm font-medium">
              {formatCurrency(entry.payload.value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  // Get total for percentage calculation
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Get chart data and enhance with category ID and percentage
  const rawChartData = getExpensesByCategory(expenses);
  const chartData = rawChartData.map(item => {
    const categoryId = expenses.find(e => 
      getCategoryById(e.categoryId).name === item.name
    )?.categoryId || "";
    
    return {
      ...item,
      categoryId,
      percent: item.value / total
    };
  });

  // If there's no expense data, show a message
  if (expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Add expenses to see your spending breakdown</p>
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius={90}
            innerRadius={45}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
