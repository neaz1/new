import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Button } from '../components/ui/Button';
import { Filter, Plus, Calendar } from 'lucide-react';
import { format, subDays, subMonths, isWithinInterval, parseISO } from 'date-fns';

// Generate mock data for financial analytics
const generateFinancialData = () => {
  return {
    totalRevenue: 2500000,
    pendingRevenue: 750000,
    expenses: 850000,
    profit: 1650000,
    dailyStats: {
      revenue: 125000,
      expenses: 45000,
      profit: 80000
    }
  };
};

// Generate mock data for charts
const generateDailyData = () => {
  const days = ['شەممە', 'یەک شەممە', 'دوو شەممە', 'سێ شەممە', 'چوار شەممە', 'پێنج شەممە', 'هەینی'];
  return days.map(day => ({
    day,
    داهات: Math.floor(Math.random() * 50000) + 10000,
    خەرجی: Math.floor(Math.random() * 30000) + 5000,
    قازانج: Math.floor(Math.random() * 20000) + 5000,
    گەیاندن: Math.floor(Math.random() * 50) + 10,
    کێشەکان: Math.floor(Math.random() * 10),
  }));
};

const generateMonthlyData = () => {
  const months = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢'];
  return months.map(month => ({
    month,
    داهات: Math.floor(Math.random() * 1500000) + 500000,
    خەرجی: Math.floor(Math.random() * 900000) + 300000,
    قازانج: Math.floor(Math.random() * 600000) + 200000,
    گەیاندن: Math.floor(Math.random() * 1000) + 200,
    کێشەکان: Math.floor(Math.random() * 100) + 20,
  }));
};

const generateExpenseCategories = () => {
  return [
    { name: 'کرێی شۆفێر', amount: 350000 },
    { name: 'سووتەمەنی', amount: 180000 },
    { name: 'چاککردنەوە', amount: 120000 },
    { name: 'موچەی کارمەندان', amount: 450000 },
    { name: 'کرێی بینا', amount: 200000 },
    { name: 'خەرجی تر', amount: 100000 },
  ];
};

type ExpenseFormData = {
  category: string;
  amount: number;
  description: string;
  date: string;
};

export function Analytics() {
  const [timeRange, setTimeRange] = useState<'daily' | 'monthly'>('daily');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });
  const [expenseForm, setExpenseForm] = useState<ExpenseFormData>({
    category: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Generate data based on date range
  const generateDataForDateRange = () => {
    const start = parseISO(dateRange.start);
    const end = parseISO(dateRange.end);
    
    return timeRange === 'daily' 
      ? generateDailyData().filter(data => {
          const date = new Date(); // Simulate date for mock data
          return isWithinInterval(date, { start, end });
        })
      : generateMonthlyData().filter(data => {
          const date = new Date(); // Simulate date for mock data
          return isWithinInterval(date, { start, end });
        });
  };

  const financialData = generateFinancialData();
  const currentData = generateDataForDateRange();
  const expenseCategories = generateExpenseCategories();
  const xDataKey = timeRange === 'daily' ? 'day' : 'month';

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the expense data
    console.log('New expense:', expenseForm);
    setShowExpenseModal(false);
    setExpenseForm({
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ژمێریاری</h1>
          <p className="text-gray-600 dark:text-gray-400">شیکردنەوەی داتاکان و ڕاپۆرتەکان</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Date Range Selector */}
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Quick Date Filters */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDateRange({
                start: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                end: format(new Date(), 'yyyy-MM-dd')
              })}
            >
              ٧ ڕۆژ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDateRange({
                start: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
                end: format(new Date(), 'yyyy-MM-dd')
              })}
            >
              ٣٠ ڕۆژ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDateRange({
                start: format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
                end: format(new Date(), 'yyyy-MM-dd')
              })}
            >
              ٣ مانگ
            </Button>
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">هەموو شارەکان</option>
            <option value="هەولێر">هەولێر</option>
            <option value="سلێمانی">سلێمانی</option>
            <option value="دهۆک">دهۆک</option>
            <option value="کەرکوک">کەرکوک</option>
            <option value="هەڵەبجە">هەڵەبجە</option>
          </select>

          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => setShowExpenseModal(true)}
          >
            تۆمارکردنی خەرجی
          </Button>

          <div className="flex gap-2">
            <Button
              variant={timeRange === 'daily' ? 'primary' : 'outline'}
              onClick={() => setTimeRange('daily')}
            >
              ڕۆژانە
            </Button>
            <Button
              variant={timeRange === 'monthly' ? 'primary' : 'outline'}
              onClick={() => setTimeRange('monthly')}
            >
              مانگانە
            </Button>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">کۆی داهات</h3>
          <p className="text-2xl font-bold text-success-600 dark:text-success-400 mt-1">
            {financialData.totalRevenue.toLocaleString()} د.ع
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            چاوەڕوانکراو: {financialData.pendingRevenue.toLocaleString()} د.ع
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">کۆی خەرجی</h3>
          <p className="text-2xl font-bold text-danger-600 dark:text-danger-400 mt-1">
            {financialData.expenses.toLocaleString()} د.ع
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ڕۆژانە: {financialData.dailyStats.expenses.toLocaleString()} د.ع
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">قازانجی پاک</h3>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-1">
            {financialData.profit.toLocaleString()} د.ع
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ڕۆژانە: {financialData.dailyStats.profit.toLocaleString()} د.ع
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ڕێژەی قازانج</h3>
          <p className="text-2xl font-bold text-warning-600 dark:text-warning-400 mt-1">
            {Math.round((financialData.profit / financialData.totalRevenue) * 100)}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            بەراورد بە مانگی پێشوو: +5%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">داهات و خەرجی</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="داهات" fill="#10b981" />
                <Bar dataKey="خەرجی" fill="#ef4444" />
                <Bar dataKey="قازانج" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">دابەشکردنی خەرجیەکان</h2>
          <div className="space-y-4">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category.amount.toLocaleString()} د.ع
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{
                        width: `${(category.amount / financialData.expenses) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profit Trend */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">ڕەوتی قازانج</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="قازانج" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">ئاماری ڕۆژانە</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xDataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="داهات" stackId="1" fill="#10b981" stroke="#10b981" />
                <Area type="monotone" dataKey="خەرجی" stackId="1" fill="#ef4444" stroke="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                تۆمارکردنی خەرجی نوێ
              </h2>

              <form onSubmit={handleExpenseSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    جۆری خەرجی
                  </label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">هەڵبژاردنی جۆر</option>
                    <option value="کرێی شۆفێر">کرێی شۆفێر</option>
                    <option value="سووتەمەنی">سووتەمەنی</option>
                    <option value="چاککردنەوە">چاککردنەوە</option>
                    <option value="موچەی کارمەندان">موچەی کارمەندان</option>
                    <option value="کرێی بینا">کرێی بینا</option>
                    <option value="خەرجی تر">خەرجی تر</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    بڕی پارە
                  </label>
                  <input
                    type="number"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    بەروار
                  </label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    تێبینی
                  </label>
                  <textarea
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setShowExpenseModal(false)}
                  >
                    هەڵوەشاندنەوە
                  </Button>
                  <Button type="submit">
                    تۆمارکردن
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}