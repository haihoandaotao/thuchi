import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getMonthlyReport = async (req: AuthRequest, res: Response) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month are required' });
    }

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    const income = transactions
      .filter((t) => t.category.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.category.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    // Group by category
    const byCategory = transactions.reduce((acc: any, t) => {
      const key = t.category.id;
      if (!acc[key]) {
        acc[key] = {
          category: t.category,
          total: 0,
          count: 0,
        };
      }
      acc[key].total += t.amount;
      acc[key].count += 1;
      return acc;
    }, {});

    // Daily breakdown
    const dailyData = transactions.reduce((acc: any, t) => {
      const date = t.date.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (t.category.type === 'INCOME') {
        acc[date].income += t.amount;
      } else {
        acc[date].expense += t.amount;
      }
      return acc;
    }, {});

    res.json({
      summary: {
        income,
        expense,
        balance,
        transactionCount: transactions.length,
      },
      byCategory: Object.values(byCategory),
      dailyData: Object.values(dailyData),
      transactions,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getYearlyReport = async (req: AuthRequest, res: Response) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ error: 'Year is required' });
    }

    const startDate = new Date(Number(year), 0, 1);
    const endDate = new Date(Number(year), 11, 31, 23, 59, 59);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    const income = transactions
      .filter((t) => t.category.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.category.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    // Monthly breakdown
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
      balance: 0,
    }));

    transactions.forEach((t) => {
      const month = t.date.getMonth();
      if (t.category.type === 'INCOME') {
        monthlyData[month].income += t.amount;
      } else {
        monthlyData[month].expense += t.amount;
      }
      monthlyData[month].balance = monthlyData[month].income - monthlyData[month].expense;
    });

    // Category breakdown
    const byCategory = transactions.reduce((acc: any, t) => {
      const key = t.category.id;
      if (!acc[key]) {
        acc[key] = {
          category: t.category,
          total: 0,
          count: 0,
        };
      }
      acc[key].total += t.amount;
      acc[key].count += 1;
      return acc;
    }, {});

    res.json({
      summary: {
        income,
        expense,
        balance,
        transactionCount: transactions.length,
      },
      monthlyData,
      byCategory: Object.values(byCategory),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCategoryReport = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, type } = req.query;

    const where: any = { userId: req.userId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    if (type) {
      where.category = { type };
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        category: true,
      },
    });

    const byCategory = transactions.reduce((acc: any, t) => {
      const key = t.category.id;
      if (!acc[key]) {
        acc[key] = {
          category: t.category,
          total: 0,
          count: 0,
          percentage: 0,
        };
      }
      acc[key].total += t.amount;
      acc[key].count += 1;
      return acc;
    }, {});

    const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    // Calculate percentages
    Object.values(byCategory).forEach((cat: any) => {
      cat.percentage = total > 0 ? (cat.total / total) * 100 : 0;
    });

    res.json({
      total,
      categories: Object.values(byCategory),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
