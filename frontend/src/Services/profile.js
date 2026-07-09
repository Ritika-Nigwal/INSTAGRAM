export const get_post = async (token,user_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts/user/${user_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (response.status === 401) {
    return response.status;
  }
  const posts = await response.json();
  return posts;
};
