import os
from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from ...schemas.video import URLRequest, VideoResponse
from ...services.downloader import download_video
from ...services.file_manager import cleanup_file
from ...core.config import get_download_dir

router = APIRouter()

@router.post("/convert", response_model=VideoResponse)
async def convert_video_endpoint(request: URLRequest):
    try:
        result = download_video(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download/{filename}")
async def download_file_endpoint(filename: str, background_tasks: BackgroundTasks):
    DOWNLOAD_DIR = get_download_dir()
    file_path = os.path.join(DOWNLOAD_DIR, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # Add background task to delete file logic
    background_tasks.add_task(cleanup_file, file_path)

    return FileResponse(file_path, filename=filename, media_type='application/octet-stream')
