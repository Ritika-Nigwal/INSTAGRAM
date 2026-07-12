const user = JSON.parse(localStorage.getItem("user"));
export const deletePost = async (id) => {
    console.log(typeof(id))
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });
  const data =await response.json();
  if (response.status === 401) {
    return "user is not authorized";
  }
  return data
};
