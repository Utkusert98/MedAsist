from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware # <--- İŞTE EKSİK OLAN PARÇA BU
import requests
import os
from dotenv import load_dotenv

# .env dosyasını yükle
load_dotenv()

app = FastAPI()

# --- CORS AYARLARI (Frontend ile konuşabilmesi için) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Her yerden gelen isteğe izin ver
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -------------------------------------------------------

# API Key'i al
API_KEY = os.getenv("COLLECT_API_KEY")

@app.get("/")
def read_root():
    return {"mesaj": "MedAsist Backend Çalışıyor! 🚀"}

@app.get("/eczaneler")
def eczane_bul(il: str, ilce: str):
    
    if not il or not ilce:
        raise HTTPException(status_code=400, detail="Lütfen il ve ilçe bilgisini gönderin.")

    # CollectAPI Adresi
    url = f"https://api.collectapi.com/health/dutyPharmacy?il={il}&ilce={ilce}"
    
    headers = {
        "content-type": "application/json",
        "authorization": API_KEY
    }

    try:
        response = requests.get(url, headers=headers)
        data = response.json()

        if data.get("success"):
            return data.get("result")
        else:

            return [] 

    except Exception as e:
        return {"hata": "Bir şeyler ters gitti.", "detay": str(e)}