from pydantic import BaseModel
from typing import Optional

# Yeh basic structure hai
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0
    image_url: Optional[str] = None

# Yeh product add karte waqt use hoga
class ProductCreate(ProductBase):
    pass

# Yeh database se data bhejte waqt use hoga
class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

from typing import Optional, List
from pydantic import BaseModel

class ProductBase(BaseModel):
    # Aapke purane variables yahan honge jaise title, price, stock...
    
    # 👇 YEH 2 NAYI LINES LAZMI ADD KAREIN 👇
    category: Optional[str] = "Uncategorized"
    sku: Optional[str] = "N/A"

# Agar Product ki koi aur class bhi hai (jaise ProductOut), toh usme bhi yeh 2 lines daal dein.