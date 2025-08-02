import { format, startOfDay, startOfWeek, startOfMonth } from 'date-fns';

/**
 * Group transactions by time period (day, week, month)
 * @param {Array} transactions - Array of transaction objects
 * @param {string} period - 'day', 'week', or 'month'
 * @returns {Array} Array of grouped data for chart display
 */
export const groupTransactionsByPeriod = (transactions, period = 'day') => {
  const groups = {};
  
  transactions.forEach(transaction => {
    let groupKey;
    
    switch (period) {
      case 'week':
        groupKey = format(startOfWeek(transaction.timestamp), 'yyyy-MM-dd');
        break;
      case 'month':
        groupKey = format(startOfMonth(transaction.timestamp), 'yyyy-MM-dd');
        break;
      case 'day':
      default:
        groupKey = format(startOfDay(transaction.timestamp), 'yyyy-MM-dd');
        break;
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = {
        date: groupKey,
        income: 0,
        expenses: 0,
        transactions: []
      };
    }
    
    if (transaction.type === 'sale') {
      groups[groupKey].income += transaction.amount;
    } else if (transaction.type === 'expense') {
      groups[groupKey].expenses += transaction.amount;
    }
    
    groups[groupKey].transactions.push(transaction);
  });
  
  // Convert to array and calculate net profit
  return Object.values(groups)
    .map(group => ({
      ...group,
      netProfit: group.income - group.expenses,
      formattedDate: formatDateForDisplay(group.date, period)
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Format date for chart display
 * @param {string} dateString - Date string in yyyy-MM-dd format
 * @param {string} period - Time period for formatting context
 * @returns {string} Formatted date string
 */
const formatDateForDisplay = (dateString, period) => {
  const date = new Date(dateString);
  
  switch (period) {
    case 'week':
      return format(date, 'MMM dd');
    case 'month':
      return format(date, 'MMM yyyy');
    case 'day':
    default:
      return format(date, 'MMM dd');
  }
};

/**
 * Calculate summary statistics
 * @param {Array} groupedData - Grouped transaction data
 * @returns {Object} Summary statistics
 */
export const calculateSummary = (groupedData) => {
  const totals = groupedData.reduce(
    (acc, group) => ({
      totalIncome: acc.totalIncome + group.income,
      totalExpenses: acc.totalExpenses + group.expenses,
      totalNetProfit: acc.totalNetProfit + group.netProfit
    }),
    { totalIncome: 0, totalExpenses: 0, totalNetProfit: 0 }
  );
  
  return {
    ...totals,
    averageDailyIncome: totals.totalIncome / (groupedData.length || 1),
    averageDailyExpenses: totals.totalExpenses / (groupedData.length || 1),
    averageDailyProfit: totals.totalNetProfit / (groupedData.length || 1),
    profitMargin: totals.totalIncome > 0 ? (totals.totalNetProfit / totals.totalIncome) * 100 : 0
  };
};
