const user = JSON.parse(localStorage.getItem("user"));
export const deletePost = async (id) => {
    console.log(typeof(id))
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}?user_id=${user.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });
  
  if (response.status === 401) {
    return "user is not authorized";
  }
  return {"data":"success"}
};
