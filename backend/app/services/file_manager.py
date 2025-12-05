import os

def cleanup_file(file_path: str):
    """Deletes the file after it has been served."""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"Deleted: {file_path}")
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")
