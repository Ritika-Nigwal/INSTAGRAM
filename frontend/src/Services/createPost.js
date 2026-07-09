import {message as toast} from "antd"
export const createPost=async (image_url,caption,token)=>{
    const users=JSON.parse(localStorage.getItem("user"));
       const postcreate = await fetch(`${import.meta.env.VITE_API_URL}/posts/`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_url: image_url,
            image_url_type: "relative",
            caption: caption,
            creator_id:(users.user_id),
          }),
        });
         if(postcreate.status===401){
      return postcreate.status
    }
        if(postcreate.ok){
          toast.success("post created succesFully")
        }
        else{
          toast.error("something went wrong...")
        }
        return{message:"post created successfully..."}
}