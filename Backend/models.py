from sqlalchemy import Column, Integer, String, Float,Boolean, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    sku = Column(String, nullable=True)
    condition = Column(String, nullable=True)
    brandType = Column(String, nullable=True)
    brandName = Column(String, nullable=True)
    modelName = Column(String, nullable=True)
    mpn = Column(String, nullable=True)
    color = Column(String, nullable=True)
    storage_ram = Column(String, nullable=True)
    price = Column(Float)
    stock = Column(Integer, default=0)
    weight = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    customSpecs = Column(Text, nullable=True)
    bulletPoints = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="customer") # 'customer' ya 'admin'
    # Purani classes Product aur User wesi hi rahengi...

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True) # Yeh id User table se link hogi
    phone = Column(String, nullable=True)
    primary_address = Column(Text, nullable=True)
    secondary_addresses = Column(Text, nullable=True) # Multiple addresses ko hum text(JSON) mein save karenge

    from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.sql import func


# === ORDERS MODEL ===
class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    total_amount = Column(Float)
    payment_method = Column(String, nullable=True) 
    payment_status = Column(String, default="Pending")
    status = Column(String, default="Processing") 
    tracking = Column(String, default="Pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer)
    product_name = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
    image_url = Column(String, nullable=True)

    # === WISHLIST MODEL ===
class Wishlist(Base):
    __tablename__ = "wishlists"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    product_id = Column(Integer, ForeignKey("products.id")) # Yeh product table se link karega

# === NOTIFICATIONS MODEL ===
class Notification(Base):
    __tablename__ = "notifications"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True) # Kis customer ko bheji hai
    type = Column(String, default="promo") # 'promo', 'order', 'system'
    title = Column(String)
    message = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())    

    # models.py mein yeh add karein
class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, default="admin")
    password = Column(String) # Yahan hum password save karenge