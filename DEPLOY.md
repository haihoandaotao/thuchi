# 🚀 Hướng Dẫn Deploy lên Render

## Bước 1: Push code lên GitHub

### 1.1 Tạo repository mới trên GitHub
✅ **ĐÃ HOÀN THÀNH!**
- Repository: https://github.com/haihoandaotao/thuchi
- Code đã được push thành công

### 1.2 Push code từ máy local
```bash
# ✅ ĐÃ HOÀN THÀNH!
# Code đã được push lên: https://github.com/haihoandaotao/thuchi.git

# Nếu có thay đổi code sau này:
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

---

## Bước 2: Deploy Backend lên Render

### 2.1 Tạo PostgreSQL Database
1. Truy cập https://dashboard.render.com/
2. Click **New +** → **PostgreSQL**
3. Cấu hình:
   - **Name**: `expense-manager-db`
   - **Database**: `expense_manager`
   - **User**: (để mặc định)
   - **Region**: `Singapore` (gần VN nhất)
   - **Instance Type**: **Free**
4. Click **Create Database**
5. **Chờ vài phút** để database được khởi tạo
6. **Copy Internal Database URL** (sẽ dùng ở bước sau)

### 2.2 Deploy Backend Web Service
1. Click **New +** → **Web Service**
2. Connect GitHub repository vừa tạo
3. Cấu hình:

**Thông tin cơ bản:**
- **Name**: `expense-manager-api`
- **Region**: `Singapore`
- **Branch**: `main`
- **Root Directory**: `backend`

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && npx prisma generate && npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

**Instance Type:**
- Chọn **Free**

4. Click **Advanced** → **Add Environment Variable**

Thêm các biến môi trường sau:

```
DATABASE_URL=<paste Internal Database URL từ bước 2.1>
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this-to-random-string
PORT=5000
FRONTEND_URL=https://expense-manager-app.onrender.com
```

⚠️ **Lưu ý**: 
- `FRONTEND_URL` sẽ được cập nhật sau khi deploy frontend
- `JWT_SECRET` nên thay bằng chuỗi random phức tạp

5. Click **Create Web Service**

6. **Chờ deploy** (~5-10 phút lần đầu)

7. Sau khi deploy xong, **Copy URL** của backend (ví dụ: `https://expense-manager-api.onrender.com`)

---

## Bước 3: Deploy Frontend lên Render

### 3.1 Tạo Static Site
1. Click **New +** → **Static Site**
2. Connect cùng GitHub repository
3. Cấu hình:

**Thông tin cơ bản:**
- **Name**: `expense-manager-app`
- **Region**: `Singapore`
- **Branch**: `main`
- **Root Directory**: `frontend`

**Build Settings:**
- **Build Command**: 
  ```
  npm install && npm run build
  ```
- **Publish Directory**: 
  ```
  dist
  ```

4. Click **Advanced** → **Add Environment Variable**

```
VITE_API_URL=https://expense-manager-api.onrender.com/api
```

⚠️ **Thay thế URL** bằng URL backend thực tế từ bước 2.2.7

5. Click **Create Static Site**

6. **Chờ deploy** (~3-5 phút)

7. Sau khi xong, bạn sẽ có URL frontend (ví dụ: `https://expense-manager-app.onrender.com`)

---

## Bước 4: Cập nhật CORS

### 4.1 Cập nhật Environment Variable của Backend
1. Vào Backend Web Service trên Render
2. Click **Environment**
3. Tìm biến `FRONTEND_URL`
4. Cập nhật giá trị thành URL frontend thực tế:
   ```
   https://expense-manager-app.onrender.com
   ```
5. Click **Save Changes**
6. Backend sẽ tự động redeploy

---

## Bước 5: Kiểm tra và sử dụng

### 5.1 Truy cập ứng dụng
1. Mở URL frontend trong trình duyệt
2. Đăng ký tài khoản mới
3. Tạo danh mục
4. Thêm giao dịch
5. Xem báo cáo

### 5.2 Kiểm tra Backend API
Truy cập: `https://your-backend-url.onrender.com/api/health`

Nếu thấy `{"status":"ok","message":"Server is running"}` → Thành công! ✅

---

## ⚠️ Lưu ý quan trọng

### Free Tier Render:
- **Backend & Database**: Sẽ **sleep** sau 15 phút không hoạt động
- Lần đầu truy cập sau khi sleep sẽ mất **~30 giây** để wake up
- **750 giờ/tháng** miễn phí (đủ cho 1 tháng nếu dùng 1 service)

### Cải thiện:
- Dùng **UptimeRobot** hoặc **Cron Job** để ping backend 14 phút/lần → Giữ service luôn active
- Upgrade lên **Paid Plan** ($7/tháng) để không bị sleep

---

## 🔄 Update code sau này

Khi bạn thay đổi code:

```bash
git add .
git commit -m "Update: mô tả thay đổi"
git push origin main
```

Render sẽ **tự động deploy lại** cả backend và frontend! 🎉

---

## 🆘 Troubleshooting

### Lỗi database connection:
- Kiểm tra `DATABASE_URL` đã đúng chưa
- Đảm bảo sử dụng **Internal Database URL** từ Render

### Frontend không kết nối được backend:
- Kiểm tra `VITE_API_URL` có đúng URL backend không
- Kiểm tra `FRONTEND_URL` ở backend đã cập nhật chưa

### Build failed:
- Xem logs để biết lỗi cụ thể
- Thường là thiếu dependencies hoặc lỗi TypeScript

---

**Chúc bạn deploy thành công! 🚀**
