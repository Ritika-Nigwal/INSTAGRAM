export const deleteComment = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/comments/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    },
  );
  if (response.status === 401) {
    return response.status;
  }
};
