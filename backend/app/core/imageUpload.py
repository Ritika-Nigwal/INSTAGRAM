import os
from dotenv import load_dotenv
from fastapi import UploadFile,File
from supabase import create_client
load_dotenv()

SUPABASE_URL=os.getenv("SUPA_BASE_URL")
SUPABASE_KEY=os.getenv("SUPA_BASE_SECRET_KEY")
print(f"{SUPABASE_URL}/storage/v1/object/public/images/")
supabase=create_client(SUPABASE_URL,SUPABASE_KEY)
async def upload_image(image:UploadFile=File(...)):
    contents=await image.read()
    supabase.storage.from_("images").upload(image.filename,contents)
    path=f"{SUPABASE_URL}/storage/v1/object/public/images/{image.filename}"
    return {"filename":path}
