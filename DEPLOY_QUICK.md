# 🚀 HƯỚNG DẪN DEPLOY NHANH LÊN RENDER

## ✅ HOÀN THÀNH
- ✅ Code đã push lên GitHub: https://github.com/haihoandaotao/thuchi

## 🎯 BƯỚC TIẾP THEO

### BƯỚC 1️⃣: Tạo Database PostgreSQL (3 phút)

1. Truy cập: https://dashboard.render.com/
2. Đăng nhập/Đăng ký (có thể dùng GitHub)
3. Click **New +** → **PostgreSQL**
4. Điền thông tin:
   ```
   Name: thuchi-db
   Database: thuchi
   User: (để mặc định)
   Region: Singapore
   ```
5. Chọn **Free** tier
6. Click **Create Database**
7. ⏳ Chờ 2-3 phút
8. 📋 **QUAN TRỌNG**: Copy **Internal Database URL** 
   (dạng: `postgresql://user:pass@host/database`)

---

### BƯỚC 2️⃣: Deploy Backend API (5 phút)

1. Click **New +** → **Web Service**
2. Click **Connect GitHub** → Authorize
3. Chọn repository: **thuchi**
4. Điền thông tin:

```
Name: thuchi-api
Region: Singapore
Branch: main
Root Directory: backend
```

**Build Settings:**
```
Runtime: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npm start
```

**Instance Type:** Free

5. Click **Advanced** → **Add Environment Variable**

Thêm 5 biến môi trường:

```
DATABASE_URL = <paste Internal Database URL từ Bước 1>
JWT_SECRET = thuchi-secret-key-2025-production
NODE_ENV = production  
PORT = 5000
FRONTEND_URL = https://thuchi-app.onrender.com
```

6. Click **Create Web Service**
7. ⏳ Chờ deploy (5-10 phút)
8. 📋 **Copy URL backend** sau khi deploy xong 
   (dạng: `https://thuchi-api.onrender.com`)

---

### BƯỚC 3️⃣: Deploy Frontend (3 phút)

1. Click **New +** → **Static Site**
2. Chọn repository: **thuchi**
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
VITE_API_URL = <URL backend từ Bước 2>/api
```

Ví dụ: `https://thuchi-api.onrender.com/api`

5. Click **Create Static Site**
6. ⏳ Chờ deploy (3-5 phút)
7. ✅ Xong! Lấy URL frontend

---

### BƯỚC 4️⃣: Cập nhật CORS (1 phút)

1. Quay lại **Backend Service** (thuchi-api)
2. Click tab **Environment**
3. Sửa biến `FRONTEND_URL`:
   ```
   FRONTEND_URL = <URL frontend thực tế>
   ```
   Ví dụ: `https://thuchi-app.onrender.com`
4. Click **Save Changes**
5. Đợi auto redeploy (~1 phút)

---

## 🎉 HOÀN TẤT!

### ✅ Kiểm tra:

**Backend API:**
- URL: `https://thuchi-api.onrender.com/api/health`
- Kết quả: `{"status":"ok","message":"Server is running"}`

**Frontend App:**
- URL: `https://thuchi-app.onrender.com`
- Đăng ký tài khoản mới
- Tạo danh mục
- Thêm giao dịch
- Xem báo cáo

---

## ⚠️ LƯU Ý

### Free Tier Render:
- Service sẽ **sleep** sau 15 phút không dùng
- Lần đầu truy cập sau khi sleep mất ~30 giây để wake up
- Giới hạn 750 giờ/tháng (đủ dùng)

### Giữ service luôn hoạt động:
Dùng **UptimeRobot** (miễn phí):
1. Đăng ký: https://uptimerobot.com
2. Tạo monitor ping backend mỗi 14 phút
3. URL: `https://thuchi-api.onrender.com/api/health`

---

## 🔄 Cập nhật code

Mỗi khi thay đổi code:

```bash
git add .
git commit -m "Update: mô tả"
git push origin main
```

→ Render tự động deploy lại! 🚀

---

## 📞 Hỗ trợ

Gặp vấn đề? Check:
- Logs trên Render Dashboard
- Environment Variables đã đúng chưa
- Database connection string đã copy đúng chưa

**Chúc bạn deploy thành công! 🎊**
