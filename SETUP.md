# 🚀 Hướng Dẫn Cài Đặt & Chạy Project

## Bước 1: Cài đặt Backend

### Mở terminal tại thư mục backend
```powershell
cd backend
```

### Cài đặt dependencies
```powershell
npm install
```

### Tạo file .env
```powershell
Copy-Item .env.example .env
```

### Chỉnh sửa file .env với thông tin database PostgreSQL của bạn
```
DATABASE_URL="postgresql://user:password@localhost:5432/expense_manager?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

### Chạy Prisma migrations để tạo database
```powershell
npm run prisma:push
```

### Generate Prisma Client
```powershell
npm run prisma:generate
```

### Khởi động backend server
```powershell
npm run dev
```

✅ Backend đang chạy tại: http://localhost:5000

---

## Bước 2: Cài đặt Frontend

### Mở terminal mới tại thư mục frontend
```powershell
cd frontend
```

### Cài đặt dependencies
```powershell
npm install
```

### Tạo file .env
```powershell
Copy-Item .env.example .env
```

### File .env sẽ có nội dung:
```
VITE_API_URL=http://localhost:5000/api
```

### Khởi động frontend server
```powershell
npm run dev
```

✅ Frontend đang chạy tại: http://localhost:5173

---

## Bước 3: Sử dụng ứng dụng

1. Mở trình duyệt và truy cập http://localhost:5173
2. Đăng ký tài khoản mới
3. Tạo các danh mục thu/chi
4. Bắt đầu ghi lại giao dịch
5. Xem báo cáo và biểu đồ

---

## 🛠️ Các lệnh hữu ích

### Backend
- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm start` - Chạy production server
- `npm run prisma:studio` - Mở Prisma Studio để quản lý database

### Frontend
- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build

---

## 📦 Deploy lên Render

### Backend
1. Push code lên GitHub
2. Tạo Web Service trên Render.com
3. Connect GitHub repo
4. Thiết lập:
   - Build Command: `npm install && npm run prisma:generate && npm run build`
   - Start Command: `npm start`
5. Thêm PostgreSQL database
6. Thêm Environment Variables (DATABASE_URL, JWT_SECRET, etc.)

### Frontend
1. Tạo Static Site trên Render.com
2. Connect cùng GitHub repo
3. Thiết lập:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
4. Thêm Environment Variable: VITE_API_URL

---

## ⚠️ Lưu ý

- Đảm bảo PostgreSQL đã được cài đặt và chạy
- Port 5000 (backend) và 5173 (frontend) phải available
- Node.js version >= 18.x
