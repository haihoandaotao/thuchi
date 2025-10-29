import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, Receipt } from 'lucide-react';
import api from '../lib/api';
import { Transaction } from '../types';
import { format } from 'date-fns';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    transactionCount: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const [reportRes, transactionsRes] = await Promise.all([
        api.get(`/reports/monthly?year=${year}&month=${month}`),
        api.get('/transactions?limit=5'),
      ]);

      setSummary(reportRes.data.summary);
      setRecentTransactions(transactionsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Thu nhập',
      value: summary.income.toLocaleString('vi-VN'),
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Chi tiêu',
      value: summary.expense.toLocaleString('vi-VN'),
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Số dư',
      value: summary.balance.toLocaleString('vi-VN'),
      icon: Wallet,
      color: summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600',
      bg: summary.balance >= 0 ? 'bg-blue-50' : 'bg-orange-50',
    },
    {
      label: 'Giao dịch',
      value: summary.transactionCount.toString(),
      icon: Receipt,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Tổng quan tháng này</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.label !== 'Giao dịch' && '₫'}
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Giao dịch gần đây</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Chưa có giao dịch nào</div>
          ) : (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{transaction.category.name}</p>
                  {transaction.description && (
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {format(new Date(transaction.date), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.category.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.category.type === 'INCOME' ? '+' : '-'}₫
                    {transaction.amount.toLocaleString('vi-VN')}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      transaction.category.type === 'INCOME'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.category.type === 'INCOME' ? 'Thu' : 'Chi'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
