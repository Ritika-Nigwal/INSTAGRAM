const user = JSON.parse(localStorage.getItem("user"));
export const update_user = async (image_url, bio) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/register/${user.user_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify({
        image_url: image_url,
        Bio: bio,
      }),
    },
  );
  if (response.status === 401) {
    return response.status;
  }
  return response;
};
