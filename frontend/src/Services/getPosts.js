import ExpireModal from "../Modals/ExpireModal";

export const  getPost=async(token)=> {
    const response=await fetch(`${import.meta.env.VITE_API_URL}/posts/`,{
      method:"GET",
      headers:{
        "authorization":`Bearer ${token}`
      }
    });
    console.log(token)
    if(response.status===401){
      return response.status
    }
    const getPosts=await response.json();
    return await getPosts;
  }
 