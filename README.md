# Quản Lý Chi Tiêu Cá Nhân

Web application quản lý thu chi cá nhân với đầy đủ tính năng theo dõi giao dịch, phân loại danh mục và báo cáo tài chính.

## 🚀 Tính năng

### ✅ Đã hoàn thành
- 🔐 Xác thực người dùng (Đăng ký/Đăng nhập)
- 💰 Quản lý danh mục thu/chi
- 📝 Quản lý giao dịch
- 📊 Dashboard tổng quan
- 📈 Báo cáo theo tháng/năm
- 📉 Biểu đồ trực quan (Bar, Line, Pie charts)
- 🎨 Giao diện responsive với TailwindCSS

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT (jsonwebtoken)
- **Validation**: Zod

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📁 Cấu trúc dự án

```
danhgiadau/
├── backend/                 # API Server
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation
│   │   ├── lib/           # Utilities
│   │   └── index.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React App
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # State management
│   │   ├── lib/          # API client
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚦 Bắt đầu

### Yêu cầu
- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm hoặc yarn

### 1. Clone repository
```bash
git clone <your-repo-url>
cd danhgiadau
```

### 2. Setup Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Chỉnh sửa .env với thông tin database của bạn
# DATABASE_URL="postgresql://user:password@localhost:5432/expense_manager"
# JWT_SECRET="your-secret-key"

# Chạy migrations
npm run prisma:migrate

# Generate Prisma Client
npm run prisma:generate

# Khởi động server development
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../frontend

# Cài đặt dependencies
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Chỉnh sửa .env
# VITE_API_URL=http://localhost:5000/api

# Khởi động development server
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin profile

### Categories
- `GET /api/categories` - Danh sách danh mục
- `POST /api/categories` - Tạo danh mục mới
- `PUT /api/categories/:id` - Cập nhật danh mục
- `DELETE /api/categories/:id` - Xóa danh mục

### Transactions
- `GET /api/transactions` - Danh sách giao dịch (có filter)
- `POST /api/transactions` - Tạo giao dịch mới
- `PUT /api/transactions/:id` - Cập nhật giao dịch
- `DELETE /api/transactions/:id` - Xóa giao dịch

### Reports
- `GET /api/reports/monthly?year=2024&month=1` - Báo cáo theo tháng
- `GET /api/reports/yearly?year=2024` - Báo cáo theo năm
- `GET /api/reports/category` - Báo cáo theo danh mục

## 🌐 Deploy lên Render

### Deploy Backend

1. Push code lên GitHub
2. Tạo Web Service mới trên Render
3. Kết nối với GitHub repository
4. Cấu hình:
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     DATABASE_URL=<your-postgres-url>
     JWT_SECRET=<your-secret>
     NODE_ENV=production
     FRONTEND_URL=<your-frontend-url>
     ```

5. Tạo PostgreSQL database trên Render và kết nối

### Deploy Frontend

1. Tạo Static Site mới trên Render
2. Kết nối với GitHub repository (same repo)
3. Cấu hình:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=<your-backend-url>/api
     ```

## 🎯 Sử dụng

1. **Đăng ký tài khoản** - Tạo tài khoản mới
2. **Tạo danh mục** - Thiết lập các danh mục thu/chi (Lương, Ăn uống, Di chuyển, etc.)
3. **Thêm giao dịch** - Ghi lại các khoản thu/chi hàng ngày
4. **Xem báo cáo** - Phân tích chi tiêu qua biểu đồ và số liệu

## 📊 Database Schema

### Users
- id, email, password, name, timestamps

### Categories
- id, name, type (INCOME/EXPENSE), icon, color, userId

### Transactions
- id, amount, description, date, categoryId, userId

## 🔒 Bảo mật

- Mật khẩu được hash với bcryptjs
- JWT token cho authentication
- Middleware xác thực trên tất cả protected routes
- Validation dữ liệu với Zod
- CORS configured properly

## 📄 License

MIT

## 👨‍💻 Author

Your Name

---

⭐ Nếu bạn thấy project hữu ích, hãy star repo này!
