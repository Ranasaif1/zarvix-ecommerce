from database import engine
import models

print("🔄 PostgreSQL Database Reset shuru ho raha hai...")

try:
    # 1. Postgres mein mojood purani tables ko ura do
    models.Base.metadata.drop_all(bind=engine)
    print("🗑️ Purani adhoori tables PostgreSQL se delete ho gayin!")

    # 2. Ab models.py ke mutabiq nayi, mukammal tables banao
    models.Base.metadata.create_all(bind=engine)
    print("✨ Nayi tables (Category aur SKU ke sath) successfully ban gayin!")
    
except Exception as e:
    print(f"❌ Error aaya: {e}")