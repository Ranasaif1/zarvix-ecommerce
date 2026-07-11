import sqlite3
import os

# Apni database file ka naam yahan likhein (e.g., ecommerce.db, app.db, ya jo bhi aapke folder mein hai)
DB_FILE = "ecommerce.db" 

if not os.path.exists(DB_FILE):
    print(f"❌ Error: {DB_FILE} file nahi mili! Apne Backend folder mein check karein ke .db file ka kya naam hai aur oopar DB_FILE mein update karein.")
else:
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    print("\n🔍 --- STEP 1: DATABASE COLUMNS CHECK ---")
    try:
        cursor.execute("PRAGMA table_info(products)")
        columns = [info[1] for info in cursor.fetchall()]
        print("Aapki table ke dabbe (Columns):", columns)
        
        if "category" in columns and "sku" in columns:
            print("✅ GOOD: Category aur SKU ke columns mojood hain!")
        else:
            print("❌ BAD: Category aur SKU ke columns database mein HAIN HI NAHI!")
            
    except Exception as e:
        print("Error checking columns:", e)

    print("\n📦 --- STEP 2: ACTUAL DATA CHECK ---")
    try:
        cursor.execute("SELECT id, name, category, sku FROM products ORDER BY id DESC LIMIT 2")
        rows = cursor.fetchall()
        print("Aakhri 2 Products ka data:")
        for row in rows:
            print(f"ID: {row[0]} | Name: {row[1]} | Category: {row[2]} | SKU: {row[3]}")
    except Exception as e:
        print("❌ Error: Lagta hai columns na hone ki wajah se data fetch nahi ho raha.")
        
    conn.close()