# ⚡ Quick Start Guide

## Cài đặt nhanh (tại thư mục root)

```powershell
# Cài đặt tất cả dependencies cho cả backend và frontend
npm run install:all
```

## Chạy development

### Cách 1: Chạy từng service riêng lẻ

**Terminal 1 - Backend:**
```powershell
npm run dev:backend
```

**Terminal 2 - Frontend:**
```powershell
npm run dev:frontend
```

### Cách 2: Chạy từ thư mục tương ứng

**Backend:**
```powershell
cd backend
npm run dev
```

**Frontend:**
```powershell
cd frontend
npm run dev
```

## ⚙️ Setup Database (lần đầu tiên)

```powershell
# 1. Tạo file .env trong thư mục backend
cd backend
Copy-Item .env.example .env

# 2. Chỉnh sửa DATABASE_URL trong file .env

# 3. Push schema lên database
npm run prisma:push

# 4. Generate Prisma Client
npm run prisma:generate
```

## 🌐 Truy cập ứng dụng

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Prisma Studio**: `npm run prisma:studio` (http://localhost:5555)

## 📝 Ghi chú

- Đảm bảo PostgreSQL đã chạy trước khi start backend
- Tạo database với tên `expense_manager` hoặc chỉnh sửa DATABASE_URL
- Đổi JWT_SECRET trong .env trước khi deploy production

## 🚀 Build Production

```powershell
# Build cả frontend và backend
npm run build

# Hoặc build riêng lẻ
npm run build:backend
npm run build:frontend
```

## 🛠️ Công cụ hữu ích

```powershell
# Mở Prisma Studio để quản lý database
npm run prisma:studio

# Tạo migration mới
npm run prisma:migrate

# Push schema changes (không tạo migration)
npm run prisma:push
```

---

Need help? Check [SETUP.md](./SETUP.md) for detailed instructions.
