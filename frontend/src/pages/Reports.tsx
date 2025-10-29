import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../lib/api';
import { MonthlyReport, YearlyReport } from '../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

export default function Reports() {
  const [reportType, setReportType] = useState<'monthly' | 'yearly'>('monthly');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(null);
  const [yearlyReport, setYearlyReport] = useState<YearlyReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [reportType, year, month]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      if (reportType === 'monthly') {
        const response = await api.get(`/reports/monthly?year=${year}&month=${month}`);
        setMonthlyReport(response.data);
      } else {
        const response = await api.get(`/reports/yearly?year=${year}`);
        setYearlyReport(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch report:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMonthlyReport = () => {
    if (!monthlyReport) return null;

    const pieData = monthlyReport.byCategory.map((item, index) => ({
      name: item.category.name,
      value: item.total,
      color: COLORS[index % COLORS.length],
    }));

    return (
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Thu nhập</p>
            <p className="text-2xl font-bold text-green-600">
              ₫{monthlyReport.summary.income.toLocaleString('vi-VN')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Chi tiêu</p>
            <p className="text-2xl font-bold text-red-600">
              ₫{monthlyReport.summary.expense.toLocaleString('vi-VN')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Số dư</p>
            <p className={`text-2xl font-bold ${monthlyReport.summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              ₫{monthlyReport.summary.balance.toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Daily Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Biểu đồ theo ngày</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyReport.dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10B981" name="Thu nhập" />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" name="Chi tiêu" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Phân bổ theo danh mục</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${((entry.value / monthlyReport.summary.expense) * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-8">Chưa có dữ liệu</p>
          )}
        </div>
      </div>
    );
  };

  const renderYearlyReport = () => {
    if (!yearlyReport) return null;

    const monthNames = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
    const chartData = yearlyReport.monthlyData.map((item) => ({
      month: monthNames[item.month - 1],
      income: item.income,
      expense: item.expense,
      balance: item.balance,
    }));

    return (
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Tổng thu nhập</p>
            <p className="text-2xl font-bold text-green-600">
              ₫{yearlyReport.summary.income.toLocaleString('vi-VN')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Tổng chi tiêu</p>
            <p className="text-2xl font-bold text-red-600">
              ₫{yearlyReport.summary.expense.toLocaleString('vi-VN')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Số dư</p>
            <p className={`text-2xl font-bold ${yearlyReport.summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              ₫{yearlyReport.summary.balance.toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Biểu đồ theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10B981" name="Thu nhập" />
              <Bar dataKey="expense" fill="#EF4444" name="Chi tiêu" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Báo cáo</h2>
        
        <div className="flex gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as 'monthly' | 'yearly')}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="monthly">Theo tháng</option>
            <option value="yearly">Theo năm</option>
          </select>

          {reportType === 'monthly' && (
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>
          )}

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Đang tải...</div>
      ) : (
        <>
          {reportType === 'monthly' ? renderMonthlyReport() : renderYearlyReport()}
        </>
      )}
    </div>
  );
}
