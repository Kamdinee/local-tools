import glob
import os
import uuid
import yt_dlp
from ..core.config import get_download_dir

def download_video(url: str) -> dict:
    DOWNLOAD_DIR = get_download_dir()
    # Generate a unique filename prefix
    file_id = str(uuid.uuid4())
    
    ydl_opts = {
        'outtmpl': f'{DOWNLOAD_DIR}/{file_id}.%(ext)s',
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',  # Prefer MP4
        'noplaylist': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            video_title = info.get('title', 'Video')
            thumbnail = info.get('thumbnail', '')
            ext = info.get('ext', 'mp4')
            
            # Find the downloaded file (yt-dlp might change extension)
            files = glob.glob(f"{DOWNLOAD_DIR}/{file_id}.*")
            if not files:
                raise Exception("File not found after download")
            
            file_path = files[0]
            filename = os.path.basename(file_path)

            return {
                "title": video_title,
                "thumbnail": thumbnail,
                "filename": filename
            }
    except Exception as e:
        print(f"Error converting: {str(e)}")
        raise e
