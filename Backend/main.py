import os
import shutil
from database import SessionLocal
from datetime import datetime, timedelta
from typing import List, Optional

# FastAPI & Pydantic Imports
from fastapi import FastAPI, Depends, File, UploadFile, Form, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from sqlalchemy import text

# Auth Imports
import jwt 
from passlib.context import CryptContext 

# Local Imports
import models
import schemas
from database import engine, get_db

# === DATABASE SETUP ===
models.Base.metadata.create_all(bind=engine)

# === APP & CORS SETUP ===
app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === UPLOADS FOLDER SETUP ===
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# === SECURITY & AUTH SETUP ===
SECRET_KEY = "Zarvix_Digital_Super_Secret_Key_123!" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") 

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# === PYDANTIC SCHEMAS ===
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdate(BaseModel):
    phone: str
    primary_address: str
    secondary_addresses: str

class OrderUpdate(BaseModel):
    status: str
    tracking: str

class OrderItemCreate(BaseModel):
    product_id: int
    product_name: str
    price: float
    quantity: int
    image_url: str

class OrderCreate(BaseModel):
    user_id: int
    total_amount: float
    items: List[OrderItemCreate]

class WishlistAdd(BaseModel):
    product_id: int

class NotificationCreate(BaseModel):
    title: str
    message: str
    type: str = "promo"    

class PasswordChangeRequest(BaseModel):
    currentPassword: str
    newPassword: str    

class LoginRequest(BaseModel):
    email: str
    password: str

# ==========================================
#          ADMIN PANEL APIs
# ==========================================

@app.get("/api/admin/orders")
def get_all_admin_orders(db: Session = Depends(get_db)):
    orders = db.query(models.Order).order_by(models.Order.id.desc()).all()
    
    result = []
    for order in orders:
        user = db.query(models.User).filter(models.User.id == order.user_id).first()
        items = db.query(models.OrderItem).filter(models.OrderItem.order_id == order.id).all()
        
        result.append({
            "id": f"ZRVX-{10000 + order.id}",
            "real_id": order.id, 
            "user_id": order.user_id,
            "customer_name": user.name if user else "Guest User",
            "created_at": order.created_at,
            "total_amount": order.total_amount,
            "status": order.status,
            "tracking": order.tracking,
            "items": items
        })
        
    return result

@app.put("/api/orders/{order_id}")
def update_admin_order(order_id: int, order_update: OrderUpdate, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order nahi mila")
        
    order.status = order_update.status
    order.tracking = order_update.tracking
    db.commit()
    
    return {"message": "Order successfully updated!"}

@app.get("/api/admin/customers")
def get_all_customers(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    
    result = []
    for user in users:
        orders = db.query(models.Order).filter(models.Order.user_id == user.id).all()
        total_spent = sum(order.total_amount for order in orders if order.status != 'Cancelled')
        
        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "total_orders": len(orders),
            "total_spent": total_spent,
            "status": "Active" 
        })
        
    return result


# ==========================================
#            WISHLIST APIs
# ==========================================

@app.post("/api/users/{user_id}/wishlist")
def add_to_wishlist(user_id: int, item: WishlistAdd, db: Session = Depends(get_db)):
    existing = db.query(models.Wishlist).filter(models.Wishlist.user_id == user_id, models.Wishlist.product_id == item.product_id).first()
    if existing:
        return {"message": "Product is already in your wishlist!"}
    
    new_wishlist_item = models.Wishlist(user_id=user_id, product_id=item.product_id)
    db.add(new_wishlist_item)
    db.commit()
    return {"message": "Successfully added to wishlist!"}

@app.get("/api/users/{user_id}/wishlist")
def get_wishlist(user_id: int, db: Session = Depends(get_db)):
    wishlist_products = db.query(models.Product).join(
        models.Wishlist, models.Product.id == models.Wishlist.product_id
    ).filter(models.Wishlist.user_id == user_id).all()
    
    return wishlist_products

@app.delete("/api/users/{user_id}/wishlist/{product_id}")
def remove_from_wishlist(user_id: int, product_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Wishlist).filter(models.Wishlist.user_id == user_id, models.Wishlist.product_id == product_id).first()
    if item:
        db.delete(item)
        db.commit()
    return {"message": "Removed from wishlist successfully!"}


# ==========================================
#          NOTIFICATIONS APIs
# ==========================================

@app.post("/api/admin/users/{user_id}/notify")
def send_notification(user_id: int, notif: NotificationCreate, db: Session = Depends(get_db)):
    db_notif = models.Notification(user_id=user_id, title=notif.title, message=notif.message, type=notif.type)
    db.add(db_notif)
    db.commit()
    return {"message": "Notification successfully sent!"}

@app.get("/api/users/{user_id}/notifications")
def get_user_notifications(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Notification).filter(models.Notification.user_id == user_id).order_by(models.Notification.id.desc()).all()

@app.put("/api/notifications/{notif_id}/read")
def mark_notification_read(notif_id: int, db: Session = Depends(get_db)):
    notif = db.query(models.Notification).filter(models.Notification.id == notif_id).first()
    if notif:
        notif.is_read = True
        db.commit()
    return {"status": "success"}

@app.delete("/api/notifications/{notif_id}")
def delete_notification(notif_id: int, db: Session = Depends(get_db)):
    notif = db.query(models.Notification).filter(models.Notification.id == notif_id).first()
    if notif:
        db.delete(notif)
        db.commit()
    return {"status": "deleted"}


# ==========================================
# 🛒 CREATE ORDER & DEDUCT STOCK (POST)
# ==========================================
@app.post("/api/orders")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    try:
        # 1. Order ka main record banayen
        db_order = models.Order(user_id=order.user_id, total_amount=order.total_amount)
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        
        # 2. Order ke items add karein AUR Stock minus karein
        for item in order.items:
            # A) Item ko OrderItem table mein save karein
            db_item = models.OrderItem(
                order_id=db_order.id,
                product_id=item.product_id,
                product_name=item.product_name,
                price=item.price,
                quantity=item.quantity,
                image_url=item.image_url
            )
            db.add(db_item)
            
            # 🔥 B) STOCK MINUS LOGIC 🔥
            # Product database se fetch karein
            product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
            if product:
                # Mojooda stock mein se order quantity ko minus (deduct) kar dein
                product.stock = product.stock - item.quantity
                
        # 3. Dono changes (Order Item aur Updated Stock) ko ek sath save karein
        db.commit()
        
        return {"message": "Order successfully placed!", "order_id": db_order.id}
        
    except Exception as e:
        # Agar koi error aaye tou database ko pichli halat mein wapas le jayen (Rollback)
        db.rollback()
        return {"error": str(e)}


# ==========================================
# 📦 GET USER ORDERS (GET)
# ==========================================
# (Yeh code aapka bilkul perfect tha, isme koi tabdeeli nahi ki gayi)
@app.get("/api/users/{user_id}/orders")
def get_user_orders(user_id: int, db: Session = Depends(get_db)):
    orders = db.query(models.Order).filter(models.Order.user_id == user_id).order_by(models.Order.id.desc()).all()
    
    result = []
    for order in orders:
        items = db.query(models.OrderItem).filter(models.OrderItem.order_id == order.id).all()
        
        result.append({
            "id": f"ZRVX-{10000 + order.id}", 
            "real_id": order.id,              
            "created_at": order.created_at,
            "total_amount": order.total_amount,
            "status": order.status,
            "tracking": order.tracking,
            "items": [
                {
                    "product_id": item.product_id,
                    "product_name": item.product_name,
                    "price": item.price,
                    "quantity": item.quantity,
                    "image_url": item.image_url
                } for item in items
            ]
        })
    return result


# ==========================================
#              AUTH APIs
# ==========================================

@app.post("/api/auth/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Yeh email pehle se registered hai!")
    
    hashed_password = get_password_hash(user.password)
    
    new_user = models.User(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "Account successfully ban gaya hai!", "user_name": new_user.name}

@app.post("/api/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Email ya Password galat hai!")
    
    access_token = create_access_token(data={"sub": db_user.email, "id": db_user.id, "name": db_user.name, "role": db_user.role})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "role": db_user.role
        }
    }


# ==========================================
#          USER PROFILE APIs
# ==========================================

@app.get("/api/users/{user_id}/profile")
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
    if not profile:
        return {"phone": "", "primary_address": "", "secondary_addresses": "[]"}
    return profile

@app.post("/api/users/{user_id}/profile")
def update_user_profile(user_id: int, profile_data: ProfileUpdate, db: Session = Depends(get_db)):
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == user_id).first()
    
    if not profile:
        new_profile = models.UserProfile(
            user_id=user_id, 
            phone=profile_data.phone, 
            primary_address=profile_data.primary_address, 
            secondary_addresses=profile_data.secondary_addresses
        )
        db.add(new_profile)
    else:
        profile.phone = profile_data.phone
        profile.primary_address = profile_data.primary_address
        profile.secondary_addresses = profile_data.secondary_addresses
    
    db.commit()
    return {"message": "Profile updated successfully!"}

# ==========================================
#   ADVANCED ADMIN APIs (BROADCAST & BLOCK)
# ==========================================

@app.post("/api/admin/notify-all")
def send_notification_to_all(notif: NotificationCreate, db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    for u in users:
        db_notif = models.Notification(user_id=u.id, title=notif.title, message=notif.message, type=notif.type)
        db.add(db_notif)
    db.commit()
    return {"message": f"Successfully sent to {len(users)} users!"}

@app.put("/api/admin/users/{user_id}/block")
def toggle_user_block_status(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        user.is_active = not getattr(user, 'is_active', True)
        db.commit()
        status = "Active" if user.is_active else "Blocked"
    except Exception:
        status = "Blocked (UI Only - Needs DB Column update)"
        
    return {"message": f"User status updated to {status}", "status": status}

# ==========================================
#            PRODUCT APIs (CLEANED)
# ==========================================

@app.post("/api/products")
async def create_product(
    title: str = Form(...),
    category: str = Form(...),
    sku: Optional[str] = Form(""),
    condition: str = Form("New"),
    brandType: str = Form("no-brand"),
    brandName: Optional[str] = Form(""),
    modelName: Optional[str] = Form(""),
    mpn: Optional[str] = Form(""),
    color: Optional[str] = Form(""),
    storage_ram: Optional[str] = Form(""),
    price: float = Form(...),
    stock: int = Form(...),
    weight: Optional[str] = Form(""),
    descriptionText: Optional[str] = Form(""),
    customSpecs: str = Form("[]"),
    bulletPoints: str = Form("[]"),
    product_images: List[UploadFile] = File(...),
    desc_images: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db)
):
    try:
        saved_image_urls = []
        for img in product_images:
            file_location = f"{UPLOAD_DIR}/{img.filename}"
            with open(file_location, "wb+") as file_object:
                shutil.copyfileobj(img.file, file_object)
            image_url = f"http://localhost:8000/uploads/{img.filename}"
            saved_image_urls.append(image_url)

        db_product = models.Product(
            name=title,
            category=category,
            sku=sku,
            condition=condition,
            brandType=brandType,
            brandName=brandName,
            modelName=modelName,
            mpn=mpn,
            color=color,
            storage_ram=storage_ram,
            price=price,
            stock=stock,
            weight=weight,
            description=descriptionText,
            customSpecs=customSpecs,
            bulletPoints=bulletPoints,
            image_url=",".join(saved_image_urls) if saved_image_urls else ""
        )

        db.add(db_product)
        db.commit()
        db.refresh(db_product)

        return db_product

    except Exception as e:
        return {"error": str(e)}

# ==========================================
# GET ALL PRODUCTS (FIXED - NO SCHEMA)
# ==========================================
@app.get("/api/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).order_by(models.Product.id.desc()).all() 
    
    final_list = []
    for p in products:
        final_list.append({
            "id": p.id,
            "title": p.name,          
            "name": p.name,           
            "category": getattr(p, "category", "Uncategorized") or "Uncategorized",
            "sku": getattr(p, "sku", "N/A") or "N/A",
            "price": p.price,
            "stock": p.stock,
            "image_url": getattr(p, "image_url", ""),
            "brandName": getattr(p, "brandName", "Zarvix Digital"),
            "condition": getattr(p, "condition", "New")
        })
        
    return final_list

# ==========================================
# GET SINGLE PRODUCT (FIXED)
# ==========================================
@app.get("/api/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product nahi mila")
        
    return {column.name: getattr(product, column.name) for column in product.__table__.columns}


# ==========================================
#          UPDATE PRODUCT API (PUT)
# ==========================================
@app.put("/api/products/{product_id}")
def update_product(product_id: int, payload: dict = Body(...), db: Session = Depends(get_db)):
    print(f"\n--- UPDATE REQUEST AAYI HAI PRODUCT ID: {product_id} ---")
    print(f"Payload Data: {payload}")
    
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if not db_product:
        print("❌ Error: Product database mein nahi mila!")
        raise HTTPException(status_code=404, detail="Product not found")
    
    try:
        if "name" in payload and payload["name"]:
            db_product.name = payload["name"]
        elif "title" in payload and payload["title"]:
             db_product.name = payload["title"] 
             
        if "category" in payload:
            db_product.category = payload["category"]
            
        if "sku" in payload:
            db_product.sku = payload["sku"]
            
        if "price" in payload:
            db_product.price = payload["price"]
            
        if "stock" in payload:
            db_product.stock = payload["stock"]
                
        db.commit()
        db.refresh(db_product)
        print("✅ Success: Product database mein save ho gaya!")
        
    except Exception as e:
        print(f"❌ Database Save Error: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Database update failed")
    
    return {"message": "Product completely updated!", "product": db_product}


# ==========================================
#     VIP ADMIN INVENTORY ROUTES (RAW SQL)
# ==========================================

@app.get("/api/admin/inventory")
def get_admin_inventory(db: Session = Depends(get_db)):
    try:
        query = text("SELECT * FROM products ORDER BY id DESC")
        result = db.execute(query).mappings().all()
        
        final_data = []
        for row in result:
            final_data.append({
                "id": row["id"],
                "name": row["name"],
                "category": row.get("category", "Uncategorized") or "Uncategorized", 
                "sku": row.get("sku", "N/A") or "N/A",
                "price": row["price"],
                "stock": row["stock"],
                "image_url": row.get("image_url", "")
            })
        return final_data
    except Exception as e:
        print(f"❌ GET RAW SQL ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/admin/inventory/{product_id}")
def update_admin_inventory(product_id: int, payload: dict = Body(...), db: Session = Depends(get_db)):
    try:
        update_query = text("""
            UPDATE products 
            SET name = :name, category = :category, sku = :sku, price = :price, stock = :stock
            WHERE id = :id
        """)
        
        db.execute(update_query, {
            "name": payload.get("name", ""),
            "category": payload.get("category", "Uncategorized"),
            "sku": payload.get("sku", "N/A"),
            "price": payload.get("price", 0),
            "stock": payload.get("stock", 0),
            "id": product_id
        })
        db.commit()
        print(f"✅ Raw SQL Success: Product {product_id} updated!")
        return {"message": "Admin inventory successfully updated with Raw SQL!"}
        
    except Exception as e:
        print(f"❌ RAW SQL UPDATE ERROR: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
# ==========================================
# GET ALL REAL ORDERS (FROM DATABASE)
# ==========================================
@app.get("/api/orders")
def get_real_orders(db: Session = Depends(get_db)):
    try:
        # Aapke PostgreSQL database se asli orders nikal rahay hain (Latest sab se oopar)
        orders = db.query(models.Order).order_by(models.Order.id.desc()).all()
        
        result = []
        for o in orders:
            result.append({
                "id": o.id,
                # getattr isliye use kar rahay hain taake agar column ka naam thoda mukhtalif ho tou error na aaye
                "customer_name": getattr(o, "customer_name", getattr(o, "customer", getattr(o, "name", "Guest User"))),
                "status": getattr(o, "status", "Processing"),
                "total_amount": getattr(o, "total_amount", getattr(o, "total", 0)),
                "created_at": getattr(o, "created_at", getattr(o, "date", ""))
            })
        return result
        
    except Exception as e:
        print(f"❌ Error fetching real orders: {e}")
        # Agar koi error aaye tou frontend crash na ho
        return []
    

import json
import os
from pydantic import BaseModel

# ==========================================
# ⚙️ STORE SETTINGS API (GET & PUT)
# ==========================================

# Settings ko save karne ke liye ek choti si file ka naam
SETTINGS_FILE = "store_settings.json"

# Pydantic Schema taake data theek se aaye
class SettingsUpdate(BaseModel):
    currency: str
    shippingFee: int
    freeShippingThreshold: int
    codEnabled: bool
    cardEnabled: bool
    maintenanceMode: bool

@app.get("/api/settings")
def get_store_settings():
    try:
        if os.path.exists(SETTINGS_FILE):
            with open(SETTINGS_FILE, "r") as f:
                return json.load(f)
        # Agar file nahi hai tou default settings bhej do
        return {
            "currency": "PKR (Rs)",
            "shippingFee": 200,
            "freeShippingThreshold": 5000,
            "codEnabled": True,
            "cardEnabled": False,
            "maintenanceMode": False
        }
    except Exception as e:
        return {"error": "Settings load nahi ho saki"}

@app.put("/api/settings")
def update_store_settings(settings: SettingsUpdate):
    try:
        # React se aanay wale data ko dictionary banaya
        settings_dict = settings.model_dump()
        
        # Us data ko file mein mehfooz kar diya
        with open(SETTINGS_FILE, "w") as f:
            json.dump(settings_dict, f, indent=4)
            
        return {"message": "Store Settings updated successfully", "data": settings_dict}
    except Exception as e:
        # Agar error aaye toh backend ka SOS bhejo
        print(f"❌ Error saving settings: {e}")
        return {"error": "Settings save nahi ho saki"}    

@app.post("/api/admin/update-password")
def update_admin_password(req: PasswordChangeRequest, db: Session = Depends(get_db)):
    # Ab 'models.Admin' exist karta hai, error nahi aayega!
    admin = db.query(models.Admin).first() 

    if not admin:
        return {"error": "Admin account database mein missing hai."}

    # Password check
    if admin.password != req.currentPassword:
        return {"error": "Current password ghalat hai!"}

    # Update
    admin.password = req.newPassword
    db.commit()
    return {"message": "Password updated successfully!"}

# 2. Login Route (Yeh check karega ke database mein password sahi hai ya nahi)
@app.post("/api/admin/login")
def admin_login(creds: LoginRequest, db: Session = Depends(get_db)):
    # Apne 'Admin' table se pehla record uthao
    admin = db.query(models.Admin).first()
    
    if not admin:
        return {"error": "Admin account not initialized!"}
    
    # Simple verification (Plain text logic)
    if admin.username == creds.email and admin.password == creds.password:
        return {"message": "Success"}
    else:
        return {"error": "Invalid Credentials"}
    
# main.py ke end mein, jahan init_db hai:

def init_db():
    from database import SessionLocal
    
    # .env file se variables uthayein
    db_admin_user = os.getenv("ADMIN_USERNAME")
    db_admin_pass = os.getenv("ADMIN_PASSWORD")
    
    # Check karein ke .env file mein data mojood hai ya nahi
    if not db_admin_user or not db_admin_pass:
        print("❌ Error: ADMIN_USERNAME ya ADMIN_PASSWORD missing hai .env mein!")
        return

    db = SessionLocal() 
    try:
        # Check karein Admin table mein koi record hai ya nahi
        admin = db.query(models.Admin).first()
        
        if not admin:
            print("⚙️ Admin account missing! Creating default admin from .env...")
            new_admin = models.Admin(
                username=db_admin_user, 
                password=db_admin_pass 
            )
            db.add(new_admin)
            db.commit()
            print("✅ Default Admin created successfully!")
        else:
            print("ℹ️ Admin already exists in database.")
            
    except Exception as e:
        print(f"❌ Database error in init_db: {e}")
    finally:
        db.close()

# Ab isay run karein
if __name__ == "__main__":
    init_db()