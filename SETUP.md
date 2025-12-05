# Stylee Backend & Frontend - Quick Setup Guide

## 🚀 Quick Start

### Backend Setup

1. **Navigate to Backend directory**:
   ```bash
   cd Backend
   ```

2. **Ensure dependencies are installed**:
   ```bash
   npm install
   ```

3. **Run database migration** (when database is accessible):
   ```bash
   npx prisma migrate dev --name add_items_and_roles
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5001`

---

### Frontend Setup

1. **Navigate to Frontend directory**:
   ```bash
   cd Frontend
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file** and set the API URL:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```
   
   For production, use your deployed backend URL:
   ```
   VITE_API_URL=https://stylee.onrender.com/api
   ```

4. **Start the frontend**:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

---

## 🔑 Creating an Admin User

1. **Sign up** for a new account through the frontend
2. **Access your database** and run:
   ```sql
   UPDATE User SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```
3. **Log out and log back in** to get the updated role in your JWT token

---

## 📋 Available Routes

### Frontend Routes
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/profile` - User profile (protected)
- `/products` - Product listing with search/filter/sort
- `/products/:id` - Product detail page
- `/admin` - Admin dashboard (admin only)

### Backend API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (protected)

#### Items/Products
- `GET /api/items` - Get all items (supports search, filter, sort, pagination)
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item (authenticated)
- `PUT /api/items/:id` - Update item (authenticated)
- `DELETE /api/items/:id` - Delete item (admin only)

#### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

---

## 🧪 Testing the API

### Example: Search & Filter Products

```bash
# Search for products
GET /api/items?search=shirt

# Filter by category and price
GET /api/items?category=clothing&minPrice=20&maxPrice=100

# Sort by price (ascending)
GET /api/items?sortBy=price&sortOrder=asc

# Pagination
GET /api/items?page=2&limit=12

# Combine all filters
GET /api/items?search=shirt&category=clothing&brand=Nike&sortBy=price&sortOrder=asc&page=1&limit=12
```

### Example: Create a Product (Admin)

```bash
POST /api/items
Headers: Authorization: Bearer <your-jwt-token>
Body:
{
  "name": "Classic T-Shirt",
  "description": "Comfortable cotton t-shirt",
  "price": 29.99,
  "category": "Clothing",
  "brand": "StyleBrand",
  "color": "Blue",
  "size": "M",
  "images": ["https://example.com/image1.jpg"],
  "tags": ["casual", "cotton", "summer"],
  "stock": 50
}
```

---

## ⚠️ Important Notes

> **Database Connection**: The database migration failed because the remote MySQL server wasn't reachable. Make sure your database server is running and accessible before running migrations.

> **Environment Variables**: Both backend and frontend need proper environment configuration. Backend needs `DATABASE_URL` and `JWT_SECRET` in `.env`, frontend needs `VITE_API_URL`.

> **CORS**: The backend is configured to accept requests from `http://localhost:5173` and `https://stylee-gamma.vercel.app`. Update CORS settings in `Backend/src/index.js` if deploying to different URLs.

---

## 🎯 Features Implemented

✅ **Authentication**: JWT-based with role support  
✅ **Authorization**: Role-based access control (USER/ADMIN)  
✅ **CRUD Operations**: Complete product and user management  
✅ **Search**: By name, description, tags  
✅ **Filtering**: By category, brand, color, size, price range  
✅ **Sorting**: By date, price, popularity, name  
✅ **Pagination**: Server-side with configurable page size  
✅ **Admin Dashboard**: Product and user management UI  
✅ **Responsive Design**: Mobile-friendly interface  

---

## 📚 Next Steps

1. ✅ Run database migration
2. ✅ Create an admin user
3. ✅ Test authentication flow
4. ✅ Add some sample products via admin dashboard
5. ✅ Test search, filter, and sort functionality
6. ✅ Deploy backend and frontend to production
