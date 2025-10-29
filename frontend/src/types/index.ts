export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon?: string;
  color?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  date: string;
  categoryId: string;
  category: Category;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyReport {
  summary: {
    income: number;
    expense: number;
    balance: number;
    transactionCount: number;
  };
  byCategory: Array<{
    category: Category;
    total: number;
    count: number;
  }>;
  dailyData: Array<{
    date: string;
    income: number;
    expense: number;
  }>;
  transactions: Transaction[];
}

export interface YearlyReport {
  summary: {
    income: number;
    expense: number;
    balance: number;
    transactionCount: number;
  };
  monthlyData: Array<{
    month: number;
    income: number;
    expense: number;
    balance: number;
  }>;
  byCategory: Array<{
    category: Category;
    total: number;
    count: number;
  }>;
}
