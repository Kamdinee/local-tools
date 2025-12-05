import os

# Directory to store temporary downloads
DOWNLOAD_DIR = "temp_downloads"

def get_download_dir():
    if not os.path.exists(DOWNLOAD_DIR):
        os.makedirs(DOWNLOAD_DIR)
    return DOWNLOAD_DIR
