from pydantic import BaseModel

class URLRequest(BaseModel):
    url: str

class VideoResponse(BaseModel):
    title: str
    thumbnail: str
    filename: str
