from fastapi import UploadFile,Depends
import shutil
def videoUpload(video:UploadFile):
    file_name=video.filename
    path=f"Videos/{file_name}"
    with open(path,"wb+") as buffer:
        shutil.copyfileobj(video.file,buffer)
    return {"filename":path}