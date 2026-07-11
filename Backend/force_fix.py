from database import engine
import models

print("🔄 Database Reset shuru ho raha hai...")

try:
    # 1. Purani saari tables ko delete kar do (File dhoondne ki zaroorat hi nahi)
    models.Base.metadata.drop_all(bind=engine)
    print("🗑️ Purana kachra aur adhoori tables delete ho gayin!")

    # 2. Fresh tables banao (ab models.py mein mojood naye columns ke sath)
    models.Base.metadata.create_all(bind=engine)
    print("✨ Nayi aur fresh tables successfully ban gayin!")
    
except Exception as e:
    print(f"❌ Error aaya: {e}")