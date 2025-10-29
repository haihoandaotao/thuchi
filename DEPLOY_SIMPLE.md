# 🚀 DEPLOY ĐƠN GIẢN LÊN RENDER (KHÔNG CẦN DATABASE)

## ✅ ĐÃ HOÀN THÀNH
- ✅ Code đã push lên: https://github.com/haihoandaotao/thuchi
- ✅ Sử dụng SQLite (database tự động tạo, không cần setup PostgreSQL)

---

## 🎯 CHỈ CẦN 2 BƯỚC!

### BƯỚC 1️⃣: Deploy Backend API (5 phút)

1. Truy cập: https://dashboard.render.com/
2. Đăng nhập (dùng GitHub)
3. Click **New +** → **Web Service**
4. Click **Connect GitHub** → Chọn repo: **thuchi**
5. Điền thông tin:

```
Name: thuchi-api
Region: Singapore
Branch: main
Root Directory: backend
```

**Build Settings:**
```
Runtime: Node
Build Command: npm install && npx prisma generate && npx prisma db push && npm run build
Start Command: npm start
```

**Instance Type:** Free

6. Click **Advanced** → **Add Environment Variable**

Chỉ cần thêm 4 biến:

```
DATABASE_URL = file:./production.db
JWT_SECRET = thuchi-secret-key-2025-production
NODE_ENV = production
FRONTEND_URL = https://thuchi-app.onrender.com
```

7. Click **Create Web Service**
8. ⏳ Chờ deploy (5-10 phút)
9. 📋 **Copy URL backend** 
   (Ví dụ: `https://thuchi-api.onrender.com`)

---

### BƯỚC 2️⃣: Deploy Frontend (3 phút)

1. Click **New +** → **Static Site**
2. Chọn repo: **thuchi**
3. Điền thông tin:

```
Name: thuchi-app
Region: Singapore
Branch: main
Root Directory: frontend
```

**Build Settings:**
```
Build Command: npm install && npm run build
Publish Directory: dist
```

4. Click **Advanced** → **Add Environment Variable**

```
VITE_API_URL = <URL backend từ Bước 1>/api
```

**Ví dụ:** `https://thuchi-api.onrender.com/api`

5. Click **Create Static Site**
6. ⏳ Chờ deploy (3-5 phút)

---

### BƯỚC 3️⃣: Cập nhật CORS (1 phút)

1. Quay lại **Backend Service** (thuchi-api)
2. Click **Environment**
3. Sửa `FRONTEND_URL`:
   ```
   FRONTEND_URL = <URL frontend thực tế>
   ```
   Ví dụ: `https://thuchi-app.onrender.com`
4. Click **Save Changes**
5. Đợi redeploy (~2 phút)

---

## 🎉 XONG RỒI!

### ✅ Kiểm tra:

**1. Backend:**
```
https://thuchi-api.onrender.com/api/health
```
Kết quả: `{"status":"ok","message":"Server is running"}`

**2. Frontend:**
```
https://thuchi-app.onrender.com
```
- Đăng ký tài khoản
- Tạo danh mục
- Thêm giao dịch
- Xem báo cáo

---

## 💡 VÌ SAO ĐƠN GIẢN HƠN?

### Không cần PostgreSQL:
- ❌ Không cần tạo database riêng
- ❌ Không cần copy connection string
- ❌ Không cần quản lý 2 services
- ✅ SQLite tự động tạo file `production.db`
- ✅ Dữ liệu lưu ngay trong service

### Lưu ý:
- SQLite hoạt động tốt cho ứng dụng cá nhân
- Dữ liệu sẽ bị mất nếu service redeploy/restart
- Nếu muốn dữ liệu persistent, sau này có thể nâng cấp lên PostgreSQL

---

## 🔄 Cập nhật code

```bash
git add .
git commit -m "Update features"
git push origin main
```

→ Render tự động deploy lại!

---

## ⚠️ LƯU Ý QUAN TRỌNG

### Free Tier Render:
- Service sleep sau 15 phút không dùng
- Lần đầu truy cập mất ~30 giây wake up
- **Dữ liệu SQLite sẽ BỊ MẤT khi:**
  - Service redeploy
  - Render restart service
  - Thay đổi environment variables

### Giải pháp lưu dữ liệu lâu dài:
**Tùy chọn 1:** Dùng PostgreSQL (như hướng dẫn DEPLOY.md)
**Tùy chọn 2:** Export/backup dữ liệu thường xuyên
**Tùy chọn 3:** Nâng cấp Render Paid plan (persistent disk)

---

## 📞 Troubleshooting

### Build failed:
- Check logs trên Render
- Đảm bảo `Root Directory: backend` đã đúng

### Frontend không connect backend:
- Kiểm tra `VITE_API_URL` đã đúng chưa
- Kiểm tra `FRONTEND_URL` ở backend

### Database error:
- Kiểm tra `DATABASE_URL = file:./production.db`
- Build command có `npx prisma db push` chưa

---

**Chúc bạn deploy thành công! 🚀**

*Lưu ý: Nếu cần dữ liệu lưu trữ lâu dài, hãy xem hướng dẫn DEPLOY.md để dùng PostgreSQL*
