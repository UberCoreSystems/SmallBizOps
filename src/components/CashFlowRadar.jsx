import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

// Mock data for demonstration
const mockTransactions = [
  { id: 1, date: '2025-07-25', amount: 1200, type: 'income', description: 'Lunch Rush Sales' },
  { id: 2, date: '2025-07-25', amount: -300, type: 'expense', description: 'Halal Meat Purchase' },
  { id: 3, date: '2025-07-26', amount: 800, type: 'income', description: 'Dinner Service Revenue' },
  { id: 4, date: '2025-07-26', amount: -150, type: 'expense', description: 'Fuel & Gas' },
  { id: 5, date: '2025-07-27', amount: 2000, type: 'income', description: 'Catering Order' },
  { id: 6, date: '2025-07-27', amount: -500, type: 'expense', description: 'Food Supplies Restocking' },
  { id: 7, date: '2025-07-28', amount: 600, type: 'income', description: 'Street Food Sales' },
  { id: 8, date: '2025-07-28', amount: -200, type: 'expense', description: 'Truck Permit Fees' },
  { id: 9, date: '2025-07-29', amount: 1500, type: 'income', description: 'Festival Sales' },
  { id: 10, date: '2025-07-29', amount: -400, type: 'expense', description: 'Staff Payment' },
  { id: 11, date: '2025-07-30', amount: 900, type: 'income', description: 'Office Catering' },
  { id: 12, date: '2025-07-30', amount: -250, type: 'expense', description: 'Equipment Maintenance' },
  { id: 13, date: '2025-07-31', amount: 1100, type: 'income', description: 'Evening Rush Sales' },
  { id: 14, date: '2025-07-31', amount: -180, type: 'expense', description: 'Insurance Payment' },
  { id: 15, date: '2025-08-01', amount: 750, type: 'income', description: 'Lunch Specials' },
  { id: 16, date: '2025-08-01', amount: -350, type: 'expense', description: 'Kitchen Equipment' },
  { id: 17, date: '2025-08-02', amount: 1300, type: 'income', description: 'Combo Platter Sales' },
  { id: 18, date: '2025-08-02', amount: -120, type: 'expense', description: 'Cleaning Supplies' }
];

// Utility functions embedded in component
const getDateRange = (days) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  return { startDate, endDate };
};

const fetchTransactions = async (startDate, endDate) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

const groupTransactionsByPeriod = (transactions, period) => {
  const grouped = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    let key;
    
    switch (period) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      default:
        key = date.toISOString().split('T')[0];
    }
    
    if (!grouped[key]) {
      grouped[key] = {
        date: key,
        income: 0,
        expenses: 0,
        transactions: []
      };
    }
    
    if (transaction.amount > 0) {
      grouped[key].income += transaction.amount;
    } else {
      grouped[key].expenses += Math.abs(transaction.amount);
    }
    
    grouped[key].transactions.push(transaction);
  });
  
  return Object.values(grouped)
    .map(group => ({
      ...group,
      netProfit: group.income - group.expenses,
      formattedDate: formatDateForDisplay(group.date, period)
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

const calculateSummary = (data) => {
  const totals = data.reduce(
    (acc, item) => ({
      totalIncome: acc.totalIncome + item.income,
      totalExpenses: acc.totalExpenses + item.expenses,
      totalNetProfit: acc.totalNetProfit + item.netProfit
    }),
    { totalIncome: 0, totalExpenses: 0, totalNetProfit: 0 }
  );
  
  return {
    ...totals,
    profitMargin: totals.totalIncome > 0 ? (totals.totalNetProfit / totals.totalIncome) * 100 : 0
  };
};

const formatDateForDisplay = (dateString, period) => {
  const date = new Date(dateString);
  
  switch (period) {
    case 'day':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'week':
      const weekEnd = new Date(date);
      weekEnd.setDate(date.getDate() + 6);
      return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    case 'month':
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    default:
      return dateString;
  }
};

const CashFlowRadar = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('day');
  const [dateRange, setDateRange] = useState(7);

  // Fetch and process data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { startDate, endDate } = getDateRange(dateRange);
        const transactions = await fetchTransactions(startDate, endDate);
        
        if (transactions.length === 0) {
          setData([]);
          setSummary(null);
          return;
        }
        
        const groupedData = groupTransactionsByPeriod(transactions, period);
        const summaryStats = calculateSummary(groupedData);
        
        setData(groupedData);
        setSummary(summaryStats);
      } catch (err) {
        setError('Failed to load cash flow data');
        console.error('Cash flow data error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [period, dateRange]);

  // Export data as JSON
  const exportData = () => {
    const exportPayload = {
      summary,
      data,
      period,
      dateRange,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cash-flow-${period}-${dateRange}days.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-green-600">
            Income: ${data.income?.toFixed(2) || '0.00'}
          </p>
          <p className="text-red-600">
            Expenses: ${data.expenses?.toFixed(2) || '0.00'}
          </p>
          <p className={`font-semibold ${data.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Net Profit: ${data.netProfit?.toFixed(2) || '0.00'}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="text-gray-600">Loading cash flow data...</span>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
            variant="secondary"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
          <p>No transactions found for the selected period.</p>
          <p className="text-sm mt-2">Try adjusting the date range or add some transactions.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cash Flow Radar</h2>
          <p className="text-gray-600">Track your halal food truck income and expenses over time</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Period selector */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
          
          {/* Date range selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          
          {/* Export button */}
          <Button onClick={exportData} variant="secondary" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">
                  ${summary.totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  ${summary.totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <DollarSign className={`h-8 w-8 ${summary.totalNetProfit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className={`text-2xl font-bold ${summary.totalNetProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${summary.totalNetProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold">%</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                <p className={`text-2xl font-bold ${summary.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.profitMargin.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Chart */}
      <Card className="p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="income" 
                fill="#22c55e" 
                name="Income"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="expenses" 
                fill="#ef4444" 
                name="Expenses"
                radius={[2, 2, 0, 0]}
              />
              <Line 
                type="monotone" 
                dataKey="netProfit" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Net Profit"
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default CashFlowRadar;
