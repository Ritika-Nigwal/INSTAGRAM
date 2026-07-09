  export const uploadFile = async (image,token) => {
    const formdata = new FormData();
    formdata.append("image", image);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/image`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formdata,
      },
    );
     if(response.status===401){
      return response.status
    }
    const url = await response.json();
    return {message:"image Uploaded SuccessFully...",filename:`${url.filename}`}
  };