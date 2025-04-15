
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from '../data/sampleData';
import { formatCurrency } from '../utils/expenseUtils';

interface MonthlyBarChartProps {
  expenses: Expense[];
}

const MonthlyBarChart = ({ expenses }: MonthlyBarChartProps) => {
  // Group expenses by month
  const monthlyData = expenses.reduce((acc: Record<string, { month: string, amount: number, order: number }>, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    const sortKey = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
    
    if (!acc[sortKey]) {
      acc[sortKey] = { 
        month: monthYear, 
        amount: 0,
        order: date.getMonth() + date.getFullYear() * 12 // For proper chronological sorting
      };
    }
    
    acc[sortKey].amount += expense.amount;
    return acc;
  }, {});
  
  // Convert to array format for Recharts and sort chronologically
  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.order - b.order)
    .map(({ month, amount }) => ({
      month,
      amount
    }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{payload[0].payload.month}</p>
          <p className="text-blue-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  if (expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-gray-500">Add expenses to see monthly trends</p>
      </div>
    );
  }

  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
