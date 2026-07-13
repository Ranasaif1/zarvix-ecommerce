
# Zarvix E-Commerce & Admin Control Center 🚀

A modern, high-performance, full-stack e-commerce platform built to streamline online operations. This project includes a customer-facing storefront and a comprehensive Admin Control Center for inventory, order, and user management.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS for responsive and modern UI
* Axios for API communication
* React Router for seamless navigation
* Lucide Icons

**Backend:**
* FastAPI (Python) - High-performance backend framework
* SQLAlchemy - ORM for database management
* Passlib & JWT - Secure authentication and password hashing
* Uvicorn - ASGI server

**Database & Deployment:**
* PostgreSQL (Hosted on Neon)
* Vercel (Serverless deployment for both Frontend and Backend)

---

## ✨ Key Features

* **Admin Dashboard:** Centralized control panel to view stats, manage products, and track orders.
* **Inventory Management:** Full CRUD operations (Create, Read, Update, Delete) for products with live stock tracking.
* **Order Processing:** Secure order placement, tracking updates, and automated stock deduction.
* **User Authentication:** Secure Admin and Customer login using JWT tokens.
* **Wishlist & Notifications:** Real-time user engagement features.
* **Store Settings:** Dynamic management of shipping fees, currency, and maintenance modes.

---

## ⚙️ Local Development Setup

To get a local copy up and running, follow these simple steps:

### 1. Clone the repository
```bash
git clone https://github.com/Ranasaif1/zarvix-ecommerce
cd zarvix-ecommerce

```

### 2. Backend Setup (FastAPI)

```bash
cd Backend

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload

```

*The backend will be running at `http://localhost:8000*`

### 3. Frontend Setup (React)

Open a new terminal window:

```bash
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev

```

*The frontend will be running at `http://localhost:5173*`

---

## 🔐 Environment Variables

Create a `.env` file in the **Backend** folder and add the following keys to connect to your database and initialize the admin account:

```env
DATABASE_URL=postgresql://[user]:[password]@[neon_hostname]/[dbname]?sslmode=require
ADMIN_USERNAME=admin@zarvix.com
ADMIN_PASSWORD=your_secure_password

```

---

## 🚀 Deployment

This project is fully configured for deployment on **Vercel**.

* The backend utilizes a `vercel.json` configuration file to deploy the FastAPI application as serverless functions.
* The frontend is deployed as a standard Vite/React application.

*(Ensure that CORS settings in `main.py` include your live Vercel frontend URL for production).*

---

## 👨‍💻 Developed By

**Saif ur Rehman** Founder, Zarvix Digital

