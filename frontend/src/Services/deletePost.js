const user = JSON.parse(localStorage.getItem("user"));
export const deletePost = async (id) => {
    console.log(user)
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });
  const data = response.json();
  if (response.status === 401) {
    return "user is not authorized";
  }
};
