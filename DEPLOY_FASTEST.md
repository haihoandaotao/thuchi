# 🚀 HƯỚNG DẪN DEPLOY CỰC NHANH (10 PHÚT)

## 📋 CHUẨN BỊ
- ✅ Code: https://github.com/haihoandaotao/thuchi
- ✅ Tài khoản Render: https://dashboard.render.com/

---

## ⚡ DEPLOY CẢ 2 SERVICES CÙNG LÚC

### Bước 1: Mở 2 tab trên Render Dashboard

1. Đăng nhập: https://dashboard.render.com/
2. **Tab 1**: Click **New +** → **Web Service** (cho Backend)
3. **Tab 2**: Click **New +** → **Static Site** (cho Frontend)

---

### Bước 2: Cấu hình Backend (Tab 1)

**Connect Repository:**
- Chọn: `haihoandaotao/thuchi`

**Settings:**
```
Name: thuchi-api
Region: Singapore
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npx prisma generate && npx prisma db push && npm run build
Start Command: npm start
Instance Type: Free
```

**Environment Variables:**
```
DATABASE_URL = file:./production.db
JWT_SECRET = thuchi-secret-2025
NODE_ENV = production
FRONTEND_URL = https://thuchi-app.onrender.com
```

➡️ Click **Create Web Service** → Để tab này deploy

---

### Bước 3: Cấu hình Frontend (Tab 2)

**Connect Repository:**
- Chọn: `haihoandaotao/thuchi`

**Settings:**
```
Name: thuchi-app
Region: Singapore
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

**Environment Variables:**
```
VITE_API_URL = https://thuchi-api.onrender.com/api
```

➡️ Click **Create Static Site** → Để tab này deploy

---

### Bước 4: Chờ cả 2 deploy xong (5-10 phút)

**Trong khi chờ:**
- Tab Backend: Xem logs, đợi "Server running on port 5000"
- Tab Frontend: Đợi "Build completed"

**Sau khi xong:**
- Copy URL của cả 2:
  - Backend: `https://thuchi-api.onrender.com`
  - Frontend: `https://thuchi-app.onrender.com`

---

### Bước 5: Cập nhật CORS (2 phút)

1. Vào **Backend Service** (Tab 1)
2. Click **Environment**
3. Sửa `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://thuchi-app.onrender.com
   ```
   (Thay bằng URL frontend thực tế)
4. **Save Changes** → Đợi redeploy (~2 phút)

---

## 🎉 HOÀN TẤT!

### ✅ Test ngay:

**Backend:**
```
https://thuchi-api.onrender.com/api/health
```
→ Thấy `{"status":"ok"}` ✅

**Frontend:**
```
https://thuchi-app.onrender.com
```
→ Đăng ký tài khoản và sử dụng ✅

---

## 📊 TỔNG THỜI GIAN

- Cấu hình Backend: **2 phút**
- Cấu hình Frontend: **2 phút**
- Chờ deploy: **5-10 phút**
- Cập nhật CORS: **2 phút**

**→ TỔNG: ~10-15 phút** ⏱️

---

## 💡 MẸO HAY

### Trong khi chờ deploy:
- ☕ Pha cà phê
- 📧 Check email
- 📱 Xem Render logs để biết tiến độ

### Giữ service luôn hoạt động:
**UptimeRobot** (miễn phí):
```
URL monitor: https://thuchi-api.onrender.com/api/health
Interval: 14 minutes
```
→ Không bao giờ sleep!

---

## ⚠️ LƯU Ý

**SQLite trên Render Free:**
- ✅ Đơn giản, không cần PostgreSQL
- ❌ Dữ liệu mất khi redeploy
- 💡 Phù hợp: Demo, testing, học tập
- 🔄 Muốn lưu lâu dài: Dùng PostgreSQL (xem DEPLOY.md)

---

## 🔄 Update code sau này

```bash
git add .
git commit -m "Your changes"
git push origin main
```
→ Render tự động deploy lại cả 2! 🚀

---

## 🆘 Gặp lỗi?

### Backend build failed:
- Check `Root Directory: backend` đã đúng chưa
- Xem logs để biết lỗi cụ thể

### Frontend không connect backend:
- `VITE_API_URL` phải có `/api` ở cuối
- `FRONTEND_URL` ở backend không có `/` ở cuối

### Database error:
- Đảm bảo `DATABASE_URL = file:./production.db`
- Build command có `npx prisma db push`

---

**Deploy vui vẻ! 🎊**
