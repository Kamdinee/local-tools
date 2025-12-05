from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routers import video
from .core.config import get_download_dir

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local tool
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize download directory
get_download_dir()

app.include_router(video.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
