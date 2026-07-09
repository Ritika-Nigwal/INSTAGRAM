from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.db.session import engine, Base
from app.models.user import User
from app.models.post import Post
from app.routers import user, post, auth, comments
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(post.router)
app.include_router(comments.router)
app.mount("/images",StaticFiles(directory="images"),name="images")

@app.get("/")
def root():
    return {"message": "Vande Mataram"}

origins = ["http://localhost:5173", "http://localhost:3000","http://127.0.0.1:5173","https://instagram-inky-phi.vercel.app","https://instagram-98oyrmndy-parisramnigwal-5516s-projects.vercel.app/"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)